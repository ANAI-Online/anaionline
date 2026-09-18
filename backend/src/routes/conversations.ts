import { Router } from 'express';
import { z } from 'zod';
import { isGuardianOf, staffCanReachStudent, teachersOfStudent } from '../access.js';
import { isStaff, me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, forbidden, notFound } from '../errors.js';
import { notify } from '../notify.js';
import { withinOfficeHours, type OfficeHours } from '../time.js';
import { parse, uuid } from '../validate.js';

export async function listConversations(db: Db, u: AuthUser, ids?: string[]) {
  const { rows } = await db.query(
    `select cv.id,
            json_build_object('id', t.id, 'full_name', t.full_name, 'title', t.title,
                              'office_hours', t.office_hours) as teacher,
            json_build_object('id', g.id, 'full_name', g.full_name) as guardian,
            json_build_object('id', s.id, 'full_name', s.full_name,
                              'course_label', c.grade || ' ' || c.parallel) as student,
            (select json_build_object('body', m.body, 'created_at', m.created_at, 'sender_id', m.sender_id)
               from messages m where m.conversation_id = cv.id order by m.created_at desc limit 1) as last_message,
            (select count(*)::int from messages m
              where m.conversation_id = cv.id and m.sender_id <> $1 and m.read_at is null) as unread,
            coalesce((select max(created_at) from messages m where m.conversation_id = cv.id), cv.created_at) as updated_at
       from conversations cv
       join users t on t.id = cv.teacher_id join users g on g.id = cv.guardian_id
       join students s on s.id = cv.student_id join courses c on c.id = s.course_id
      where (cv.teacher_id = $1 or cv.guardian_id = $1) ${ids ? 'and cv.id = any($2::uuid[])' : ''}
      order by updated_at desc`,
    ids ? [u.id, ids] : [u.id],
  );
  return rows;
}

async function getConversation(db: Db, u: AuthUser, id: string) {
  const [cv] = await listConversations(db, u, [id]);
  if (!cv) throw notFound('La conversación');
  return cv;
}

