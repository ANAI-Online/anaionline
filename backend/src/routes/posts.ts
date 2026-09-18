import { Router } from 'express';
import { z } from 'zod';
import { courseIdsFor } from '../access.js';
import { me, requireRole, type AuthUser } from '../auth.js';
import type { Db } from '../db/client.js';
import { badRequest, forbidden, notFound } from '../errors.js';
import { notify } from '../notify.js';
import { parse, uuid } from '../validate.js';

export async function listPosts(db: Db, u: AuthUser, opts: { ids?: string[]; limit?: number } = {}) {
  const courses = await courseIdsFor(db, u);
  const params: unknown[] = [u.school_id, courses, u.id, u.role === 'admin'];
  let extra = '';
  if (opts.ids) { params.push(opts.ids); extra = `and p.id = any($${params.length}::uuid[])`; }
  params.push(opts.limit ?? 50);
  const { rows } = await db.query(
    `select p.id, p.body, p.images, p.created_at, p.course_id,
            coalesce(c.grade || ' ' || c.parallel, 'Todo el colegio') as audience_label,
            json_build_object('id', u.id, 'full_name', u.full_name, 'title', u.title, 'role', u.role) as author,
            (select count(*)::int from post_reactions r where r.post_id = p.id) as reactions,
            exists (select 1 from post_reactions r where r.post_id = p.id and r.user_id = $3) as reacted,
            (select count(*)::int from post_views v where v.post_id = p.id) as views
       from posts p join users u on u.id = p.author_id left join courses c on c.id = p.course_id
      where p.school_id = $1 and ($4 or p.course_id is null or p.course_id = any($2::uuid[]) or p.author_id = $3)
      ${extra}
      order by p.created_at desc limit $${params.length}`,
    params,
  );
  return rows;
}

export function postsRouter(db: Db) {
  const r = Router();

  r.get('/', async (req, res) => {
    const u = me(req);
    const posts = await listPosts(db, u);
    if (u.role === 'representante' && posts.length) {
      await db.query(
        `insert into post_views (post_id, user_id) select unnest($1::uuid[]), $2 on conflict do nothing`,
        [posts.map((p: any) => p.id), u.id],
      );
    }
    res.json(posts);
  });

  r.post('/', requireRole('admin', 'docente'), async (req, res) => {
    const u = me(req);
    const input = parse(
      z.object({
        body: z.string().trim().min(1).max(3000),
        course_id: uuid.nullable().default(null),
        images: z.array(z.string().url()).max(6).default([]),
      }),
      req.body,
    );
    if (input.course_id === null && u.role !== 'admin') throw forbidden('Elige uno de tus cursos.');
    if (input.course_id && !(await courseIdsFor(db, u)).includes(input.course_id)) throw forbidden('Solo puedes publicar en tus cursos.');
    const { rows } = await db.query<{ id: string }>(
      `insert into posts (school_id, author_id, course_id, body, images) values ($1,$2,$3,$4,$5) returning id`,
      [u.school_id, u.id, input.course_id, input.body, JSON.stringify(input.images)],
    );
    const { rows: fam } = await db.query<{ user_id: string }>(
      `select distinct g.user_id from guardians g join students s on s.id = g.student_id
        where s.school_id = $1 and s.active and ($2::uuid is null or s.course_id = $2)`,
      [u.school_id, input.course_id],
    );
    notify(db, {
      userIds: fam.map((f) => f.user_id), title: input.course_id ? 'Novedad de tu curso' : 'Novedad del colegio',
      body: input.body.slice(0, 140), link: '/novedades', priority: 'baja', action: 'Ver novedad',
    });
    const [post] = await listPosts(db, u, { ids: [rows[0].id] });
    res.status(201).json(post);
  });

  r.post('/:id/react', async (req, res) => {
    const u = me(req);
    const id = parse(uuid, req.params.id);
    const [post] = await listPosts(db, u, { ids: [id] });
    if (!post) throw notFound('La publicación');
    if (post.reacted) await db.query('delete from post_reactions where post_id = $1 and user_id = $2', [id, u.id]);
    else await db.query('insert into post_reactions (post_id, user_id) values ($1,$2) on conflict do nothing', [id, u.id]);
    const [updated] = await listPosts(db, u, { ids: [id] });
    res.json({ reacted: updated.reacted, reactions: updated.reactions });
  });

  r.delete('/:id', requireRole('admin', 'docente'), async (req, res) => {
    const u = me(req);
    const { rows } = await db.query(
      `delete from posts where id = $1 and school_id = $2 and ($3 or author_id = $4) returning id`,
      [parse(uuid, req.params.id), u.school_id, u.role === 'admin', u.id],
    );
    if (!rows[0]) throw notFound('La publicación');
    res.status(204).end();
  });

  return r;
}

export { badRequest };
