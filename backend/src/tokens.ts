import { createHash, randomBytes } from 'node:crypto';
import type { Db } from './db/client.js';
import { env } from './env.js';
import { background, channels, emailTemplate, schoolNameOf, sendEmail } from './notify.js';

export type TokenKind = 'invitacion' | 'restablecer';
const TTL = { invitacion: 14 * 24, restablecer: 2 }; // horas

export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');

export async function createToken(db: Db, userId: string, kind: TokenKind) {
  const raw = randomBytes(32).toString('base64url');
  // un solo enlace vigente por tipo
  await db.query('delete from auth_tokens where user_id = $1 and kind = $2 and used_at is null', [userId, kind]);
  await db.query(
    `insert into auth_tokens (user_id, kind, token_hash, expires_at)
     values ($1, $2, $3, now() + make_interval(hours => $4))`,
    [userId, kind, hashToken(raw), TTL[kind]],
  );
  return raw;
}

export async function findToken(db: Db, raw: string) {
  const { rows } = await db.query<{ id: string; user_id: string; kind: TokenKind; full_name: string; email: string }>(
    `select t.id, t.user_id, t.kind, u.full_name, u.email from auth_tokens t join users u on u.id = t.user_id
      where t.token_hash = $1 and t.used_at is null and t.expires_at > now() and u.active`,
    [hashToken(raw)],
  );
  return rows[0] ?? null;
}

/**
 * Crea el enlace y lo envía por correo en segundo plano. Devuelve el enlace de inmediato
 * para que dirección pueda compartirlo por otro medio. email_sent = el correo está en camino.
 */
export async function sendAccountLink(db: Db, userId: string, kind: TokenKind) {
  const { rows } = await db.query<{ id: string; email: string; full_name: string; role: string }>(
    'select id, email, full_name, role from users where id = $1', [userId],
  );
  const u = rows[0];
  const raw = await createToken(db, userId, kind);
  const path = kind === 'invitacion' ? 'activar' : 'restablecer';
  const url = `${env.appUrl}/${path}?token=${raw}`;
  const school = await schoolNameOf(db, userId);
  const first = u.full_name.split(' ')[0];
  const content = kind === 'invitacion'
    ? emailTemplate({
        school, title: `${first}, te damos la bienvenida`,
        lines: [
          `${school} usará esta plataforma para enviarte comunicados, autorizaciones, novedades y la agenda del colegio, y para que puedas escribir a ${u.role === 'representante' ? 'los docentes' : 'las familias'}.`,
          `Tu usuario es ${u.email}. Crea tu contraseña con el botón; el enlace vence en 14 días.`,
        ],
        action: 'Crear mi contraseña', url,
        footer: 'Si no esperabas este correo, puedes ignorarlo.',
      })
    : emailTemplate({
        school, title: 'Restablece tu contraseña',
        lines: ['Recibimos un pedido para cambiar tu contraseña. El enlace vence en 2 horas y solo se puede usar una vez.'],
        action: 'Crear una contraseña nueva', url,
        footer: 'Si no lo pediste, ignora este correo: tu contraseña actual sigue funcionando.',
      });
  const subject = kind === 'invitacion' ? `Activa tu cuenta de ${school}` : 'Restablece tu contraseña';
  const emailing = channels.email;
  background(sendEmail(db, u, subject, content));
  return { url, email_sent: emailing };
}
