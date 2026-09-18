import { Router } from 'express';
import { me, requireRole } from '../auth.js';
import type { Db } from '../db/client.js';
import { listAnnouncements } from './announcements.js';
import { listAppointments } from './appointments.js';
import { listConversations } from './conversations.js';
import { listEvents } from './events.js';
import { listPosts } from './posts.js';

/** Resumen de inicio para representantes: lo pendiente primero. */
export function homeRouter(db: Db) {
  const r = Router();
  r.get('/', requireRole('representante'), async (req, res) => {
    const u = me(req);
    const now = new Date();
    const [pending, upcoming, posts, conversations, appointments] = await Promise.all([
      listAnnouncements(db, u, { pendingOnly: true }),
      listEvents(db, u, { from: now, to: new Date(now.getTime() + 14 * 86400_000), limit: 5 }),
      listPosts(db, u, { limit: 1 }),
      listConversations(db, u),
      listAppointments(db, u, { upcomingOnly: true }),
    ]);
    res.json({
      pending,
      upcoming,
      latest_post: posts[0] ?? null,
      conversations: conversations.slice(0, 2),
      unread_messages: conversations.reduce((n: number, c: any) => n + c.unread, 0),
      appointments,
    });
  });
  return r;
}
