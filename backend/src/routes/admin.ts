import { Router } from 'express';
import { z } from 'zod';
import { me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, conflict, forbidden, notFound } from '../errors.js';
import { channels } from '../notify.js';
import { sendAccountLink } from '../tokens.js';
import { parse, uuid } from '../validate.js';

/* ——— Grados del sistema educativo ecuatoriano ——— */

export const GRADES = [
  'Inicial 1', 'Inicial 2',
  ...Array.from({ length: 10 }, (_, i) => `${i + 1}.º EGB`),
  ...Array.from({ length: 3 }, (_, i) => `${i + 1}.º BGU`),
];
export const gradeOrder = (g: string) => {
  const i = GRADES.indexOf(g);
  return i < 0 ? 99 : g.startsWith('Inicial') ? i + 1 : g.endsWith('EGB') ? 10 + (i - 1) : 30 + (i - 11);
};

const ORDINALS: Record<string, number> = {
  primero: 1, primer: 1, segundo: 2, tercero: 3, tercer: 3, cuarto: 4, quinto: 5,
  sexto: 6, septimo: 7, octavo: 8, noveno: 9, decimo: 10,
};

/** Acepta "5", "5to", "Quinto de básica", "5.º EGB", "1 BGU", "Primero de bachillerato", "Inicial 2". */
export function normalizeGrade(input: string): string | null {
  const s = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const num = Number(s.match(/\d+/)?.[0] ?? NaN) || Object.entries(ORDINALS).find(([w]) => s.includes(w))?.[1];
  if (s.includes('inicial')) return num === 1 || num === 2 ? `Inicial ${num}` : null;
  if (!num) return null;
  if (s.includes('bgu') || s.includes('bachiller')) return num >= 1 && num <= 3 ? `${num}.º BGU` : null;
  return num >= 1 && num <= 10 ? `${num}.º EGB` : null;
}

const STATUS = `(case when not u.active then 'inactiva' when u.password_hash is null then 'invitada' else 'activa' end)`;
const name = z.string().trim().min(3, 'escribe el nombre completo').max(120);
const email = z.string().trim().toLowerCase().email('correo inválido');
const title = z.string().trim().max(20).nullable().optional();
const parallel = z.string().trim().toUpperCase().regex(/^[A-Z]{1,2}$/, 'usa una letra, por ejemplo A');
const relationship = z.string().trim().max(40).optional().default('');

/** Busca un representante por correo o lo crea. Falla si el correo es de un docente o de dirección. */
async function upsertGuardian(db: Db, u: AuthUser, g: { full_name: string; email: string; phone?: string | null }) {
  const { rows } = await db.query<{ id: string; role: string; created: boolean }>(
    'select id, role, false as created from users where email = $1', [g.email],
  );
  if (rows[0]) {
    if (rows[0].role !== 'representante') {
      throw conflict(`${g.email} ya pertenece a una cuenta de personal. Usa otro correo para el representante.`);
    }
    return { id: rows[0].id, created: false };
  }
  const ins = await db.query<{ id: string }>(
    `insert into users (school_id, role, full_name, email, phone) values ($1, 'representante', $2, $3, $4) returning id`,
    [u.school_id, g.full_name, g.email, g.phone ?? null],
  );
  return { id: ins.rows[0].id, created: true };
}

async function assertCourse(db: Db, u: AuthUser, courseId: string) {
  const { rows } = await db.query('select 1 from courses where id = $1 and school_id = $2', [courseId, u.school_id]);
  if (!rows[0]) throw notFound('El curso');
}

async function assertStaff(db: Db, u: AuthUser, userId: string | null | undefined) {
  if (!userId) return;
  const { rows } = await db.query(
    `select 1 from users where id = $1 and school_id = $2 and role in ('admin', 'docente') and active`, [userId, u.school_id],
  );
  if (!rows[0]) throw badRequest('Elige un docente activo.');
}

