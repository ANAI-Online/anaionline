/**
 * Crea (o recupera) una cuenta de dirección.
 *   npm run create-admin -- --email direccion@anai.edu.ec --name "Nombre Apellido" [--school "Unidad Educativa Anai"]
 * Imprime una contraseña temporal; cámbiala al ingresar (Tu cuenta › Cambiar contraseña).
 */
import { randomBytes } from 'node:crypto';
import { parseArgs } from 'node:util';
import { createSchoolAndAdmin } from '../bootstrap.js';
import { createDb, migrate } from '../db/client.js';
import { env } from '../env.js';

const { values } = parseArgs({ options: { email: { type: 'string' }, name: { type: 'string' }, school: { type: 'string' }, password: { type: 'string' } } });
if (!values.email || !values.name) {
  console.error('Uso: npm run create-admin -- --email correo@anai.edu.ec --name "Nombre Apellido" [--school "Nombre de la institución"]');
  process.exit(1);
}
const password = values.password ?? randomBytes(9).toString('base64url');
const db = await createDb({ url: env.databaseUrl, dir: env.pgliteDir });
await migrate(db);
await createSchoolAndAdmin(db, { schoolName: values.school ?? env.bootstrap.schoolName ?? 'Unidad Educativa', email: values.email, password, name: values.name });
await db.close();
console.log(`\nCuenta de dirección lista.\n  Correo:     ${values.email.toLowerCase()}\n  Contraseña: ${password}\n`);
