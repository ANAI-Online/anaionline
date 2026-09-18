const DEV_SECRET = 'dev-secret-cambiar-en-produccion';
const e = process.env;

export const env = {
  production: e.NODE_ENV === 'production',
  port: Number(e.PORT ?? 4000),
  jwtSecret: e.JWT_SECRET ?? DEV_SECRET,
  // Con DATABASE_URL se usa PostgreSQL; sin ella, PGlite (Postgres embebido) en PGLITE_DIR.
  databaseUrl: e.DATABASE_URL,
  pgliteDir: e.PGLITE_DIR ?? './.data/comunica',
  corsOrigin: (e.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
  timezone: 'America/Guayaquil',
  // Dirección pública de la app (para los enlaces de los correos)
  // En Render, si no se define, se usa la dirección que Render asigna (RENDER_EXTERNAL_URL)
  appUrl: (e.APP_URL || e.RENDER_EXTERNAL_URL || 'http://localhost:5173').replace(/\/$/, ''),

  // Correo (SMTP: Amazon SES, Brevo, Google Workspace, etc.). Sin SMTP_HOST, los correos se simulan.
  smtp: {
    host: e.SMTP_HOST,
    port: Number(e.SMTP_PORT ?? 587),
    user: e.SMTP_USER,
    pass: e.SMTP_PASS,
  },
  mailFrom: e.MAIL_FROM ?? 'Unidad Educativa <notificaciones@avisos.anai.edu.ec>',
  mailReplyTo: e.MAIL_REPLY_TO,

  // Notificaciones push (npm run vapid genera las claves)
  vapid: {
    publicKey: e.VAPID_PUBLIC_KEY,
    privateKey: e.VAPID_PRIVATE_KEY,
    subject: e.VAPID_SUBJECT ?? 'mailto:soporte@anai.edu.ec',
  },

  // Primer arranque: crea la institución y la cuenta de dirección si la base está vacía
  bootstrap: {
    schoolName: e.SCHOOL_NAME,
    adminEmail: e.ADMIN_EMAIL,
    adminPassword: e.ADMIN_PASSWORD,
    adminName: e.ADMIN_NAME ?? 'Administración',
  },
};

if (env.production && env.jwtSecret === DEV_SECRET) {
  throw new Error('Define JWT_SECRET antes de arrancar en producción.');
}
