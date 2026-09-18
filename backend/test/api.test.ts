import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, before, describe, test } from 'node:test';
import { createApp } from '../src/app.js';
import { createDb, migrate, type Db } from '../src/db/client.js';
import { DEMO_PASSWORD, seedIfEmpty } from '../src/db/seed.js';
import { runJobs } from '../src/jobs.js';
import { flushNotifications } from '../src/notify.js';
import { normalizeGrade } from '../src/routes/admin.js';
import { nextWeekday } from '../src/time.js';

process.env.NODE_ENV = 'test';
let db: Db;
let base = '';
let server: ReturnType<ReturnType<typeof createApp>['listen']>;

async function call(token: string | null, method: string, path: string, body?: unknown) {
  const res = await fetch(`${base}/api${path}`, {
    method,
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

async function login(email: string) {
  const r = await call(null, 'POST', '/auth/login', { email, password: DEMO_PASSWORD });
  assert.equal(r.status, 200, JSON.stringify(r.data));
  return r.data.token as string;
}

before(async () => {
  // Con TEST_DATABASE_URL las pruebas corren contra PostgreSQL real (base vacía y desechable)
  db = await createDb(process.env.TEST_DATABASE_URL ? { url: process.env.TEST_DATABASE_URL } : { dir: ':memory:' });
  if (process.env.TEST_DATABASE_URL) await db.exec('drop schema public cascade; create schema public;');
  await migrate(db);
  await seedIfEmpty(db);
  server = createApp(db).listen(0);
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
after(async () => {
  await flushNotifications();
  server.close();
  await db.close();
});

describe('Anai Comunica API', () => {
  test('rechaza credenciales incorrectas', async () => {
    const r = await call(null, 'POST', '/auth/login', { email: 'carmen.andrade@demo.ec', password: 'x' });
    assert.equal(r.status, 401);
    assert.match(r.data.error, /incorrectos/);
  });

  test('representante: inicio, autorización y RSVP', async () => {
    const t = await login('carmen.andrade@demo.ec');
    const me = await call(t, 'GET', '/me');
    assert.equal(me.data.children.length, 2);

    const home = await call(t, 'GET', '/home');
    assert.equal(home.status, 200);
    const auth = home.data.pending.find((a: any) => a.kind === 'autorizacion');
    assert.ok(auth, 'hay una autorización pendiente');
    assert.equal(home.data.unread_messages, 1);

    const mateo = auth.targets[0].student_id;
    const resp = await call(t, 'POST', `/announcements/${auth.id}/respond`, { student_id: mateo, response: 'si' });
    assert.equal(resp.status, 200);
    assert.equal(resp.data.targets[0].response, 'si');

    const withEvent = home.data.pending.find((a: any) => a.event);
    const rsvp = await call(t, 'PUT', `/events/${withEvent.event.id}/rsvp`, { response: 'si' });
    assert.equal(rsvp.data.my_rsvp, 'si');

    const home2 = await call(t, 'GET', '/home');
    assert.ok(home2.data.pending.length < home.data.pending.length);
  });

  test('representante no puede escribir a un docente ajeno', async () => {
    const t = await login('ana.mora@demo.ec');
    const me = await call(t, 'GET', '/me');
    const { rows } = await db.query(`select id from users where email = 'maria.leon@demo.ec'`);
    const r = await call(t, 'POST', '/conversations', { student_id: me.data.children[0].id, teacher_id: rows[0].id });
    assert.equal(r.status, 403);
  });

  test('mensajería entre representante y tutora', async () => {
    const t = await login('carmen.andrade@demo.ec');
    const contacts = await call(t, 'GET', '/contacts');
    const mateo = contacts.data.find((c: any) => c.student.full_name.startsWith('Mateo'));
    const tutora = mateo.teachers.find((x: any) => x.role_label.startsWith('Tutoría'));
    const cv = await call(t, 'POST', '/conversations', { student_id: mateo.student.id, teacher_id: tutora.id });
    assert.equal(cv.status, 201);
    const sent = await call(t, 'POST', `/conversations/${cv.data.id}/messages`, { body: 'Gracias, licenciada.' });
    assert.equal(sent.status, 201);
    assert.equal(typeof sent.data.outside_office_hours, 'boolean');

    const tt = await login('andrea.ruiz@demo.ec');
    const list = await call(tt, 'GET', '/conversations');
    const mine = list.data.find((c: any) => c.id === cv.data.id);
    assert.equal(mine.unread, 1);
    const thread = await call(tt, 'GET', `/conversations/${cv.data.id}/messages`);
    assert.equal(thread.data.messages.at(-1).body, 'Gracias, licenciada.');
  });

  test('docente crea comunicado con evento y ve el seguimiento', async () => {
    const t = await login('andrea.ruiz@demo.ec');
    const me = await call(t, 'GET', '/me');
    const c5b = me.data.courses.find((c: any) => c.label === '5.º EGB B');
    const day = nextWeekday(8);
    const created = await call(t, 'POST', '/announcements', {
      title: 'Casa abierta de 5.º EGB',
      body: 'Les invitamos a ver los trabajos del trimestre.',
      kind: 'lectura',
      course_ids: [c5b.id],
      event: { starts_at: `${day}T15:00:00Z`, ends_at: `${day}T16:00:00Z`, location: 'Aula 5.º EGB B' },
    });
    assert.equal(created.status, 201, JSON.stringify(created.data));
    assert.equal(created.data.stats.total, 3);
    assert.ok(created.data.event);

    const all = await call(t, 'POST', '/announcements', {
      title: 'Para todos', body: 'x', kind: 'informativo', audience_all: true,
    });
    assert.equal(all.status, 403, 'un docente no envía a todo el colegio');

    const rec = await call(t, 'GET', `/announcements/${created.data.id}/recipients`);
    assert.equal(rec.data.length, 3);
    const remind = await call(t, 'POST', `/announcements/${created.data.id}/remind`);
    assert.equal(remind.data.reminded, 3);
  });

  test('citas: disponibilidad, reserva, doble reserva y confirmación', async () => {
    const tt = await login('andrea.ruiz@demo.ec');
    const day = nextWeekday(9);
    const slots = await call(tt, 'POST', '/slots', { date: day, start: '10:00', end: '11:00', duration_minutes: 20 });
    assert.equal(slots.data.length, 3);

    const t = await login('carmen.andrade@demo.ec');
    const me = await call(t, 'GET', '/me');
    const mateo = me.data.children.find((c: any) => c.full_name.startsWith('Mateo'));
    const teacherId = slots.data[0].teacher_id;
    const free = await call(t, 'GET', `/slots?teacher_id=${teacherId}&student_id=${mateo.id}`);
    const target = free.data.find((s: any) => s.id === slots.data[0].id);
    assert.ok(target);

    const booked = await call(t, 'POST', '/appointments', { slot_id: target.id, student_id: mateo.id, reason: 'Conversar' });
    assert.equal(booked.status, 201);
    const again = await call(t, 'POST', '/appointments', { slot_id: target.id, student_id: mateo.id });
    assert.equal(again.status, 409);

    const ok = await call(tt, 'PATCH', `/appointments/${booked.data.id}`, { status: 'confirmada' });
    assert.equal(ok.data.status, 'confirmada');
    const bad = await call(t, 'PATCH', `/appointments/${booked.data.id}`, { status: 'confirmada' });
    assert.equal(bad.status, 403);
  });

  test('novedades y panel de dirección', async () => {
    const t = await login('carmen.andrade@demo.ec');
    const posts = await call(t, 'GET', '/posts');
    assert.ok(posts.data.length >= 2);
    const react = await call(t, 'POST', `/posts/${posts.data[0].id}/react`);
    assert.equal(react.data.reacted, true);

    const blocked = await call(t, 'GET', '/dashboard');
    assert.equal(blocked.status, 403);

    const admin = await login('direccion@demo.ec');
    const dash = await call(admin, 'GET', '/dashboard');
    assert.equal(dash.status, 200);
    assert.equal(dash.data.families_total, 5);
    assert.equal(dash.data.unanswered_48h, 1);
    assert.equal(dash.data.courses.length, 3);
  });

  test('administración: cursos, docentes con materias, estudiante con representante e invitación', async () => {
    const admin = await login('direccion@demo.ec');
    const course = await call(admin, 'POST', '/admin/courses', { grade: '10.º EGB', parallel: 'a' });
    assert.equal(course.status, 201, JSON.stringify(course.data));
    const dup = await call(admin, 'POST', '/admin/courses', { grade: '10.º EGB', parallel: 'A' });
    assert.equal(dup.status, 409);

    const staff = await call(admin, 'POST', '/admin/staff', { full_name: 'Carlos Vélez', title: 'Lic.', email: 'carlos.velez@anai.edu.ec' });
    assert.equal(staff.status, 201);
    assert.match(staff.data.invite.url, /\/activar\?token=/);
    await call(admin, 'PATCH', `/admin/courses/${course.data.id}`, { tutor_id: staff.data.id });
    const subj = await call(admin, 'PUT', `/admin/staff/${staff.data.id}/subjects`, { items: [{ course_id: course.data.id, subject: 'Matemática' }] });
    assert.equal(subj.status, 200);

    const st = await call(admin, 'POST', '/admin/students', {
      full_name: 'Isabella Vélez', course_id: course.data.id,
      guardians: [{ full_name: 'Paola Mendoza', email: 'paola.mendoza@gmail.com', relationship: 'Madre' }],
    });
    assert.equal(st.status, 201, JSON.stringify(st.data));
    const url: string = st.data.invites[0].url;

    // El representante no puede entrar hasta activar su cuenta
    const early = await call(null, 'POST', '/auth/login', { email: 'paola.mendoza@gmail.com', password: 'loquesea123' });
    assert.equal(early.status, 401);
    assert.match(early.data.error, /activas/);

    const token = url.split('token=')[1];
    const info = await call(null, 'POST', '/auth/token', { token });
    assert.equal(info.data.kind, 'invitacion');
    const set = await call(null, 'POST', '/auth/set-password', { token, password: 'Clave-segura-1' });
    assert.equal(set.status, 200);
    const reuse = await call(null, 'POST', '/auth/set-password', { token, password: 'Otra-clave-2' });
    assert.equal(reuse.status, 400, 'el enlace es de un solo uso');

    const me = await call(set.data.token, 'GET', '/me');
    assert.equal(me.data.children[0].course_label, '10.º EGB A');
    const contacts = await call(set.data.token, 'GET', '/contacts');
    assert.match(contacts.data[0].teachers[0].role_label, /Tutoría · Matemática/);

    // El docente ve su curso nuevo
    const tInfo = (await call(admin, 'POST', `/admin/users/${staff.data.id}/access-link`)).data;
    const tSet = await call(null, 'POST', '/auth/set-password', { token: tInfo.url.split('token=')[1], password: 'Docente-2026' });
    const tMe = await call(tSet.data.token, 'GET', '/me');
    assert.deepEqual(tMe.data.courses.map((c: any) => c.label), ['10.º EGB A']);

    // Desactivar corta el acceso
    await call(admin, 'PATCH', `/admin/users/${staff.data.id}`, { active: false });
    const blocked = await call(tSet.data.token, 'GET', '/me');
    assert.equal(blocked.status, 401);
  });

  test('importación desde Excel/CSV con validación previa', async () => {
    assert.equal(normalizeGrade('Quinto de básica'), '5.º EGB');
    assert.equal(normalizeGrade('1ro BGU'), '1.º BGU');
    assert.equal(normalizeGrade('Primero de bachillerato'), '1.º BGU');
    assert.equal(normalizeGrade('inicial 2'), 'Inicial 2');
    assert.equal(normalizeGrade('décimo'), '10.º EGB');

    const admin = await login('direccion@demo.ec');
    const rows = [
      { Estudiante: 'Tomás Ríos', Curso: '3', Paralelo: 'A', Representante: 'Julia Ríos', Correo: 'julia.rios@gmail.com', Parentesco: 'Madre' },
      { Estudiante: 'Martina Ríos', Curso: '5to EGB', Paralelo: 'B', Representante: 'Julia Ríos', Correo: 'julia.rios@gmail.com', Parentesco: 'Madre' },
      { Estudiante: 'Sin correo', Curso: '3', Paralelo: 'A', Representante: 'Alguien', Correo: 'no-es-correo' },
    ];
    const dry = await call(admin, 'POST', '/admin/import', { rows, dry_run: true });
    assert.equal(dry.data.errors.length, 1);
    assert.equal(dry.data.errors[0].row, 4);
    assert.equal(dry.data.courses_new, 1);
    assert.equal(dry.data.guardians_new, 1);
    const blocked = await call(admin, 'POST', '/admin/import', { rows, dry_run: false });
    assert.equal(blocked.status, 400);
    const ok = await call(admin, 'POST', '/admin/import', { rows: rows.slice(0, 2), dry_run: false });
    assert.equal(ok.data.students_new, 2);
    assert.equal(ok.data.links, 2);
    const again = await call(admin, 'POST', '/admin/import', { rows: rows.slice(0, 2), dry_run: true });
    assert.equal(again.data.students_new, 0, 'importar dos veces no duplica');
  });

  test('notificaciones por correo y recordatorios automáticos', async () => {
    const t = await login('andrea.ruiz@demo.ec');
    const me = await call(t, 'GET', '/me');
    const c5b = me.data.courses.find((c: any) => c.label === '5.º EGB B');
    const deadline = new Date(Date.now() + 20 * 3600_000).toISOString();
    const created = await call(t, 'POST', '/announcements', {
      title: 'Autorización para la minga', body: 'Detalles.', kind: 'autorizacion', course_ids: [c5b.id], deadline,
    });
    assert.equal(created.status, 201);
    await flushNotifications();
    const { rows } = await db.query(
      `select count(*)::int as n from notification_log where channel = 'correo' and title like 'Autorización pendiente%'`,
    );
    assert.equal(rows[0].n, 4, 'prioridad alta: un correo a cada representante del curso (incluye la familia importada)');

    const jobs = await runJobs(db);
    assert.ok(jobs.announcements >= 1);
    const second = await runJobs(db);
    assert.equal(second.announcements, 0, 'el recordatorio no se repite');

    const forgot = await call(null, 'POST', '/auth/forgot', { email: 'carmen.andrade@demo.ec' });
    assert.equal(forgot.status, 200);
    const unknown = await call(null, 'POST', '/auth/forgot', { email: 'nadie@x.ec' });
    assert.equal(unknown.status, 200, 'no revela si el correo existe');
  });

  test('dirección publica comunicados con evento y ve la agenda (regresión en PostgreSQL)', async () => {
    const admin = await login('direccion@demo.ec');
    const day = nextWeekday(10);
    const r = await call(admin, 'POST', '/announcements', {
      title: 'Minga del colegio', body: 'Los esperamos.', kind: 'informativo', audience_all: true,
      event: { starts_at: `${day}T13:00:00Z`, ends_at: `${day}T15:00:00Z`, location: 'Patio' },
    });
    assert.equal(r.status, 201, JSON.stringify(r.data));
    assert.ok(r.data.event);
    const agenda = await call(admin, 'GET', '/events');
    assert.equal(agenda.status, 200, JSON.stringify(agenda.data));
    const list = await call(admin, 'GET', '/announcements');
    assert.equal(list.status, 200);
    const posts = await call(admin, 'GET', '/posts');
    assert.equal(posts.status, 200);
    for (const path of ['/dashboard', '/reports', '/admin/summary', '/admin/courses', '/admin/staff', '/admin/students', '/admin/notifications', '/conversations', '/contacts', '/slots', '/appointments', '/me']) {
      const x = await call(admin, 'GET', path);
      assert.equal(x.status, 200, `${path}: ${JSON.stringify(x.data)}`);
    }
    const t = await login('andrea.ruiz@demo.ec');
    for (const path of ['/events', '/announcements', '/posts', '/conversations', '/contacts', '/slots', '/appointments']) {
      const x = await call(t, 'GET', path);
      assert.equal(x.status, 200, `docente ${path}: ${JSON.stringify(x.data)}`);
    }
  });
});
