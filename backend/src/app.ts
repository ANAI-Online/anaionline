import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { requireAuth } from './auth.js';
import type { Db } from './db/client.js';
import { env } from './env.js';
import { HttpError } from './errors.js';
import { accountRouter } from './routes/account.js';
import { adminRouter } from './routes/admin.js';
import { pushRouter } from './routes/push.js';
import { announcementsRouter } from './routes/announcements.js';
import { appointmentsRouter } from './routes/appointments.js';
import { conversationsRouter } from './routes/conversations.js';
import { dashboardRouter } from './routes/dashboard.js';
import { eventsRouter } from './routes/events.js';
import { homeRouter } from './routes/home.js';
import { postsRouter } from './routes/posts.js';

export function createApp(db: Db) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1); // detrás del proxy HTTPS del proveedor
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => { res.json({ ok: true }); });
  app.use('/api', accountRouter(db));

  const auth = requireAuth(db);
  app.use('/api/home', auth, homeRouter(db));
  app.use('/api/announcements', auth, announcementsRouter(db));
  app.use('/api/events', auth, eventsRouter(db));
  app.use('/api/posts', auth, postsRouter(db));
  app.use('/api/dashboard', auth, dashboardRouter(db));
  app.use('/api/admin', auth, adminRouter(db));
  app.use('/api/push', auth, pushRouter(db));
  app.use('/api', auth, conversationsRouter(db));
  app.use('/api', auth, appointmentsRouter(db));

  app.use('/api', (_req, res) => { res.status(404).json({ error: 'Ruta no encontrada.' }); });

  // En producción, el mismo servidor entrega la app web compilada (frontend/dist)
  const web = fileURLToPath(new URL('../../frontend/dist', import.meta.url));
  if (existsSync(web)) {
    app.use(express.static(web, { index: false, maxAge: '1h', setHeaders: (res, path) => {
      if (path.endsWith('sw.js') || path.endsWith('.webmanifest')) res.setHeader('Cache-Control', 'no-cache');
    } }));
    app.get(/^\/(?!api\/).*/, (_req, res) => { res.setHeader('Cache-Control', 'no-cache'); res.sendFile(`${web}/index.html`); });
  }

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    if ((err as any)?.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido.' });
    console.error(err);
    res.status(500).json({ error: 'Algo falló en el servidor. Intenta de nuevo.' });
  });
  return app;
}
