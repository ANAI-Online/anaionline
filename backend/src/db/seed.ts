import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'node:url';
import { env } from '../env.js';
import { gradeOrder } from '../routes/admin.js';
import { localDate, localToUtc, nextWeekday } from '../time.js';
import { createDb, migrate, type Db } from './client.js';

export const DEMO_PASSWORD = 'comunica123';

/** Datos de demostración. Solo se cargan si la base está vacía. */
export async function seedIfEmpty(db: Db) {
  const { rows } = await db.query('select count(*)::int as n from schools');
  if (rows[0].n > 0) return false;
  await db.tx(async (t) => seed(t));
  if (process.env.NODE_ENV !== 'test') console.log(`Datos de demostración cargados (contraseña: ${DEMO_PASSWORD}).`);
  return true;
}

async function seed(db: Db) {
  const one = async (sql: string, params: unknown[]) => (await db.query(sql, params)).rows[0].id as string;
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);

  const school = await one(`insert into schools (name) values ($1) returning id`, ['Unidad Educativa Anai (demo)']);
  const office = JSON.stringify({ days: [1, 2, 3, 4, 5], start: '08:00', end: '16:00' });
  const user = (role: string, name: string, email: string, title: string | null = null, oh: string | null = null) =>
    one(
      `insert into users (school_id, role, full_name, title, email, password_hash, office_hours)
       values ($1,$2,$3,$4,$5,$6,$7) returning id`,
      [school, role, name, title, email, hash, oh],
    );

  const direccion = await user('admin', 'Patricia Vera', 'direccion@demo.ec', 'Msc.', office);
  const andrea = await user('docente', 'Andrea Ruiz', 'andrea.ruiz@demo.ec', 'Lcda.', office);
  const jorge = await user('docente', 'Jorge Salas', 'jorge.salas@demo.ec', 'Lic.', office);
  const maria = await user('docente', 'María León', 'maria.leon@demo.ec', 'Lcda.', office);

  const course = (grade: string, parallel: string, tutor: string) =>
    one(`insert into courses (school_id, grade, parallel, tutor_id, sort_order) values ($1,$2,$3,$4,$5) returning id`,
      [school, grade, parallel, tutor, gradeOrder(grade)]);
  const c2a = await course('2.º EGB', 'A', maria);
  const c5b = await course('5.º EGB', 'B', andrea);
  const c7a = await course('7.º EGB', 'A', jorge);
  await db.query(
    `insert into teacher_courses (teacher_id, course_id, subject) values
     ($1,$2,'Ciencias Naturales'), ($1,$3,'Ciencias Naturales'), ($4,$3,'Lengua y Literatura')`,
    [jorge, c5b, c7a, andrea],
  );

  const student = (name: string, c: string) =>
    one(`insert into students (school_id, full_name, course_id) values ($1,$2,$3) returning id`, [school, name, c]);
  const mateo = await student('Mateo Andrade', c5b);
  const lucia = await student('Lucía Andrade', c2a);
  const emilia = await student('Emilia Torres', c5b);
  const samuel = await student('Samuel Paredes', c5b);
  const valentina = await student('Valentina Cedeño', c2a);
  const joaquin = await student('Joaquín Mora', c7a);

  const carmen = await user('representante', 'Carmen Andrade', 'carmen.andrade@demo.ec');
  const luis = await user('representante', 'Luis Torres', 'luis.torres@demo.ec');
  const rosa = await user('representante', 'Rosa Paredes', 'rosa.paredes@demo.ec');
  const diego = await user('representante', 'Diego Cedeño', 'diego.cedeno@demo.ec');
  const ana = await user('representante', 'Ana Mora', 'ana.mora@demo.ec');
  await db.query(
    `insert into guardians (user_id, student_id, relationship) values
     ($1,$2,'Madre'), ($1,$3,'Madre'), ($4,$5,'Padre'), ($6,$7,'Madre'), ($8,$9,'Padre'), ($10,$11,'Madre')`,
    [carmen, mateo, lucia, luis, emilia, rosa, samuel, diego, valentina, ana, joaquin],
  );
  await db.query(`update users set last_seen_at = now() - interval '2 days' where id = any($1::uuid[])`,
    [[carmen, luis, rosa, diego]]);

  // Agenda
  const reunionDay = nextWeekday(4);
  const museoDay = nextWeekday(6);
  const feriaDay = nextWeekday(20);
  const event = async (author: string, title: string, desc: string, loc: string, day: string,
                       from: string, to: string, courses: string[] | 'all') => {
    const id = await one(
      `insert into events (school_id, author_id, title, description, location, starts_at, ends_at, audience_all)
       values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`,
      [school, author, title, desc, loc, localToUtc(day, from), localToUtc(day, to), courses === 'all'],
    );
    if (courses !== 'all') {
      await db.query(`insert into event_courses (event_id, course_id) select $1, unnest($2::uuid[])`, [id, courses]);
    }
    return id;
  };
  const reunion = await event(andrea, 'Reunión de representantes', 'Revisaremos el avance del trimestre y las actividades de octubre.',
    'Aula 5.º EGB B', reunionDay, '18:00', '19:00', [c5b]);
  await event(andrea, 'Salida al Museo Interactivo de Ciencia', 'Salida pedagógica con traslado en bus del colegio.',
    'Museo Interactivo de Ciencia', museoDay, '09:00', '13:00', [c5b]);
  const feria = await event(direccion, 'Feria de ciencias', 'Exposición de proyectos de todos los cursos. Las familias están invitadas.',
    'Patio central', feriaDay, '09:00', '12:00', 'all');
  await db.query(`insert into event_rsvps (event_id, guardian_id, response) values ($1,$2,'si'), ($3,$2,'si'), ($3,$4,'tal_vez')`,
    [reunion, luis, feria, diego]);

  // Comunicados
  const announce = async (author: string, title: string, body: string, kind: string, courses: string[] | 'all',
                          opts: { deadlineDays?: number; eventId?: string; ageHours?: number } = {}) => {
    const id = await one(
      `insert into announcements (school_id, author_id, title, body, kind, audience_all, deadline, event_id, created_at, attachments)
       values ($1,$2,$3,$4,$5,$6,$7,$8, now() - make_interval(hours => $9), $10) returning id`,
      [school, author, title, body, kind, courses === 'all',
       opts.deadlineDays ? localToUtc(localDate(opts.deadlineDays), '23:59') : null,
       opts.eventId ?? null, opts.ageHours ?? 1, '[]'],
    );
    if (courses !== 'all') {
      await db.query(`insert into announcement_courses (announcement_id, course_id) select $1, unnest($2::uuid[])`, [id, courses]);
    }
    await db.query(
      `insert into announcement_recipients (announcement_id, guardian_id, student_id)
       select $1, g.user_id, s.id from students s join guardians g on g.student_id = s.id
        where s.school_id = $2 and ($3::boolean or s.course_id = any($4::uuid[]))`,
      [id, school, courses === 'all', courses === 'all' ? [] : courses],
    );
    return id;
  };

  const museo = await announce(andrea, 'Autorización: salida al Museo Interactivo de Ciencia',
    'Queridas familias: 5.º EGB B visitará el Museo Interactivo de Ciencia de 9:00 a 13:00. El traslado será en bus del colegio con dos docentes acompañantes. Envíen refrigerio, agua y ropa cómoda.\n\nNecesitamos su autorización para que su representado participe.',
    'autorizacion', [c5b], { deadlineDays: 4, ageHours: 20 });
  await db.query(`update announcement_recipients set response = 'si', responded_at = now(), read_at = now()
                   where announcement_id = $1 and guardian_id = $2`, [museo, luis]);

  await announce(andrea, 'Reunión de representantes del trimestre',
    'Les esperamos para conversar sobre el avance del grupo y las actividades de octubre. Confirmen su asistencia, por favor.',
    'informativo', [c5b], { eventId: reunion, ageHours: 10 });

  const horario = await announce(andrea, 'Cambio de horario de Educación Física',
    'Desde la próxima semana, Educación Física será los martes y jueves a primera hora. Los estudiantes deben venir con el uniforme deportivo esos días.',
    'lectura', [c5b], { ageHours: 120 });
  await db.query(`update announcement_recipients set read_at = now() - interval '4 days', response = 'si', responded_at = now() - interval '4 days'
                   where announcement_id = $1 and guardian_id <> $2`, [horario, rosa]);

  const semana = await announce(direccion, 'Semana de la lectura',
    'Del lunes al viernes cada curso tendrá un momento de lectura compartida. Las familias que quieran leer un cuento en el aula pueden escribir a su tutor o tutora.',
    'informativo', 'all', { ageHours: 200 });
  await db.query(`update announcement_recipients set read_at = now() - interval '7 days' where announcement_id = $1`, [semana]);

  await announce(direccion, 'Feria de ciencias: invitación a las familias',
    'Cada curso presentará sus proyectos en el patio central. Les esperamos.', 'informativo', 'all', { eventId: feria, ageHours: 30 });

  // Novedades
  await db.query(
    `insert into posts (school_id, author_id, course_id, body, created_at) values
     ($1,$2,$3,'Así vivimos la jornada de lectura en 5.º EGB B. ¡Gracias a los representantes que nos acompañaron a leer!', now() - interval '20 hours'),
     ($1,$4,null,'Abrimos inscripciones para el club de robótica, de 5.º a 7.º EGB. Los cupos son limitados; escriban a dirección para reservar.', now() - interval '3 days')`,
    [school, andrea, c5b, direccion],
  );

  // Mensajes
  const cv = await one(
    `insert into conversations (school_id, teacher_id, guardian_id, student_id) values ($1,$2,$3,$4) returning id`,
    [school, andrea, carmen, mateo],
  );
  await db.query(
    `insert into messages (conversation_id, sender_id, body, created_at, read_at) values
     ($1,$2,'Buenas tardes. Les recuerdo que el proyecto de Ciencias se entrega el viernes.', now() - interval '26 hours', now() - interval '25 hours'),
     ($1,$3,'Hola, licenciada. Mateo estuvo enfermo esta semana, ¿podría entregarlo el lunes?', now() - interval '24 hours', now() - interval '20 hours'),
     ($1,$2,'Gracias por avisar. Mateo puede entregarlo el lunes sin problema. ¡Que se mejore!', now() - interval '3 hours', null)`,
    [cv, andrea, carmen],
  );
  const cv2 = await one(
    `insert into conversations (school_id, teacher_id, guardian_id, student_id) values ($1,$2,$3,$4) returning id`,
    [school, andrea, rosa, samuel],
  );
  await db.query(
    `insert into messages (conversation_id, sender_id, body, created_at) values
     ($1,$2,'Buenos días, licenciada. ¿Samuel puede salir más temprano el jueves por una cita médica?', now() - interval '52 hours')`,
    [cv2, rosa],
  );

  // Citas: disponibilidad de la tutora y una solicitud pendiente
  for (const [days, from] of [[1, '14:00'], [4, '10:30'], [6, '14:00']] as const) {
    const d = nextWeekday(days);
    for (let i = 0; i < 3; i++) {
      const start = localToUtc(d, from);
      start.setMinutes(start.getMinutes() + i * 20);
      await db.query(
        `insert into availability_slots (teacher_id, starts_at, ends_at) values ($1,$2,$2::timestamptz + interval '20 minutes')
         on conflict do nothing`,
        [andrea, start],
      );
    }
  }
  const { rows: slot } = await db.query(
    `select id from availability_slots where teacher_id = $1 order by starts_at limit 1`, [andrea],
  );
  await db.query(
    `insert into appointments (slot_id, teacher_id, guardian_id, student_id, reason) values ($1,$2,$3,$4,$5)`,
    [slot[0].id, andrea, luis, emilia, 'Quisiera conversar sobre cómo apoyar a Emilia con la lectura en casa.'],
  );
}

// `npm run seed`: borra la base local de PGlite y la vuelve a cargar
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { rmSync } = await import('node:fs');
  if (!env.databaseUrl) rmSync(env.pgliteDir, { recursive: true, force: true });
  const db = await createDb({ url: env.databaseUrl, dir: env.pgliteDir });
  await migrate(db);
  await seedIfEmpty(db);
  await db.close();
}
