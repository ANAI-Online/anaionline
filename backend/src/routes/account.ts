import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { me, requireAuth, requireRole, signToken, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, HttpError } from '../errors.js';
import { channels } from '../notify.js';
import { findToken, sendAccountLink } from '../tokens.js';
import { hhmm, parse } from '../validate.js';

const password = z.string().min(8, 'usa al menos 8 caracteres').max(200);
const email = z.string().trim().toLowerCase().email('correo inválido');

export async function profile(db: Db, u: AuthUser) {
  const { rows } = await db.query(
    `select u.id, u.role, u.full_name, u.title, u.email, u.office_hours, u.email_prefs, s.name as school_name
       from users u join schools s on s.id = u.school_id where u.id = $1`,
    [u.id],
  );
  const user = rows[0];
  const children =
    u.role === 'representante'
      ? (await db.query(
          `select s.id, s.full_name, c.id as course_id, c.grade || ' ' || c.parallel as course_label
             from guardians g join students s on s.id = g.student_id join courses c on c.id = s.course_id
            where g.user_id = $1 and s.active order by s.full_name`,
          [u.id],
        )).rows
      : [];
  const courses =
    u.role === 'representante'
      ? []
      : (await db.query(
          `select c.id, c.grade || ' ' || c.parallel as label, c.tutor_id = $1 as is_tutor,
                  (select count(*)::int from students s where s.course_id = c.id and s.active) as students
             from courses c
            where c.school_id = $2 and ($3 or c.tutor_id = $1 or exists (
              select 1 from teacher_courses tc where tc.teacher_id = $1 and tc.course_id = c.id))
            order by c.sort_order, c.grade, c.parallel`,
          [u.id, u.school_id, u.role === 'admin'],
        )).rows;
  const { rows: devices } = await db.query('select count(*)::int as n from push_subscriptions where user_id = $1', [u.id]);
  return {
    user,
    children,
    courses,
    notifications: { push_available: channels.push, push_devices: devices[0].n, email_prefs: user.email_prefs },
  };
}

export function accountRouter(db: Db) {
  const r = Router();
  const limiter = rateLimit({
    // Solo cuentan los intentos fallidos: en el colegio muchos docentes comparten la misma IP
    windowMs: 15 * 60_000, limit: 30, skipSuccessfulRequests: true, standardHeaders: true, legacyHeaders: false,
    skip: () => process.env.NODE_ENV === 'test',
    message: { error: 'Demasiados intentos. Espera unos minutos.' },
  });

  r.post('/auth/login', limiter, async (req, res) => {
    const body = parse(z.object({ email, password: z.string().min(1) }), req.body);
    const { rows } = await db.query('select id, password_hash, active from users where email = $1', [body.email]);
    const u = rows[0];
    if (u && u.active && !u.password_hash) {
      throw new HttpError(401, 'Aún no activas tu cuenta. Usa el enlace del correo de bienvenida o toca «¿Olvidaste tu contraseña?».');
    }
    const ok = u && u.active && (await bcrypt.compare(body.password, u.password_hash));
    if (!ok) throw new HttpError(401, 'Correo o contraseña incorrectos.');
    res.json({ token: signToken(u.id) });
  });

  /** Siempre responde igual, exista o no el correo, para no revelar quién está registrado. */
  r.post('/auth/forgot', limiter, async (req, res) => {
    const body = parse(z.object({ email }), req.body);
    const { rows } = await db.query('select id from users where email = $1 and active', [body.email]);
    if (rows[0]) await sendAccountLink(db, rows[0].id, 'restablecer');
    res.json({ ok: true });
  });

  r.post('/auth/token', limiter, async (req, res) => {
    const { token } = parse(z.object({ token: z.string().min(10) }), req.body);
    const t = await findToken(db, token);
    if (!t) throw badRequest('El enlace venció o ya se usó. Pide uno nuevo desde «¿Olvidaste tu contraseña?».');
    res.json({ kind: t.kind, full_name: t.full_name, email: t.email });
  });

  r.post('/auth/set-password', limiter, async (req, res) => {
    const body = parse(z.object({ token: z.string().min(10), password }), req.body);
    const t = await findToken(db, body.token);
    if (!t) throw badRequest('El enlace venció o ya se usó. Pide uno nuevo desde «¿Olvidaste tu contraseña?».');
    const hash = await bcrypt.hash(body.password, 10);
    await db.tx(async (x) => {
      await x.query('update users set password_hash = $2 where id = $1', [t.user_id, hash]);
      await x.query('update auth_tokens set used_at = now() where user_id = $1 and used_at is null', [t.user_id]);
    });
    res.json({ token: signToken(t.user_id) });
  });

  r.get('/me', requireAuth(db), async (req, res) => {
    res.json(await profile(db, me(req)));
  });

  r.put('/me/password', requireAuth(db), async (req, res) => {
    const body = parse(z.object({ current: z.string().min(1), password }), req.body);
    const { rows } = await db.query('select password_hash from users where id = $1', [me(req).id]);
    if (!(await bcrypt.compare(body.current, rows[0].password_hash ?? ''))) throw badRequest('La contraseña actual no es correcta.');
    await db.query('update users set password_hash = $2 where id = $1', [me(req).id, await bcrypt.hash(body.password, 10)]);
    res.json({ ok: true });
  });

  r.put('/me/notifications', requireAuth(db), async (req, res) => {
    const { email_prefs } = parse(z.object({ email_prefs: z.enum(['importante', 'todo']) }), req.body);
    await db.query('update users set email_prefs = $2 where id = $1', [me(req).id, email_prefs]);
    res.json({ email_prefs });
  });

  r.put('/me/office-hours', requireAuth(db), requireRole('admin', 'docente'), async (req, res) => {
    const oh = parse(
      z.object({ days: z.array(z.number().int().min(1).max(7)).min(1), start: hhmm, end: hhmm })
        .refine((v) => v.end > v.start, 'La hora de fin debe ser posterior al inicio.'),
      req.body,
    );
    await db.query('update users set office_hours = $2 where id = $1', [me(req).id, JSON.stringify(oh)]);
    res.json(oh);
  });

  return r;
}
