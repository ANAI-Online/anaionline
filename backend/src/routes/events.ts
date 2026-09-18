import { Router } from 'express';
import { z } from 'zod';
import { courseIdsFor } from '../access.js';
import { isStaff, me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, conflict, forbidden, notFound } from '../errors.js';
import { isoDate, parse, uuid } from '../validate.js';

const AUDIENCE = `(case when e.audience_all then 'Todo el colegio' else (
  select string_agg(c.grade || ' ' || c.parallel, ', ' order by c.sort_order, c.grade, c.parallel)
    from event_courses ec join courses c on c.id = ec.course_id where ec.event_id = e.id) end)`;

/** Eventos visibles para el usuario. */
export async function listEvents(
  db: Db, u: AuthUser, opts: { ids?: string[]; from?: Date; to?: Date; limit?: number } = {},
) {
  const courses = await courseIdsFor(db, u);
  const params: unknown[] = [u.school_id, courses, u.id];
  const where = ['e.school_id = $1'];
  // PostgreSQL exige que cada parámetro aparezca en la consulta: dirección ve todo ($4 = true)
  params.push(u.role === 'admin');
  where.push(`($4 or e.audience_all or e.author_id = $3 or exists (
      select 1 from event_courses ec where ec.event_id = e.id and ec.course_id = any($2::uuid[])))`);
  if (opts.ids) { params.push(opts.ids); where.push(`e.id = any($${params.length}::uuid[])`); }
  if (opts.from) { params.push(opts.from); where.push(`e.ends_at >= $${params.length}`); }
  if (opts.to) { params.push(opts.to); where.push(`e.starts_at <= $${params.length}`); }
  params.push(opts.limit ?? 200);
  const { rows } = await db.query(
    `select e.id, e.title, e.description, e.location, e.starts_at, e.ends_at, e.audience_all,
            e.rsvp_enabled, e.author_id, ${AUDIENCE} as audience_label,
            coalesce((select array_agg(course_id) from event_courses where event_id = e.id), '{}') as course_ids,
            (select response from event_rsvps r where r.event_id = e.id and r.guardian_id = $3) as my_rsvp,
            (select json_build_object(
               'si', count(*) filter (where response = 'si'),
               'tal_vez', count(*) filter (where response = 'tal_vez'),
               'no', count(*) filter (where response = 'no'))
               from event_rsvps r where r.event_id = e.id) as counts
       from events e where ${where.join(' and ')}
      order by e.starts_at limit $${params.length}`,
    params,
  );
  return rows.map((r: any) => ({
    ...r,
    my_rsvp: u.role === 'representante' ? r.my_rsvp : undefined,
    counts: isStaff(u) ? r.counts : undefined,
  }));
}

const eventInput = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().max(3000).default(''),
  location: z.string().max(200).default(''),
  starts_at: isoDate,
  ends_at: isoDate,
  audience_all: z.boolean().default(false),
  course_ids: z.array(uuid).default([]),
  rsvp_enabled: z.boolean().default(true),
});
export type EventInput = z.infer<typeof eventInput>;
export { eventInput };

/** Valida audiencia: docentes solo a sus cursos; "todo el colegio" solo dirección. */
export async function checkAudience(db: Db, u: AuthUser, all: boolean, courseIds: string[]) {
  if (all) {
    if (u.role !== 'admin') throw forbidden('Solo dirección puede enviar a todo el colegio.');
    return;
  }
  if (courseIds.length === 0) throw badRequest('Elige al menos un curso.');
  const allowed = new Set(await courseIdsFor(db, u));
  if (courseIds.some((id) => !allowed.has(id))) throw forbidden('Solo puedes elegir tus cursos.');
}

export async function createEvent(db: Db, u: AuthUser, input: EventInput) {
  if (input.ends_at <= input.starts_at) throw badRequest('La hora de fin debe ser posterior al inicio.');
  await checkAudience(db, u, input.audience_all, input.course_ids);
  const { rows } = await db.query<{ id: string }>(
    `insert into events (school_id, author_id, title, description, location, starts_at, ends_at,
                         audience_all, rsvp_enabled)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`,
    [u.school_id, u.id, input.title, input.description, input.location, input.starts_at,
     input.ends_at, input.audience_all, input.rsvp_enabled],
  );
  const id = rows[0].id;
  if (!input.audience_all) {
    await db.query(
      `insert into event_courses (event_id, course_id) select $1, unnest($2::uuid[])`,
      [id, input.course_ids],
    );
  }
  return id;
}

export function eventsRouter(db: Db) {
  const r = Router();

  r.get('/', async (req, res) => {
    const q = parse(z.object({ from: isoDate.optional(), to: isoDate.optional() }), req.query);
    const from = q.from ?? new Date(Date.now() - 86400_000);
    const to = q.to ?? new Date(Date.now() + 120 * 86400_000);
    res.json(await listEvents(db, me(req), { from, to }));
  });

  r.post('/', requireRole('admin', 'docente'), async (req, res) => {
    const input = parse(eventInput, req.body);
    const id = await db.tx((t) => createEvent(t, me(req), input));
    const [ev] = await listEvents(db, me(req), { ids: [id] });
    res.status(201).json(ev);
  });

  r.put('/:id/rsvp', requireRole('representante'), async (req, res) => {
    const { response } = parse(z.object({ response: z.enum(['si', 'tal_vez', 'no']) }), req.body);
    const id = parse(uuid, req.params.id);
    const [ev] = await listEvents(db, me(req), { ids: [id] });
    if (!ev) throw notFound('El evento');
    if (!ev.rsvp_enabled) throw badRequest('Este evento no pide confirmación.');
    if (new Date(ev.starts_at) < new Date()) throw conflict('El evento ya empezó.');
    await db.query(
      `insert into event_rsvps (event_id, guardian_id, response) values ($1,$2,$3)
       on conflict (event_id, guardian_id) do update set response = excluded.response, updated_at = now()`,
      [id, me(req).id, response],
    );
    const [updated] = await listEvents(db, me(req), { ids: [id] });
    res.json(updated);
  });

  r.get('/:id/rsvps', requireRole('admin', 'docente'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const [ev] = await listEvents(db, me(req), { ids: [id] });
    if (!ev) throw notFound('El evento');
    const { rows } = await db.query(
      `select u.id as guardian_id, u.full_name as guardian_name, r.response, r.updated_at,
              (select string_agg(s.full_name, ', ') from guardians g join students s on s.id = g.student_id
                where g.user_id = u.id) as students
         from event_rsvps r join users u on u.id = r.guardian_id
        where r.event_id = $1 order by r.response, u.full_name`,
      [id],
    );
    res.json(rows);
  });

  r.delete('/:id', requireRole('admin', 'docente'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const u = me(req);
    const { rows } = await db.query(
      `delete from events where id = $1 and school_id = $2 and ($3 or author_id = $4) returning id`,
      [id, u.school_id, u.role === 'admin', u.id],
    );
    if (!rows[0]) throw notFound('El evento');
    res.status(204).end();
  });

  return r;
}
