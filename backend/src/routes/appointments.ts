import { Router } from 'express';
import { z } from 'zod';
import { isGuardianOf, teachersOfStudent } from '../access.js';
import { me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, conflict, forbidden, notFound } from '../errors.js';
import { notify } from '../notify.js';
import { fmtDay, fmtTime, localToUtc } from '../time.js';
import { hhmm, localDay, parse, uuid } from '../validate.js';

const ACTIVE = `('solicitada', 'confirmada')`;

export async function listAppointments(db: Db, u: AuthUser, opts: { ids?: string[]; upcomingOnly?: boolean } = {}) {
  const params: unknown[] = [u.id];
  let extra = '';
  if (opts.ids) { params.push(opts.ids); extra += ` and a.id = any($${params.length}::uuid[])`; }
  if (opts.upcomingOnly) extra += ` and sl.starts_at > now() and a.status in ${ACTIVE}`;
  else extra += ` and sl.starts_at > now() - interval '30 days'`;
  const { rows } = await db.query(
    `select a.id, a.status, a.reason, a.created_at,
            json_build_object('id', sl.id, 'starts_at', sl.starts_at, 'ends_at', sl.ends_at) as slot,
            json_build_object('id', t.id, 'full_name', t.full_name, 'title', t.title) as teacher,
            json_build_object('id', g.id, 'full_name', g.full_name) as guardian,
            json_build_object('id', s.id, 'full_name', s.full_name, 'course_label', c.grade || ' ' || c.parallel) as student
       from appointments a join availability_slots sl on sl.id = a.slot_id
       join users t on t.id = a.teacher_id join users g on g.id = a.guardian_id
       join students s on s.id = a.student_id join courses c on c.id = s.course_id
      where (a.teacher_id = $1 or a.guardian_id = $1) ${extra}
      order by sl.starts_at`,
    params,
  );
  return rows;
}

