/**
 * Notificaciones: push (Web Push con VAPID) y correo (SMTP).
 *
 * Reglas de correo según prioridad:
 *  - alta:   siempre (autorizaciones, recordatorios, cambios de citas)
 *  - normal: si la persona no tiene push activado en ningún dispositivo, o eligió "todo"
 *  - baja:   solo si eligió "todo" (novedades)
 * Por la LOPDP, los correos llevan lo mínimo: nunca el texto de los mensajes privados.
 */
import nodemailer, { type Transporter } from 'nodemailer';
import webpush from 'web-push';
import type { Db } from './db/client.js';
import { env } from './env.js';

export type Priority = 'alta' | 'normal' | 'baja';

export interface Notice {
  userIds: string[];
  title: string;
  body: string;
  link: string; // ruta dentro de la app, p. ej. /comunicados/…
  priority: Priority;
  /** Texto del botón del correo */
  action?: string;
  /** Texto para el correo, si debe ser distinto (p. ej. sin el contenido de un mensaje privado) */
  emailBody?: string;
}

let pushEnabled = false;
let vapidPublicKey: string | null = null;

/**
 * Activa Web Push. Usa VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY si existen; si no, genera un par
 * una sola vez y lo guarda en la base (tabla settings), para no tener que configurarlo a mano.
 */
export async function initPush(db: Db) {
  let pub = env.vapid.publicKey, priv = env.vapid.privateKey;
  if (!pub || !priv) {
    const { rows } = await db.query<{ key: string; value: string }>(
      `select key, value from settings where key in ('vapid_public', 'vapid_private')`,
    );
    pub = rows.find((r) => r.key === 'vapid_public')?.value;
    priv = rows.find((r) => r.key === 'vapid_private')?.value;
    if (!pub || !priv) {
      const k = webpush.generateVAPIDKeys();
      pub = k.publicKey; priv = k.privateKey;
      await db.query(
        `insert into settings (key, value) values ('vapid_public', $1), ('vapid_private', $2)
         on conflict (key) do nothing`, [pub, priv],
      );
      // si otra instancia se adelantó, se usan sus claves
      const again = await db.query<{ key: string; value: string }>(`select key, value from settings where key in ('vapid_public', 'vapid_private')`);
      pub = again.rows.find((r) => r.key === 'vapid_public')!.value;
      priv = again.rows.find((r) => r.key === 'vapid_private')!.value;
    }
  }
  webpush.setVapidDetails(env.vapid.subject, pub, priv);
  vapidPublicKey = pub;
  pushEnabled = true;
  channels.push = true;
}
export const getVapidPublicKey = () => vapidPublicKey;

let mailer: Transporter | null = null;
function getMailer() {
  if (!env.smtp.host) return null;
  mailer ??= nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
    pool: true,
    maxConnections: 3,
    // Sin respuesta en pocos segundos, se da por fallido (algunos proveedores bloquean SMTP)
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return mailer;
}

export const channels: { push: boolean; email: boolean; email_error: string | null } = {
  push: false, email: !!env.smtp.host, email_error: null,
};

/**
 * Comprueba la conexión con el servidor de correo. Si falla (credenciales, o un proveedor
 * que bloquea los puertos SMTP), el correo queda "no disponible" y la app lo muestra.
 */
export async function checkEmail() {
  const m = getMailer();
  if (!m) return;
  try {
    await m.verify();
    channels.email = true;
    channels.email_error = null;
  } catch (e) {
    const msg = (e as Error).message ?? '';
    channels.email = false;
    channels.email_error = /timeout|ETIMEDOUT|ECONNREFUSED|ENETUNREACH/i.test(msg)
      ? 'El servidor no logra conectarse al correo. En el plan gratuito de Render los puertos de correo (SMTP) están bloqueados.'
      : /auth|Invalid login|535|534/i.test(msg)
        ? 'El servidor de correo rechazó el usuario o la contraseña (revisa SMTP_USER y SMTP_PASS).'
        : `No se pudo conectar al correo: ${msg.slice(0, 160)}`;
    console.error('[correo]', channels.email_error);
  }
}

