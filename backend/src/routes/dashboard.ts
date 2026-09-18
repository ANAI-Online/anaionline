import { Router } from 'express';
import { me, requireRole } from '../auth.js';
import type { Db } from '../db/client.js';

const median = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/** Horas que tarda el personal en responder el primer mensaje sin respuesta de un representante. */
function responseTimes(msgs: { conversation_id: string; from_staff: boolean; created_at: Date; course_id: string }[]) {
  const out: { course_id: string; hours: number }[] = [];
  const waiting = new Map<string, Date>();
  for (const m of msgs) {
    if (!m.from_staff) {
      if (!waiting.has(m.conversation_id)) waiting.set(m.conversation_id, new Date(m.created_at));
    } else if (waiting.has(m.conversation_id)) {
      const t0 = waiting.get(m.conversation_id)!;
      out.push({ course_id: m.course_id, hours: (new Date(m.created_at).getTime() - t0.getTime()) / 3600_000 });
      waiting.delete(m.conversation_id);
    }
  }
  return out;
}

export function dashboardRouter(db: Db) {
  const r = Router();
  r.get('/', requireRole('admin'), async (req, res) => {
    const school = me(req).school_id;
    const q = async (sql: string) => (await db.query(sql, [school])).rows[0];

    const reads = await q(
      `select count(*)::int as total, count(r.read_at)::int as read
         from announcement_recipients r join announcements a on a.id = r.announcement_id
        where a.school_id = $1 and a.created_at > now() - interval '30 days'`,
    );
    const fam = await q(
      `select count(*)::int as total,
              count(*) filter (where last_seen_at > now() - interval '30 days')::int as active
         from users where school_id = $1 and role = 'representante'`,
    );
    const pendingAuth = await q(
      `select count(*)::int as n from announcement_recipients r join announcements a on a.id = r.announcement_id
        where a.school_id = $1 and a.kind = 'autorizacion' and r.response is null
          and (a.deadline is null or a.deadline > now())`,
    );
    const unanswered = await q(
      `select count(*)::int as n from conversations cv
        where cv.school_id = $1 and exists (
          select 1 from messages m where m.id = (
            select id from messages where conversation_id = cv.id order by created_at desc limit 1)
          and m.sender_id = cv.guardian_id and m.created_at < now() - interval '48 hours')`,
    );
    const appts = await q(
      `select count(*)::int as n from appointments a join users t on t.id = a.teacher_id
        where t.school_id = $1 and a.status = 'solicitada'`,
    );
    const reports = await q(
      `select count(*)::int as n from message_reports mr join messages m on m.id = mr.message_id
         join conversations cv on cv.id = m.conversation_id
        where cv.school_id = $1 and mr.status = 'pendiente'`,
    );

    const { rows: msgs } = await db.query(
      `select m.conversation_id, (m.sender_id = cv.teacher_id) as from_staff, m.created_at, s.course_id
         from messages m join conversations cv on cv.id = m.conversation_id
         join students s on s.id = cv.student_id
        where cv.school_id = $1 and m.created_at > now() - interval '30 days'
        order by m.conversation_id, m.created_at`,
      [school],
    );
    const times = responseTimes(msgs);

    const { rows: courses } = await db.query(
      `select c.id, c.grade || ' ' || c.parallel as label,
              (select count(*)::int from announcement_recipients r
                 join announcements a on a.id = r.announcement_id join students s on s.id = r.student_id
                where s.course_id = c.id and a.created_at > now() - interval '30 days') as total,
              (select count(r.read_at)::int from announcement_recipients r
                 join announcements a on a.id = r.announcement_id join students s on s.id = r.student_id
                where s.course_id = c.id and a.created_at > now() - interval '30 days') as read,
              (select count(distinct g.user_id)::int from guardians g join students s on s.id = g.student_id
                 join users u on u.id = g.user_id
                where s.course_id = c.id and (u.last_seen_at is null or u.last_seen_at < now() - interval '30 days')) as inactive
         from courses c where c.school_id = $1 order by c.sort_order, c.grade, c.parallel`,
      [school],
    );

    const rate = (read: number, total: number) => (total ? read / total : null);
    res.json({
      read_rate: rate(reads.read, reads.total),
      families_active: fam.active,
      families_total: fam.total,
      median_response_hours: median(times.map((t) => t.hours)),
      pending_authorizations: pendingAuth.n,
      unanswered_48h: unanswered.n,
      pending_appointments: appts.n,
      open_reports: reports.n,
      courses: courses.map((c: any) => ({
        id: c.id,
        label: c.label,
        read_rate: rate(c.read, c.total),
        response_hours: median(times.filter((t) => t.course_id === c.id).map((t) => t.hours)),
        inactive_families: c.inactive,
      })),
    });
  });
  return r;
}
