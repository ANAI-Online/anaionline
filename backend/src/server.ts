import { createApp } from './app.js';
import { bootstrapIfEmpty } from './bootstrap.js';
import { createDb, migrate } from './db/client.js';
import { seedIfEmpty } from './db/seed.js';
import { env } from './env.js';
import { startJobs } from './jobs.js';
import { channels, checkEmail, flushNotifications, initPush } from './notify.js';

const db = await createDb({ url: env.databaseUrl, dir: env.pgliteDir });
await migrate(db);

if (env.bootstrap.adminEmail) {
  await bootstrapIfEmpty(db, env.bootstrap);
} else if (!env.databaseUrl && process.env.DEMO_DATA !== '0') {
  // Desarrollo local sin configuración: datos de demostración
  await seedIfEmpty(db);
}

if (env.production && !env.databaseUrl) {
  console.warn('ATENCIÓN: sin DATABASE_URL los datos se guardan en el disco del servidor y pueden perderse al redesplegar.');
}
await initPush(db);
await checkEmail();
setInterval(checkEmail, 30 * 60_000); // vuelve a probar cada 30 minutos
startJobs(db);
const server = createApp(db).listen(env.port, () => {
  console.log(`Anai Comunica en http://localhost:${env.port} · push ${channels.push ? 'activo' : 'sin configurar'} · correo ${channels.email ? 'SMTP' : env.smtp.host ? 'NO DISPONIBLE' : 'simulado (consola)'}`);
});

const stop = async () => {
  server.close();
  await flushNotifications();
  await db.close();
  process.exit(0);
};
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
