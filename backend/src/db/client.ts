import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface Db {
  query<T = any>(text: string, params?: unknown[]): Promise<{ rows: T[] }>;
  exec(text: string): Promise<void>;
  tx<T>(fn: (db: Db) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

type Queryable = { query: (text: string, params?: any[]) => Promise<{ rows: any[] }> };

function wrap(c: Queryable, exec: (t: string) => Promise<unknown>): Db {
  const db: Db = {
    query: async (text, params) => ({ rows: (await c.query(text, params as any[])).rows }),
    exec: async (text) => { await exec(text); },
    tx: (fn) => fn(db), // ya dentro de una transacción
    close: async () => {},
  };
  return db;
}

/** PostgreSQL si hay url; si no, PGlite (en disco, o en memoria con ':memory:'). */
export async function createDb(opts: { url?: string; dir?: string }): Promise<Db> {
  if (opts.url) {
    const { default: pg } = await import('pg');
    const pool = new pg.Pool({ connectionString: opts.url });
    const base = wrap(pool, (t) => pool.query(t));
    return {
      ...base,
      async tx(fn) {
        const client = await pool.connect();
        try {
          await client.query('begin');
          const out = await fn(wrap(client, (t) => client.query(t)));
          await client.query('commit');
          return out;
        } catch (e) {
          await client.query('rollback');
          throw e;
        } finally {
          client.release();
        }
      },
      close: () => pool.end(),
    };
  }
  const { PGlite } = await import('@electric-sql/pglite');
  const pg = !opts.dir || opts.dir === ':memory:' ? new PGlite() : new PGlite(opts.dir);
  await pg.waitReady;
  const base = wrap(pg, (t) => pg.exec(t));
  return {
    ...base,
    tx: (fn) => pg.transaction((t) => fn(wrap(t, (s) => t.exec(s)))),
    close: () => pg.close(),
  };
}

export async function migrate(db: Db) {
  const sql = readFileSync(fileURLToPath(new URL('./schema.sql', import.meta.url)), 'utf8');
  await db.exec(sql);
}