export function appointmentsRouter(db: Db) {
  const r = Router();

  /** Representante: horarios libres de un docente. Docente: sus horarios y su estado. */
  r.get('/slots', async (req, res) => {
    const u = me(req);
    if (u.role === 'representante') {
      const { teacher_id, student_id } = parse(z.object({ teacher_id: uuid, student_id: uuid }), req.query);
      if (!(await isGuardianOf(db, u.id, student_id))) throw forbidden();
      if (!(await teachersOfStudent(db, student_id)).some((t) => t.id === teacher_id)) throw forbidden();
      const { rows } = await db.query(
        `select sl.id, sl.teacher_id, sl.starts_at, sl.ends_at from availability_slots sl
          where sl.teacher_id = $1 and sl.starts_at > now() + interval '2 hours'
            and not exists (select 1 from appointments a where a.slot_id = sl.id and a.status in ${ACTIVE})
          order by sl.starts_at limit 60`,
        [teacher_id],
      );
      return res.json(rows);
    }
    const { rows } = await db.query(
      `select sl.id, sl.teacher_id, sl.starts_at, sl.ends_at,
              (select a.id from appointments a where a.slot_id = sl.id and a.status in ${ACTIVE}) as appointment_id
         from availability_slots sl where sl.teacher_id = $1 and sl.starts_at > now()
        order by sl.starts_at limit 200`,
      [u.id],
    );
    res.json(rows);
  });

  /** Docente publica disponibilidad: un bloque que se parte en citas de N minutos. */
  r.post('/slots', requireRole('admin', 'docente'), async (req, res) => {
    const u = me(req);
    const input = parse(
      z.object({ date: localDay, start: hhmm, end: hhmm, duration_minutes: z.number().int().min(10).max(120) }),
      req.body,
    );
    const from = localToUtc(input.date, input.start);
    const to = localToUtc(input.date, input.end);
    if (to <= from) throw badRequest('La hora de fin debe ser posterior al inicio.');
    if (from < new Date()) throw badRequest('Elige un horario futuro.');
    const step = input.duration_minutes * 60_000;
    const starts: Date[] = [];
    for (let t = from.getTime(); t + step <= to.getTime(); t += step) starts.push(new Date(t));
    if (!starts.length) throw badRequest('El bloque es más corto que la duración de una cita.');
    const { rows } = await db.query(
      `insert into availability_slots (teacher_id, starts_at, ends_at)
       select $1, s, s + make_interval(mins => $3) from unnest($2::timestamptz[]) as s
       on conflict (teacher_id, starts_at) do nothing
       returning id, teacher_id, starts_at, ends_at`,
      [u.id, starts, input.duration_minutes],
    );
    res.status(201).json(rows);
  });

  r.delete('/slots/:id', requireRole('admin', 'docente'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const { rows: busy } = await db.query(
      `select 1 from appointments where slot_id = $1 and status in ${ACTIVE}`, [id],
    );
    if (busy[0]) throw conflict('Ese horario tiene una cita. Cancélala primero.');
    const { rows } = await db.query(
      'delete from availability_slots where id = $1 and teacher_id = $2 returning id', [id, me(req).id],
    );
    if (!rows[0]) throw notFound('El horario');
    res.status(204).end();
  });

  r.get('/appointments', async (req, res) => {
    res.json(await listAppointments(db, me(req), { upcomingOnly: req.query.upcoming === '1' }));
  });

  r.post('/appointments', requireRole('representante'), async (req, res) => {
    const u = me(req);
    const input = parse(
      z.object({ slot_id: uuid, student_id: uuid, reason: z.string().trim().max(500).default('') }),
      req.body,
    );
    if (!(await isGuardianOf(db, u.id, input.student_id))) throw forbidden();
    const { rows: slots } = await db.query<{ teacher_id: string; starts_at: Date }>(
      'select teacher_id, starts_at from availability_slots where id = $1', [input.slot_id],
    );
    const slot = slots[0];
    if (!slot) throw notFound('El horario');
    if (new Date(slot.starts_at) < new Date()) throw conflict('Ese horario ya pasó.');
    if (!(await teachersOfStudent(db, input.student_id)).some((t) => t.id === slot.teacher_id)) throw forbidden();
    try {
      const { rows } = await db.query<{ id: string }>(
        `insert into appointments (slot_id, teacher_id, guardian_id, student_id, reason)
         values ($1,$2,$3,$4,$5) returning id`,
        [input.slot_id, slot.teacher_id, u.id, input.student_id, input.reason],
      );
      notify(db, {
        userIds: [slot.teacher_id], title: 'Nueva solicitud de cita',
        body: `${u.full_name} pidió una cita el ${fmtDay(slot.starts_at)} a las ${fmtTime(slot.starts_at)}.`,
        link: '/agenda?vista=citas', priority: 'normal', action: 'Confirmar o rechazar',
      });
      const [a] = await listAppointments(db, u, { ids: [rows[0].id] });
      res.status(201).json(a);
    } catch (e: any) {
      if (e?.code === '23505') throw conflict('Alguien acaba de tomar ese horario. Elige otro.');
      throw e;
    }
  });

  r.patch('/appointments/:id', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const { status } = parse(z.object({ status: z.enum(['confirmada', 'rechazada', 'cancelada']) }), req.body);
    const [a] = await listAppointments(db, u, { ids: [id] });
    if (!a) throw notFound('La cita');
    const isTeacher = a.teacher.id === u.id;
    if (!isTeacher && status !== 'cancelada') throw forbidden('Solo el docente puede confirmar o rechazar.');
    if (status === 'confirmada' && a.status !== 'solicitada') throw conflict('Solo se confirman citas solicitadas.');
    if (a.status === 'cancelada' || a.status === 'rechazada') throw conflict('Esta cita ya no está activa.');
    await db.query('update appointments set status = $2, updated_at = now() where id = $1', [id, status]);
    const other = isTeacher ? a.guardian.id : a.teacher.id;
    const who = u.title ? `${u.title} ${u.full_name}` : u.full_name;
    const title = { confirmada: 'Cita confirmada', rechazada: 'Cita no disponible', cancelada: 'Cita cancelada' }[status];
    const verb = { confirmada: 'confirmó', rechazada: 'no puede atender', cancelada: 'canceló' }[status];
    notify(db, {
      userIds: [other], title,
      body: `${who} ${verb} la cita del ${fmtDay(a.slot.starts_at)} a las ${fmtTime(a.slot.starts_at)}.`,
      link: '/agenda?vista=citas', priority: 'alta', action: 'Ver mis citas',
    });
    const [updated] = await listAppointments(db, u, { ids: [id] });
    res.json(updated);
  });

  return r;
}
