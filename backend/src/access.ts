import type { AuthUser } from './auth.js';
import type { Db } from './db/client.js';

export const COURSE_LABEL = `(c.grade || ' ' || c.parallel)`;

/** Cursos que el usuario puede ver o a los que puede escribir. */
export async function courseIdsFor(db: Db, u: AuthUser): Promise<string[]> {
  const sql =
    u.role === 'admin'
      ? `select id from courses where school_id = $1`
      : u.role === 'docente'
        ? `select id from courses where tutor_id = $1
           union select course_id from teacher_courses where teacher_id = $1`
        : `select distinct s.course_id as id from guardians g
             join students s on s.id = g.student_id where g.user_id = $1 and s.active`;
  const { rows } = await db.query<{ id: string }>(sql, [u.role === 'admin' ? u.school_id : u.id]);
  return rows.map((r) => r.id);
}

export async function isGuardianOf(db: Db, guardianId: string, studentId: string) {
  const { rows } = await db.query(
    'select 1 from guardians where user_id = $1 and student_id = $2',
    [guardianId, studentId],
  );
  return rows.length > 0;
}

/** ¿El miembro del personal atiende al curso de este estudiante? (dirección: siempre) */
export async function staffCanReachStudent(db: Db, u: AuthUser, studentId: string) {
  if (u.role === 'admin') {
    const { rows } = await db.query('select 1 from students where id = $1 and school_id = $2', [
      studentId,
      u.school_id,
    ]);
    return rows.length > 0;
  }
  const { rows } = await db.query(
    `select 1 from students s join courses c on c.id = s.course_id
      where s.id = $2 and (c.tutor_id = $1 or exists (
        select 1 from teacher_courses tc where tc.teacher_id = $1 and tc.course_id = c.id))`,
    [u.id, studentId],
  );
  return rows.length > 0;
}

/** Docentes que atienden a un estudiante, con su rol (Tutora, Matemática…). */
export async function teachersOfStudent(db: Db, studentId: string) {
  const { rows } = await db.query<{
    id: string; full_name: string; title: string | null; office_hours: unknown; role_label: string;
  }>(
    `select u.id, u.full_name, u.title, u.office_hours, 'Tutoría' as role_label, 0 as ord
       from students s join courses c on c.id = s.course_id join users u on u.id = c.tutor_id
      where s.id = $1
     union all
     select u.id, u.full_name, u.title, u.office_hours, tc.subject, 1
       from students s join teacher_courses tc on tc.course_id = s.course_id
       join users u on u.id = tc.teacher_id
      where s.id = $1
     order by ord, full_name`,
    [studentId],
  );
  // un docente puede ser tutor y dar una materia: se unen sus etiquetas
  const byId = new Map<string, (typeof rows)[number]>();
  for (const r of rows) {
    const prev = byId.get(r.id);
    if (prev) prev.role_label = `${prev.role_label} · ${r.role_label}`;
    else byId.set(r.id, { ...r });
  }
  return [...byId.values()].map(({ ord: _o, ...t }: any) => t);
}
