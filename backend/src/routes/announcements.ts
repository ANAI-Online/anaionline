import { Router } from 'express';
import { z } from 'zod';
import { isStaff, me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, conflict, notFound } from '../errors.js';
import { notify } from '../notify.js';
import { fmtDay } from '../time.js';
import { attachment, isoDate, parse, uuid } from '../validate.js';
import { checkAudience, createEvent, listEvents } from './events.js';

const AUDIENCE = `(case when a.audience_all then 'Todo el colegio' else (
  select string_agg(c.grade || ' ' || c.parallel, ', ' order by c.sort_order, c.grade, c.parallel)
    from announcement_courses ac join courses c on c.id = ac.course_id where ac.announcement_id = a.id) end)`;

const BASE = `a.id, a.title, a.body, a.kind, a.deadline, a.attachments, a.created_at, a.event_id,
  ${AUDIENCE} as audience_label,
  json_build_object('id', u.id, 'full_name', u.full_name, 'title', u.title, 'role', u.role) as author`;

/** Pendiente = requiere respuesta y aún no la tiene. */
const needsAnswer = (kind: string) => kind === 'lectura' || kind === 'autorizacion';

export async function listAnnouncements(
  db: Db, u: AuthUser, opts: { ids?: string[]; pendingOnly?: boolean; limit?: number } = {},
) {
  const params: unknown[] = [u.id, u.school_id];
  const filters: string[] = [];
  if (opts.ids) { params.push(opts.ids); filters.push(`a.id = any($${params.length}::uuid[])`); }
  params.push(opts.limit ?? 100);
  const lim = `$${params.length}`;
  const extra = filters.length ? `and ${filters.join(' and ')}` : '';

  let rows: any[];
  if (u.role === 'representante') {
    ({ rows } = await db.query(
      `select ${BASE},
              json_agg(json_build_object('student_id', s.id, 'student_name', s.full_name,
                'read_at', r.read_at, 'response', r.response, 'responded_at', r.responded_at)
                order by s.full_name) as targets
         from announcements a
         join announcement_recipients r on r.announcement_id = a.id and r.guardian_id = $1
         join students s on s.id = r.student_id
         join users u on u.id = a.author_id
        where a.school_id = $2 ${extra}
        group by a.id, u.id order by a.created_at desc limit ${lim}`,
      params,
    ));
  } else {
    ({ rows } = await db.query(
      `select ${BASE},
              (select json_build_object(
                 'total', count(*),
                 'read', count(*) filter (where read_at is not null),
                 'si', count(*) filter (where response = 'si'),
                 'no', count(*) filter (where response = 'no'))
                 from announcement_recipients r where r.announcement_id = a.id) as stats
         from announcements a join users u on u.id = a.author_id
        where a.school_id = $2 and (a.author_id = $1 or ${u.role === 'admin'}) ${extra}
        order by a.created_at desc limit ${lim}`,
      params,
    ));
    for (const a of rows) {
      const s = a.stats;
      s.pending = needsAnswer(a.kind) ? s.total - s.si - s.no : s.total - s.read;
    }
  }

  const eventIds = rows.map((a) => a.event_id).filter(Boolean);
  const events = eventIds.length ? await listEvents(db, u, { ids: eventIds }) : [];
  const byId = new Map(events.map((e: any) => [e.id, e]));

  let out = rows.map(({ event_id, ...a }) => ({ ...a, event: event_id ? byId.get(event_id) ?? null : null }));
  if (opts.pendingOnly && u.role === 'representante') {
    const now = new Date();
    out = out.filter(
      (a) =>
        (needsAnswer(a.kind) && a.targets.some((t: any) => !t.response) &&
          (!a.deadline || new Date(a.deadline) > now)) ||
        (a.event?.rsvp_enabled && !a.event.my_rsvp && new Date(a.event.starts_at) > now),
    );
  }
  return out;
}

const createInput = z.object({
  title: z.string().trim().min(3).max(160),
  body: z.string().trim().min(1).max(5000),
  kind: z.enum(['informativo', 'lectura', 'autorizacion']),
  audience_all: z.boolean().default(false),
  course_ids: z.array(uuid).default([]),
  deadline: isoDate.nullable().default(null),
  attachments: z.array(attachment).max(5).default([]),
  event: z
    .object({ starts_at: isoDate, ends_at: isoDate, location: z.string().max(200).default('') })
    .nullable()
    .default(null),
});

