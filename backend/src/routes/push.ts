import { Router } from 'express';
import { z } from 'zod';
import { me } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest } from '../errors.js';
import { deliver, getVapidPublicKey } from '../notify.js';
import { parse } from '../validate.js';

export function pushRouter(db: Db) {
  const r = Router();

  r.get('/key', (_req, res) => {
    const key = getVapidPublicKey();
    if (!key) throw badRequest('Las notificaciones push no están configuradas en el servidor.');
    res.json({ key });
  });

  r.post('/subscribe', async (req, res) => {
    const sub = parse(
      z.object({
        endpoint: z.string().url().max(1000),
        keys: z.object({ p256dh: z.string().min(10).max(200), auth: z.string().min(8).max(100) }),
      }),
      req.body,
    );
    await db.query(
      `insert into push_subscriptions (user_id, endpoint, p256dh, auth, user_agent) values ($1,$2,$3,$4,$5)
       on conflict (endpoint) do update set user_id = excluded.user_id, p256dh = excluded.p256dh, auth = excluded.auth`,
      [me(req).id, sub.endpoint, sub.keys.p256dh, sub.keys.auth, String(req.headers['user-agent'] ?? '').slice(0, 300)],
    );
    res.status(201).json({ ok: true });
  });

  r.post('/unsubscribe', async (req, res) => {
    const { endpoint } = parse(z.object({ endpoint: z.string().url() }), req.body);
    await db.query('delete from push_subscriptions where endpoint = $1 and user_id = $2', [endpoint, me(req).id]);
    res.json({ ok: true });
  });

  /** Envía una notificación de prueba a los dispositivos de quien la pide. */
  r.post('/test', async (req, res) => {
    await deliver(db, {
      userIds: [me(req).id], title: 'Notificaciones activadas',
      body: 'Así te avisaremos de comunicados, mensajes y citas.', link: '/', priority: 'baja',
    });
    res.json({ ok: true });
  });

  return r;
}
