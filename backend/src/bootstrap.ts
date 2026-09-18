import bcrypt from 'bcryptjs';
import type { Db } from './db/client.js';

/** Crea la institución y la primera cuenta de dirección. */
export async function createSchoolAndAdmin(db: Db, o: { schoolName: string; email: string; password: string; name: string }) {
  if (o.password.length < 8) throw new Error('La contraseña de administración debe tener al menos 8 caracteres.');
  return db.tx(async (t) => {
    const { rows: existing } = await t.query('select id from schools limit 1');
    const schoolId = existing[0]?.id ?? (await t.query('insert into schools (name) values ($1) returning id', [o.schoolName])).rows[0].id;
    const hash = await bcrypt.hash(o.password, 10);
    const { rows } = await t.query(
      `insert into users (school_id, role, full_name, email, password_hash)
       values ($1, 'admin', $2, lower($3), $4)
       on conflict (email) do update set role = 'admin', password_hash = excluded.password_hash, active = true
       returning id`,
      [schoolId, o.name, o.email, hash],
    );
    return rows[0].id as string;
  });
}

/** Primer arranque en un servidor nuevo: usa SCHOOL_NAME, ADMIN_EMAIL y ADMIN_PASSWORD. */
export async function bootstrapIfEmpty(db: Db, b: { schoolName?: string; adminEmail?: string; adminPassword?: string; adminName: string }) {
  const { rows } = await db.query('select count(*)::int as n from schools');
  if (rows[0].n > 0) return false;
  if (!b.schoolName || !b.adminEmail || !b.adminPassword) {
    console.warn('Base vacía: define SCHOOL_NAME, ADMIN_EMAIL y ADMIN_PASSWORD para crear la cuenta de dirección.');
    return false;
  }
  await createSchoolAndAdmin(db, { schoolName: b.schoolName, email: b.adminEmail, password: b.adminPassword, name: b.adminName });
  console.log(`Institución «${b.schoolName}» creada. Ingresa con ${b.adminEmail}.`);
  return true;
}