export function announcementsRouter(db: Db) {
  const r = Router();

  r.get('/', async (req, res) => {
    const pendingOnly = req.query.status === 'pendientes';
    res.json(await listAnnouncements(db, me(req), { pendingOnly }));
  });

  r.get('/:id', async (req, res) => {
    const [a] = await listAnnouncements(db, me(req), { ids: [parse(uuid, req.params.id)] });
    if (!a) throw notFound('El comunicado');
    res.json(a);
  });

  r.post('/', requireRole('admin', 'docente'), async (req, res) => {
    const u = me(req);
    const input = parse(createInput, req.body);
    if (input.deadline && input.deadline < new Date()) throw badRequest('La fecha límite ya pasó.');
    await checkAudience(db, u, input.audience_all, input.course_ids);

    const { id, recipients } = await db.tx(async (t) => {
      const eventId = input.event
        ? await createEvent(t, u, {
            title: input.title, description: input.body, location: input.event.location,
            starts_at: input.event.starts_at, ends_at: input.event.ends_at,
            audience_all: input.audience_all, course_ids: input.course_ids, rsvp_enabled: true,
          })
        : null;
      const { rows } = await t.query<{ id: string }>(
        `insert into announcements (school_id, author_id, title, body, kind, audience_all, deadline,
                                    attachments, event_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`,
        [u.school_id, u.id, input.title, input.body, input.kind, input.audience_all,
         input.deadline, JSON.stringify(input.attachments), eventId],
      );
      const id = rows[0].id;
      if (!input.audience_all) {
        await t.query(
          `insert into announcement_courses (announcement_id, course_id) select $1, unnest($2::uuid[])`,
          [id, input.course_ids],
        );
      }
      const rec = await t.query<{ guardian_id: string }>(
        `insert into announcement_recipients (announcement_id, guardian_id, student_id)
         select $1, g.user_id, s.id from students s join guardians g on g.student_id = s.id
           join users gu on gu.id = g.user_id
          where s.school_id = $2 and s.active and gu.active and ($3::boolean or s.course_id = any($4::uuid[]))
         on conflict do nothing returning guardian_id`,
        [id, u.school_id, input.audience_all, input.course_ids],
      );
      return { id, recipients: [...new Set(rec.rows.map((x) => x.guardian_id))] };
    });

    const author = u.title ? `${u.title} ${u.full_name}` : u.full_name;
    const ask =
      input.kind === 'autorizacion' ? `Necesita tu autorización${input.deadline ? ` hasta el ${fmtDay(input.deadline)}` : ''}.`
      : input.kind === 'lectura' ? 'Confirma que lo leíste.'
      : input.event ? 'Confirma si asistirás.' : '';
    notify(db, {
      userIds: recipients,
      title: input.kind === 'autorizacion' ? `Autorización pendiente: ${input.title}` : `Nuevo comunicado: ${input.title}`,
      body: `${author}. ${ask}`.trim(),
      link: `/comunicados/${id}`,
      priority: input.kind === 'informativo' && !input.event ? 'normal' : 'alta',
      action: input.kind === 'autorizacion' ? 'Revisar y responder' : 'Leer comunicado',
    });
    const [a] = await listAnnouncements(db, u, { ids: [id] });
    res.status(201).json(a);
  });

  r.post('/:id/read', requireRole('representante'), async (req, res) => {
    await db.query(
      `update announcement_recipients set read_at = coalesce(read_at, now())
        where announcement_id = $1 and guardian_id = $2`,
      [parse(uuid, req.params.id), me(req).id],
    );
    res.status(204).end();
  });

  r.post('/:id/respond', requireRole('representante'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const body = parse(z.object({ student_id: uuid, response: z.enum(['si', 'no']) }), req.body);
    const [a] = await listAnnouncements(db, me(req), { ids: [id] });
    if (!a) throw notFound('El comunicado');
    if (!needsAnswer(a.kind)) throw badRequest('Este comunicado no pide respuesta.');
    if (a.kind === 'lectura' && body.response !== 'si') throw badRequest('Solo puedes confirmar la lectura.');
    if (a.deadline && new Date(a.deadline) < new Date()) throw conflict('El plazo para responder terminó.');
    const { rows } = await db.query(
      `update announcement_recipients
          set response = $4, responded_at = now(), read_at = coalesce(read_at, now())
        where announcement_id = $1 and guardian_id = $2 and student_id = $3 returning 1`,
      [id, me(req).id, body.student_id, body.response],
    );
    if (!rows[0]) throw notFound('El estudiante');
    const [updated] = await listAnnouncements(db, me(req), { ids: [id] });
    res.json(updated);
  });

  r.get('/:id/recipients', requireRole('admin', 'docente'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const [a] = await listAnnouncements(db, me(req), { ids: [id] });
    if (!a) throw notFound('El comunicado');
    const { rows } = await db.query(
      `select r.guardian_id, g.full_name as guardian_name, s.id as student_id, s.full_name as student_name,
              c.grade || ' ' || c.parallel as course_label, r.read_at, r.response, r.responded_at, r.reminded_at
         from announcement_recipients r
         join users g on g.id = r.guardian_id
         join students s on s.id = r.student_id join courses c on c.id = s.course_id
        where r.announcement_id = $1
        order by (r.response is not null), (r.read_at is not null), c.sort_order, c.parallel, s.full_name`,
      [id],
    );
    res.json(rows);
  });

  r.post('/:id/remind', requireRole('admin', 'docente'), async (req, res) => {
    const id = parse(uuid, req.params.id);
    const [a] = await listAnnouncements(db, me(req), { ids: [id] });
    if (!a) throw notFound('El comunicado');
    const pendingCond = needsAnswer(a.kind) ? 'response is null' : 'read_at is null';
    const { rows } = await db.query<{ guardian_id: string }>(
      `update announcement_recipients set reminded_at = now()
        where announcement_id = $1 and ${pendingCond} returning guardian_id`,
      [id],
    );
    const ids = [...new Set(rows.map((x) => x.guardian_id))];
    notify(db, {
      userIds: ids, title: `Recordatorio: ${a.title}`,
      body: a.deadline ? `Aún falta tu respuesta. El plazo termina el ${fmtDay(a.deadline)}.` : 'Aún falta tu respuesta.',
      link: `/comunicados/${id}`, priority: 'alta', action: 'Responder ahora',
    });
    res.json({ reminded: ids.length });
  });

  return r;
}

export { isStaff };