async function inviteIfPending(db: Db, userId: string) {
  const { rows } = await db.query('select password_hash is null as pending from users where id = $1', [userId]);
  return rows[0]?.pending ? sendAccountLink(db, userId, 'invitacion') : null;
}

export function adminRouter(db: Db) {
  const r = Router();
  r.use(requireRole('admin'));

  r.get('/summary', async (req, res) => {
    const { rows } = await db.query(
      `select
         (select count(*)::int from courses where school_id = $1) as courses,
         (select count(*)::int from users where school_id = $1 and role in ('admin','docente') and active) as staff,
         (select count(*)::int from students where school_id = $1 and active) as students,
         (select count(*)::int from users where school_id = $1 and role = 'representante' and active) as guardians,
         (select count(*)::int from users where school_id = $1 and active and password_hash is null) as pending_activation`,
      [me(req).school_id],
    );
    res.json({ ...rows[0], channels, grades: GRADES });
  });

  /* ——— Cursos ——— */

  r.get('/courses', async (req, res) => {
    const { rows } = await db.query(
      `select c.id, c.grade, c.parallel, c.grade || ' ' || c.parallel as label,
              case when t.id is null then null else json_build_object('id', t.id, 'full_name', t.full_name, 'title', t.title) end as tutor,
              (select count(*)::int from students s where s.course_id = c.id and s.active) as students,
              coalesce((select json_agg(json_build_object('id', u.id, 'full_name', u.full_name, 'title', u.title, 'subject', tc.subject) order by tc.subject)
                 from teacher_courses tc join users u on u.id = tc.teacher_id where tc.course_id = c.id), '[]') as teachers
         from courses c left join users t on t.id = c.tutor_id
        where c.school_id = $1 order by c.sort_order, c.parallel`,
      [me(req).school_id],
    );
    res.json(rows);
  });

  const courseInput = z.object({ grade: z.enum(GRADES as [string, ...string[]]), parallel, tutor_id: uuid.nullable().default(null) });

  r.post('/courses', async (req, res) => {
    const u = me(req);
    const c = parse(courseInput, req.body);
    await assertStaff(db, u, c.tutor_id);
    try {
      const { rows } = await db.query(
        `insert into courses (school_id, grade, parallel, tutor_id, sort_order) values ($1,$2,$3,$4,$5) returning id`,
        [u.school_id, c.grade, c.parallel, c.tutor_id, gradeOrder(c.grade)],
      );
      res.status(201).json({ id: rows[0].id });
    } catch (e: any) {
      if (e?.code === '23505') throw conflict(`${c.grade} ${c.parallel} ya existe.`);
      throw e;
    }
  });

  r.patch('/courses/:id', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const c = parse(courseInput.partial(), req.body);
    await assertCourse(db, u, id);
    await assertStaff(db, u, c.tutor_id);
    try {
      await db.query(
        `update courses set
           grade = coalesce($2, grade), parallel = coalesce($3, parallel),
           tutor_id = case when $4::boolean then $5::uuid else tutor_id end,
           sort_order = case when $2::text is null then sort_order else $6 end
         where id = $1`,
        [id, c.grade ?? null, c.parallel ?? null, 'tutor_id' in req.body, c.tutor_id ?? null, c.grade ? gradeOrder(c.grade) : 0],
      );
    } catch (e: any) {
      if (e?.code === '23505') throw conflict('Ya existe un curso con ese grado y paralelo.');
      throw e;
    }
    res.json({ ok: true });
  });

  r.delete('/courses/:id', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    await assertCourse(db, u, id);
    const { rows } = await db.query('select count(*)::int as n from students where course_id = $1', [id]);
    if (rows[0].n > 0) throw conflict('El curso tiene estudiantes. Muévelos a otro curso antes de borrarlo.');
    await db.query('delete from courses where id = $1', [id]);
    res.status(204).end();
  });

  /* ——— Personal: docentes y dirección ——— */

  r.get('/staff', async (req, res) => {
    const { rows } = await db.query(
      `select u.id, u.full_name, u.title, u.email, u.role, u.last_seen_at, ${STATUS} as status,
              coalesce((select json_agg(json_build_object('id', c.id, 'label', c.grade || ' ' || c.parallel) order by c.sort_order, c.parallel)
                 from courses c where c.tutor_id = u.id), '[]') as tutor_of,
              coalesce((select json_agg(json_build_object('course_id', c.id, 'label', c.grade || ' ' || c.parallel, 'subject', tc.subject) order by c.sort_order, c.parallel, tc.subject)
                 from teacher_courses tc join courses c on c.id = tc.course_id where tc.teacher_id = u.id), '[]') as subjects
         from users u where u.school_id = $1 and u.role in ('admin', 'docente')
        order by u.active desc, u.role, u.full_name`,
      [me(req).school_id],
    );
    res.json(rows);
  });

  r.post('/staff', async (req, res) => {
    const u = me(req);
    const s = parse(
      z.object({ full_name: name, title, email, role: z.enum(['docente', 'admin']).default('docente'), send_invite: z.boolean().default(true) }),
      req.body,
    );
    const exists = await db.query('select 1 from users where email = $1', [s.email]);
    if (exists.rows[0]) throw conflict(`Ya existe una cuenta con ${s.email}.`);
    const { rows } = await db.query<{ id: string }>(
      `insert into users (school_id, role, full_name, title, email) values ($1,$2,$3,$4,$5) returning id`,
      [u.school_id, s.role, s.full_name, s.title || null, s.email],
    );
    const invite = s.send_invite ? await sendAccountLink(db, rows[0].id, 'invitacion') : null;
    res.status(201).json({ id: rows[0].id, invite });
  });

  r.put('/staff/:id/subjects', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const { items } = parse(
      z.object({ items: z.array(z.object({ course_id: uuid, subject: z.string().trim().min(2).max(80) })).max(40) }),
      req.body,
    );
    await assertStaff(db, u, id);
    for (const it of items) await assertCourse(db, u, it.course_id);
    await db.tx(async (t) => {
      await t.query('delete from teacher_courses where teacher_id = $1', [id]);
      for (const it of items) {
        await t.query(
          'insert into teacher_courses (teacher_id, course_id, subject) values ($1,$2,$3) on conflict do nothing',
          [id, it.course_id, it.subject],
        );
      }
    });
    res.json({ ok: true });
  });

  /* ——— Cualquier cuenta: editar, desactivar, reenviar acceso ——— */

  r.patch('/users/:id', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const b = parse(
      z.object({ full_name: name.optional(), title, email: email.optional(), phone: z.string().trim().max(30).nullable().optional(),
                 role: z.enum(['docente', 'admin']).optional(), active: z.boolean().optional() }),
      req.body,
    );
    const { rows } = await db.query('select role from users where id = $1 and school_id = $2', [id, u.school_id]);
    const target = rows[0];
    if (!target) throw notFound('La cuenta');
    if (id === u.id && (b.active === false || b.role === 'docente')) throw forbidden('No puedes quitarte tu propio acceso de dirección.');
    if (b.role && target.role === 'representante') throw badRequest('El rol de un representante no se cambia desde aquí.');
    if (b.email) {
      const dup = await db.query('select 1 from users where email = $1 and id <> $2', [b.email, id]);
      if (dup.rows[0]) throw conflict(`Ya existe una cuenta con ${b.email}.`);
    }
    await db.query(
      `update users set full_name = coalesce($2, full_name), email = coalesce($3, email),
              title = case when $4::boolean then $5 else title end,
              phone = case when $6::boolean then $7 else phone end,
              role = coalesce($8, role), active = coalesce($9, active)
        where id = $1`,
      [id, b.full_name ?? null, b.email ?? null, 'title' in req.body, b.title || null, 'phone' in req.body, b.phone || null, b.role ?? null, b.active ?? null],
    );
    if (b.active === false) await db.query('delete from push_subscriptions where user_id = $1', [id]);
    res.json({ ok: true });
  });

  /** Reenvía el acceso: invitación si nunca activó la cuenta, o enlace para restablecer si ya la usa. */
  r.post('/users/:id/access-link', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const { rows } = await db.query(
      'select password_hash is null as pending from users where id = $1 and school_id = $2 and active', [id, u.school_id],
    );
    if (!rows[0]) throw notFound('La cuenta activa');
    res.json(await sendAccountLink(db, id, rows[0].pending ? 'invitacion' : 'restablecer'));
  });

  /** Envía la invitación a todas las cuentas que aún no se activaron (en segundo plano). */
  r.post('/invite-pending', async (req, res) => {
    const { rows } = await db.query<{ id: string }>(
      `select u.id from users u where u.school_id = $1 and u.active and u.password_hash is null
         and not exists (select 1 from auth_tokens t where t.user_id = u.id and t.kind = 'invitacion'
                          and t.used_at is null and t.created_at > now() - interval '24 hours')`,
      [me(req).school_id],
    );
    (async () => {
      for (const x of rows) await sendAccountLink(db, x.id, 'invitacion').catch((e) => console.error('[invitación]', e));
    })();
    res.json({ queued: rows.length });
  });

  /* ——— Estudiantes y representantes ——— */

  r.get('/students', async (req, res) => {
    const u = me(req);
    const q = parse(z.object({ course_id: uuid.optional(), q: z.string().max(80).optional(), inactive: z.string().optional() }), req.query);
    const { rows } = await db.query(
      `select s.id, s.full_name, s.active, c.id as course_id, c.grade || ' ' || c.parallel as course_label,
              coalesce((select json_agg(json_build_object('id', u.id, 'full_name', u.full_name, 'email', u.email, 'phone', u.phone,
                         'relationship', g.relationship, 'status', ${STATUS}, 'last_seen_at', u.last_seen_at) order by u.full_name)
                 from guardians g join users u on u.id = g.user_id where g.student_id = s.id), '[]') as guardians
         from students s join courses c on c.id = s.course_id
        where s.school_id = $1 and ($2::uuid is null or s.course_id = $2) and ($4 or s.active)
          and ($3::text is null or s.full_name ilike '%' || $3 || '%' or exists (
            select 1 from guardians g join users u on u.id = g.user_id
             where g.student_id = s.id and (u.full_name ilike '%' || $3 || '%' or u.email ilike '%' || $3 || '%')))
        order by s.active desc, c.sort_order, c.parallel, s.full_name
        limit 500`,
      [u.school_id, q.course_id ?? null, q.q?.trim() || null, q.inactive === '1'],
    );
    res.json(rows);
  });

  const guardianInput = z.object({ full_name: name, email, relationship, phone: z.string().trim().max(30).nullable().optional() });

  r.post('/students', async (req, res) => {
    const u = me(req);
    const b = parse(
      z.object({ full_name: name, course_id: uuid, guardians: z.array(guardianInput).max(4).default([]), send_invites: z.boolean().default(true) }),
      req.body,
    );
    await assertCourse(db, u, b.course_id);
    const { id, created } = await db.tx(async (t) => {
      const { rows } = await t.query<{ id: string }>(
        'insert into students (school_id, full_name, course_id) values ($1,$2,$3) returning id', [u.school_id, b.full_name, b.course_id],
      );
      const created: string[] = [];
      for (const g of b.guardians) {
        const gu = await upsertGuardian(t, u, g);
        await t.query(
          'insert into guardians (user_id, student_id, relationship) values ($1,$2,$3) on conflict do nothing',
          [gu.id, rows[0].id, g.relationship || null],
        );
        created.push(gu.id);
      }
      return { id: rows[0].id, created };
    });
    const invites = [];
    if (b.send_invites) for (const gid of created) invites.push(await inviteIfPending(db, gid));
    res.status(201).json({ id, invites: invites.filter(Boolean) });
  });

  r.patch('/students/:id', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const b = parse(z.object({ full_name: name.optional(), course_id: uuid.optional(), active: z.boolean().optional() }), req.body);
    if (b.course_id) await assertCourse(db, u, b.course_id);
    const { rows } = await db.query(
      `update students set full_name = coalesce($3, full_name), course_id = coalesce($4, course_id), active = coalesce($5, active)
        where id = $1 and school_id = $2 returning id`,
      [id, u.school_id, b.full_name ?? null, b.course_id ?? null, b.active ?? null],
    );
    if (!rows[0]) throw notFound('El estudiante');
    res.json({ ok: true });
  });

  r.post('/students/:id/guardians', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const g = parse(guardianInput.extend({ send_invite: z.boolean().default(true) }), req.body);
    const s = await db.query('select 1 from students where id = $1 and school_id = $2', [id, u.school_id]);
    if (!s.rows[0]) throw notFound('El estudiante');
    const gu = await upsertGuardian(db, u, g);
    await db.query(
      `insert into guardians (user_id, student_id, relationship) values ($1,$2,$3)
       on conflict (user_id, student_id) do update set relationship = excluded.relationship`,
      [gu.id, id, g.relationship || null],
    );
    const invite = g.send_invite ? await inviteIfPending(db, gu.id) : null;
    res.status(201).json({ id: gu.id, created: gu.created, invite });
  });

  r.delete('/students/:id/guardians/:userId', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const userId = parse(uuid, req.params.userId);
    await db.query(
      `delete from guardians g using students s where g.student_id = s.id and s.school_id = $3 and g.student_id = $1 and g.user_id = $2`,
      [id, userId, u.school_id],
    );
    res.status(204).end();
  });

  /* ——— Importación masiva desde Excel / CSV ——— */

  r.post('/import', async (req, res) => {
    const u = me(req);
    const { rows: input, dry_run } = parse(
      z.object({
        dry_run: z.boolean().default(true),
        rows: z.array(z.record(z.string(), z.string().nullable().optional())).min(1).max(3000),
      }),
      req.body,
    );

    const pick = (row: Record<string, unknown>, ...keys: string[]) => {
      for (const k of Object.keys(row)) {
        const nk = k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
        if (keys.includes(nk)) return String(row[k] ?? '').trim();
      }
      return '';
    };

    const errors: { row: number; message: string }[] = [];
    const clean: { row: number; student: string; grade: string; parallel: string; guardian: string; email: string; relationship: string; phone: string }[] = [];
    input.forEach((raw, i) => {
      const row = i + 2; // fila 1 = encabezados
      const student = pick(raw, 'estudiante', 'alumno', 'nombreestudiante', 'nombredelestudiante');
      const gradeRaw = pick(raw, 'curso', 'grado', 'anio', 'ano');
      const par = pick(raw, 'paralelo', 'seccion').toUpperCase();
      const guardian = pick(raw, 'representante', 'nombrerepresentante', 'padremadre', 'padre', 'madre');
      const mail = pick(raw, 'correo', 'email', 'correoelectronico', 'correorepresentante').toLowerCase();
      if (!student && !guardian && !mail) return; // fila vacía
      const grade = normalizeGrade(gradeRaw);
      if (student.length < 3) errors.push({ row, message: 'Falta el nombre del estudiante.' });
      else if (!grade) errors.push({ row, message: `No reconozco el curso «${gradeRaw}». Usa, por ejemplo, 5.º EGB, 1.º BGU o Inicial 2.` });
      else if (!/^[A-Z]{1,2}$/.test(par)) errors.push({ row, message: 'Falta el paralelo (A, B…).' });
      else if (guardian.length < 3) errors.push({ row, message: 'Falta el nombre del representante.' });
      else if (!z.string().email().safeParse(mail).success) errors.push({ row, message: `Correo inválido: «${mail}».` });
      else clean.push({ row, student, grade, parallel: par, guardian, email: mail, relationship: pick(raw, 'parentesco', 'relacion'), phone: pick(raw, 'telefono', 'celular') });
    });

    const summary = { courses_new: 0, students_new: 0, students_existing: 0, guardians_new: 0, guardians_existing: 0, links: 0 };
    const run = async (t: Db) => {
      const courseIds = new Map<string, string>();
      const studentIds = new Map<string, string>();
      const guardianIds = new Map<string, string>();
      for (const r of clean) {
        const ck = `${r.grade}|${r.parallel}`;
        let cid = courseIds.get(ck);
        if (!cid) {
          const found = await t.query<{ id: string }>('select id from courses where school_id = $1 and grade = $2 and parallel = $3', [u.school_id, r.grade, r.parallel]);
          if (found.rows[0]) cid = found.rows[0].id;
          else {
            summary.courses_new++;
            cid = dry_run ? `nuevo:${ck}` : (await t.query<{ id: string }>(
              'insert into courses (school_id, grade, parallel, sort_order) values ($1,$2,$3,$4) returning id',
              [u.school_id, r.grade, r.parallel, gradeOrder(r.grade)])).rows[0].id;
          }
          courseIds.set(ck, cid);
        }
        const sk = `${cid}|${r.student.toLowerCase()}`;
        let sid = studentIds.get(sk);
        if (!sid) {
          const found = cid.startsWith('nuevo:') ? { rows: [] as { id: string }[] } : await t.query<{ id: string }>(
            'select id from students where course_id = $1 and lower(full_name) = lower($2)', [cid, r.student]);
          if (found.rows[0]) { sid = found.rows[0].id; summary.students_existing++; }
          else {
            summary.students_new++;
            sid = dry_run ? `nuevo:${sk}` : (await t.query<{ id: string }>(
              'insert into students (school_id, full_name, course_id) values ($1,$2,$3) returning id', [u.school_id, r.student, cid])).rows[0].id;
          }
          studentIds.set(sk, sid);
        }
        let gid = guardianIds.get(r.email);
        if (!gid) {
          const found = await t.query<{ id: string; role: string }>('select id, role from users where email = $1', [r.email]);
          if (found.rows[0] && found.rows[0].role !== 'representante') {
            errors.push({ row: r.row, message: `${r.email} ya es una cuenta de personal; usa otro correo para el representante.` });
            continue;
          }
          if (found.rows[0]) { gid = found.rows[0].id; summary.guardians_existing++; }
          else {
            summary.guardians_new++;
            gid = dry_run ? `nuevo:${r.email}` : (await t.query<{ id: string }>(
              `insert into users (school_id, role, full_name, email, phone) values ($1,'representante',$2,$3,$4) returning id`,
              [u.school_id, r.guardian, r.email, r.phone || null])).rows[0].id;
          }
          guardianIds.set(r.email, gid);
        }
        if (!dry_run) {
          const l = await t.query(
            'insert into guardians (user_id, student_id, relationship) values ($1,$2,$3) on conflict do nothing returning 1',
            [gid, sid, r.relationship || null],
          );
          summary.links += l.rows.length;
        } else summary.links++;
      }
    };

    if (dry_run) await run(db);
    else {
      if (errors.length) throw badRequest('Corrige las filas con errores antes de importar.');
      await db.tx(run);
    }
    res.json({ dry_run, rows: clean.length, errors: errors.sort((a, b) => a.row - b.row), ...summary });
  });

  /* ——— Registro de envíos ——— */

  r.get('/notifications', async (req, res) => {
    const { rows } = await db.query(
      `select l.id, l.channel, l.title, l.status, l.error, l.created_at, u.full_name, u.email
         from notification_log l left join users u on u.id = l.user_id
        where u.school_id = $1 or u.id is null
        order by l.created_at desc limit 150`,
      [me(req).school_id],
    );
    res.json({ channels, items: rows });
  });

  return r;
}