export function conversationsRouter(db: Db) {
  const r = Router();

  /** Con quién puedo hablar: docentes de mis hijos, o representantes de mis estudiantes. */
  r.get('/contacts', async (req, res) => {
    const u = me(req);
    if (u.role === 'representante') {
      const { rows: kids } = await db.query<{ id: string; full_name: string; course_label: string }>(
        `select s.id, s.full_name, c.grade || ' ' || c.parallel as course_label
           from guardians g join students s on s.id = g.student_id join courses c on c.id = s.course_id
          where g.user_id = $1 and s.active order by s.full_name`,
        [u.id],
      );
      const out = [];
      for (const k of kids) {
        out.push({ student: k, teachers: await teachersOfStudent(db, k.id) });
      }
      return res.json(out);
    }
    const { rows } = await db.query(
      `select json_build_object('id', s.id, 'full_name', s.full_name,
                                'course_label', c.grade || ' ' || c.parallel) as student,
              json_agg(json_build_object('id', g.id, 'full_name', g.full_name, 'relationship', gd.relationship)
                       order by g.full_name) as guardians
         from students s join courses c on c.id = s.course_id
         join guardians gd on gd.student_id = s.id join users g on g.id = gd.user_id
        where s.school_id = $2 and s.active and g.active and ($3 or c.tutor_id = $1 or exists (
          select 1 from teacher_courses tc where tc.teacher_id = $1 and tc.course_id = c.id))
        group by s.id, c.id order by c.sort_order, c.grade, c.parallel, s.full_name`,
      [u.id, u.school_id, u.role === 'admin'],
    );
    res.json(rows);
  });

  r.get('/conversations', async (req, res) => {
    res.json(await listConversations(db, me(req)));
  });

  /** Abre (o reutiliza) la conversación sobre un estudiante. */
  r.post('/conversations', async (req, res) => {
    const u = me(req);
    const body = parse(
      z.object({ student_id: uuid, teacher_id: uuid.optional(), guardian_id: uuid.optional() }),
      req.body,
    );
    let teacherId: string, guardianId: string;
    if (u.role === 'representante') {
      if (!body.teacher_id) throw badRequest('Elige un docente.');
      if (!(await isGuardianOf(db, u.id, body.student_id))) throw forbidden();
      const teachers = await teachersOfStudent(db, body.student_id);
      if (!teachers.some((t) => t.id === body.teacher_id)) throw forbidden('Ese docente no atiende a tu representado.');
      teacherId = body.teacher_id;
      guardianId = u.id;
    } else {
      if (!body.guardian_id) throw badRequest('Elige un representante.');
      if (!(await staffCanReachStudent(db, u, body.student_id))) throw forbidden();
      if (!(await isGuardianOf(db, body.guardian_id, body.student_id))) throw forbidden();
      teacherId = u.id;
      guardianId = body.guardian_id;
    }
    const { rows } = await db.query<{ id: string }>(
      `insert into conversations (school_id, teacher_id, guardian_id, student_id) values ($1,$2,$3,$4)
       on conflict (teacher_id, guardian_id, student_id) do update set teacher_id = excluded.teacher_id
       returning id`,
      [u.school_id, teacherId, guardianId, body.student_id],
    );
    res.status(201).json(await getConversation(db, u, rows[0].id));
  });

  r.get('/conversations/:id/messages', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const conversation = await getConversation(db, u, id);
    await db.query(
      `update messages set read_at = now() where conversation_id = $1 and sender_id <> $2 and read_at is null`,
      [id, u.id],
    );
    const { rows } = await db.query(
      `select id, conversation_id, sender_id, body, created_at, read_at
         from messages where conversation_id = $1 order by created_at`,
      [id],
    );
    res.json({ conversation: { ...conversation, unread: 0 }, messages: rows });
  });

  r.post('/conversations/:id/messages', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const { body } = parse(z.object({ body: z.string().trim().min(1).max(4000) }), req.body);
    const cv = await getConversation(db, u, id);
    const { rows } = await db.query(
      `insert into messages (conversation_id, sender_id, body) values ($1,$2,$3)
       returning id, conversation_id, sender_id, body, created_at, read_at`,
      [id, u.id, body],
    );
    const toTeacher = u.id === cv.guardian.id;
    const recipient = toTeacher ? cv.teacher.id : cv.guardian.id;
    // Fuera del horario de atención, el docente no recibe aviso hasta el siguiente día hábil.
    const outside = toTeacher && !withinOfficeHours(cv.teacher.office_hours as OfficeHours | null);
    if (!outside) {
      const from = u.title ? `${u.title} ${u.full_name}` : u.full_name;
      notify(db, {
        userIds: [recipient], title: `Mensaje de ${from}`, body: body.slice(0, 140), link: `/mensajes/${id}`,
        priority: 'normal', action: 'Leer y responder',
        emailBody: `Tienes un mensaje nuevo sobre ${cv.student.full_name}. Por privacidad, el contenido solo se muestra en la plataforma.`,
      });
    }
    res.status(201).json({ ...rows[0], outside_office_hours: outside });
  });

  r.post('/messages/:id/report', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const { reason } = parse(z.object({ reason: z.string().trim().min(3).max(500) }), req.body);
    const { rows } = await db.query(
      `select m.id from messages m join conversations cv on cv.id = m.conversation_id
        where m.id = $1 and (cv.teacher_id = $2 or cv.guardian_id = $2) and m.sender_id <> $2`,
      [id, u.id],
    );
    if (!rows[0]) throw notFound('El mensaje');
    await db.query(`insert into message_reports (message_id, reporter_id, reason) values ($1,$2,$3)`, [id, u.id, reason]);
    res.status(201).json({ ok: true });
  });

  /** Moderación (dirección) */
  r.get('/reports', requireRole('admin'), async (req, res) => {
    const { rows } = await db.query(
      `select mr.id, mr.reason, mr.status, mr.created_at,
              json_build_object('id', m.id, 'body', m.body, 'created_at', m.created_at,
                                'sender_name', snd.full_name) as message,
              rep.full_name as reporter_name,
              t.full_name as teacher_name, g.full_name as guardian_name, s.full_name as student_name
         from message_reports mr
         join messages m on m.id = mr.message_id join users snd on snd.id = m.sender_id
         join users rep on rep.id = mr.reporter_id
         join conversations cv on cv.id = m.conversation_id
         join users t on t.id = cv.teacher_id join users g on g.id = cv.guardian_id
         join students s on s.id = cv.student_id
        where cv.school_id = $1 order by (mr.status = 'revisado'), mr.created_at desc`,
      [me(req).school_id],
    );
    res.json(rows);
  });

  r.patch('/reports/:id', requireRole('admin'), async (req, res) => {
    const { status } = parse(z.object({ status: z.enum(['pendiente', 'revisado']) }), req.body);
    await db.query(`update message_reports set status = $2 where id = $1`, [parse(uuid, req.params.id), status]);
    res.status(204).end();
  });

  return r;
}

export { isStaff };
