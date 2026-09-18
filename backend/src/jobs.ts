/**
 * Recordatorios automáticos. Se revisan cada 10 minutos; cada aviso se marca al enviarse
 * (update … returning) para que no se repita aunque el servidor se reinicie.
 */
import type { Db } from './db/client.js';
import { notify } from './notify.js';
import { fmtDay, fmtTime } from './time.js';

export async function runJobs(db: Db) {
  // 1. Autorizaciones y lecturas que vencen en las próximas ~30 horas
  const { rows: anns } = await db.query<{ id: string; title: string; deadline: Date; kind: string }>(
    `update announcements set auto_reminded_at = now()
      where kind in ('lectura', 'autorizacion') and auto_reminded_at is null
        and deadline between now() + interval '2 hours' and now() + interval '30 hours'
      returning id, title, deadline, kind`,
  );
  for (const a of anns) {
    const { rows } = await db.query<{ guardian_id: string }>(
      'select distinct guardian_id from announcement_recipients where announcement_id = $1 and response is null', [a.id],
    );
    notify(db, {
      userIds: rows.map((r) => r.guardian_id),
      title: `El plazo vence pronto: ${a.title}`,
      body: `Responde hasta el ${fmtDay(a.deadline)} a las ${fmtTime(a.deadline)}.`,
      link: `/comunicados/${a.id}`, priority: 'alta',
      action: a.kind === 'autorizacion' ? 'Revisar y responder' : 'Confirmar lectura',
    });
  }

  // 2. Eventos de mañana: a quienes confirmaron que asistirán
  const { rows: evs } = await db.query<{ id: string; title: string; starts_at: Date; location: string }>(
    `update events set reminded_at = now()
      where reminded_at is null and starts_at between now() + interval '12 hours' and now() + interval '30 hours'
      returning id, title, starts_at, location`,
  );
  for (const e of evs) {
    const { rows } = await db.query<{ guardian_id: string }>(
      `select guardian_id from event_rsvps where event_id = $1 and response in ('si', 'tal_vez')`, [e.id],
    );
    notify(db, {
      userIds: rows.map((r) => r.guardian_id),
      title: `Recordatorio: ${e.title}`,
      body: `${fmtDay(e.starts_at)}, ${fmtTime(e.starts_at)}${e.location ? `, ${e.location}` : ''}.`,
      link: '/agenda', priority: 'normal', action: 'Ver agenda',
    });
  }

  // 3. Citas confirmadas en las próximas ~26 horas: a ambas partes
  const { rows: appts } = await db.query<{ teacher_id: string; guardian_id: string; starts_at: Date; student: string }>(
    `update appointments a set reminded_at = now()
       from availability_slots s, students st
      where s.id = a.slot_id and st.id = a.student_id and a.status = 'confirmada' and a.reminded_at is null
        and s.starts_at between now() + interval '2 hours' and now() + interval '26 hours'
      returning a.teacher_id, a.guardian_id, s.starts_at, st.full_name as student`,
  );
  for (const a of appts) {
    notify(db, {
      userIds: [a.teacher_id, a.guardian_id],
      title: 'Recordatorio de cita',
      body: `${fmtDay(a.starts_at)} a las ${fmtTime(a.starts_at)}, sobre ${a.student}.`,
      link: '/agenda?vista=citas', priority: 'normal', action: 'Ver mis citas',
    });
  }
  return { announcements: anns.length, events: evs.length, appointments: appts.length };
}

export function startJobs(db: Db) {
  const tick = () => runJobs(db).catch((e) => console.error('[recordatorios]', e));
  setTimeout(tick, 30_000);
  return setInterval(tick, 10 * 60_000);
}