/* ——— Plantilla de correo ——— */

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function emailTemplate(o: { school: string; title: string; lines: string[]; action: string; url: string; footer?: string }) {
  const footer = o.footer ?? 'Este es un aviso automático. Para responder, usa la plataforma: así la conversación queda registrada.';
  const text = [o.school, '', o.title, '', ...o.lines, '', `${o.action}: ${o.url}`, '', footer].join('\n');
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f5f3ee;font-family:Arial,Helvetica,sans-serif;color:#1b2130">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ee;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e2ddd3;border-radius:16px">
<tr><td style="padding:24px 28px 8px;font-size:14px;color:#6b7080">${esc(o.school)}</td></tr>
<tr><td style="padding:0 28px;font-size:21px;font-weight:bold;line-height:1.3">${esc(o.title)}</td></tr>
<tr><td style="padding:14px 28px 0;font-size:16px;line-height:1.55">${o.lines.map((l) => `<p style="margin:0 0 10px">${esc(l)}</p>`).join('')}</td></tr>
<tr><td style="padding:10px 28px 26px"><a href="${esc(o.url)}" style="display:inline-block;background:#0f5e63;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:13px 22px;border-radius:10px">${esc(o.action)}</a></td></tr>
</table>
<p style="max-width:520px;font-size:12.5px;color:#6b7080;line-height:1.5;margin:14px auto 0">${esc(footer)}</p>
</td></tr></table></body></html>`;
  return { html, text };
}

export async function schoolNameOf(db: Db, userId: string) {
  const { rows } = await db.query(
    'select s.name from users u join schools s on s.id = u.school_id where u.id = $1', [userId],
  );
  return (rows[0]?.name as string) ?? 'Unidad Educativa';
}

async function log(db: Db, userId: string | null, channel: 'push' | 'correo', title: string, status: string, error?: string) {
  await db.query(
    'insert into notification_log (user_id, channel, title, status, error) values ($1,$2,$3,$4,$5)',
    [userId, channel, title.slice(0, 200), status, error?.slice(0, 500) ?? null],
  ).catch(() => {});
}

/** Envía un correo. Sin SMTP configurado lo muestra en consola y lo registra como "simulado". */
export async function sendEmail(db: Db, to: { id: string | null; email: string }, subject: string, content: { html: string; text: string }) {
  const m = channels.email ? getMailer() : null;
  if (!m) {
    if (process.env.NODE_ENV !== 'test') console.log(`[correo simulado] Para: ${to.email} · ${subject}\n${content.text}\n`);
    await log(db, to.id, 'correo', subject, 'simulado', channels.email_error ?? undefined);
    return { ok: true, simulated: true };
  }
  try {
    await m.sendMail({ from: env.mailFrom, replyTo: env.mailReplyTo, to: to.email, subject, html: content.html, text: content.text });
    await log(db, to.id, 'correo', subject, 'enviado');
    return { ok: true, simulated: false };
  } catch (e) {
    await log(db, to.id, 'correo', subject, 'fallido', (e as Error).message);
    console.error('[correo] fallo al enviar', (e as Error).message);
    return { ok: false, simulated: false };
  }
}

type Sub = { id: string; user_id: string; endpoint: string; p256dh: string; auth: string };

async function sendPush(db: Db, sub: Sub, n: Notice) {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify({ title: n.title, body: n.body, url: n.link }),
      { TTL: 60 * 60 * 24 * 3, urgency: n.priority === 'alta' ? 'high' : 'normal' },
    );
    await log(db, sub.user_id, 'push', n.title, 'enviado');
    return true;
  } catch (e: any) {
    // 404/410: el navegador anuló la suscripción; se borra
    if (e?.statusCode === 404 || e?.statusCode === 410) {
      await db.query('delete from push_subscriptions where id = $1', [sub.id]);
    } else {
      await log(db, sub.user_id, 'push', n.title, 'fallido', e?.message);
    }
    return false;
  }
}

export async function deliver(db: Db, n: Notice) {
  const ids = [...new Set(n.userIds)];
  if (!ids.length) return;
  const { rows: users } = await db.query<{ id: string; email: string; email_prefs: string }>(
    'select id, email, email_prefs from users where id = any($1::uuid[]) and active', [ids],
  );
  if (!users.length) return;
  const { rows: subs } = pushEnabled
    ? await db.query<Sub>('select id, user_id, endpoint, p256dh, auth from push_subscriptions where user_id = any($1::uuid[])', [ids])
    : { rows: [] as Sub[] };
  const school = await schoolNameOf(db, users[0].id);

  const one = async (u: (typeof users)[number]) => {
    let pushed = 0;
    for (const s of subs.filter((x) => x.user_id === u.id)) if (await sendPush(db, s, n)) pushed++;
    const wantsEmail = n.priority === 'alta' || u.email_prefs === 'todo' || (n.priority === 'normal' && pushed === 0);
    if (!wantsEmail) return;
    const content = emailTemplate({
      school, title: n.title, lines: [n.emailBody ?? n.body], action: n.action ?? 'Abrir en la plataforma', url: `${env.appUrl}${n.link}`,
    });
    await sendEmail(db, u, n.title, content);
  };

  // De 10 en 10 para no saturar el servidor de correo
  for (let i = 0; i < users.length; i += 10) await Promise.all(users.slice(i, i + 10).map(one));
}

const inFlight = new Set<Promise<void>>();

/** Ejecuta una tarea de envío en segundo plano (sin hacer esperar a quien la pidió). */
export function background(task: Promise<unknown>) {
  const p: Promise<void> = task
    .then(() => {}, (e) => console.error('[envío]', e))
    .finally(() => inFlight.delete(p));
  inFlight.add(p);
}

/** Dispara la notificación sin hacer esperar a quien la originó. */
export function notify(db: Db, n: Notice) {
  const p: Promise<void> = deliver(db, n)
    .catch((e) => console.error('[notificaciones]', e))
    .finally(() => inFlight.delete(p));
  inFlight.add(p);
}

/** Para pruebas y apagado ordenado: espera los envíos pendientes. */
export async function flushNotifications() {
  while (inFlight.size) await Promise.all([...inFlight]);
}
