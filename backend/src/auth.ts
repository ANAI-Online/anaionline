import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Db } from './db/client.js';
import { env } from './env.js';
import { forbidden, HttpError } from './errors.js';

export type Role = 'admin' | 'docente' | 'representante';

export interface AuthUser {
  id: string;
  school_id: string;
  role: Role;
  full_name: string;
  title: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const signToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: '14d' });

export function requireAuth(db: Db) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new HttpError(401, 'Inicia sesión para continuar.');
    let sub: string;
    try {
      sub = (jwt.verify(token, env.jwtSecret) as { sub: string }).sub;
    } catch {
      throw new HttpError(401, 'Tu sesión expiró. Vuelve a iniciar sesión.');
    }
    const { rows } = await db.query<AuthUser & { stale: boolean }>(
      `select id, school_id, role, full_name, title,
              (last_seen_at is null or last_seen_at < now() - interval '5 minutes') as stale
         from users where id = $1 and active`,
      [sub],
    );
    const user = rows[0];
    if (!user) throw new HttpError(401, 'Tu cuenta ya no está activa.');
    if (user.stale) await db.query('update users set last_seen_at = now() where id = $1', [user.id]);
    const { stale: _s, ...clean } = user;
    req.user = clean;
    next();
  };
}

export const me = (req: Request) => req.user!;

export const isStaff = (u: AuthUser) => u.role === 'admin' || u.role === 'docente';

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) throw forbidden();
    next();
  };
}
