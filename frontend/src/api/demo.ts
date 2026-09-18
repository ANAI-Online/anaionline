/**
 * Modo demostración: reproduce la API de Anai Comunica en memoria, con las mismas
 * reglas principales, para probar la app sin servidor (`npm run build:demo`).
 * Los datos se reinician al recargar la página.
 */
import { ApiError, type Transport } from './client';

type Id = string;
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const now = () => new Date();
const iso = (d: Date) => d.toISOString();
const H = 3600_000;
const ago = (h: number) => iso(new Date(Date.now() - h * H));

// Fecha local de Ecuador (UTC−5)
const localDate = (days: number) => {
  const d = new Date(Date.now() - 5 * H);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
const weekday = (from: number) => {
  for (let i = from; ; i++) {
    const dow = new Date(`${localDate(i)}T12:00:00Z`).getUTCDay();
    if (dow !== 0 && dow !== 6) return localDate(i);
  }
};
const at = (day: string, hhmm: string) => iso(new Date(`${day}T${hhmm}:00-05:00`));

/* ——— Datos ——— */
interface User { id: Id; role: 'admin' | 'docente' | 'representante'; full_name: string; title: string | null; email: string; office_hours: { days: number[]; start: string; end: string } | null; last_seen_at: string | null; active: boolean; activated: boolean; phone: string | null; email_prefs: 'importante' | 'todo' }
interface Course { id: Id; grade: string; parallel: string; tutor_id: Id }
interface Student { id: Id; full_name: string; course_id: Id; active: boolean }
interface Ev { id: Id; author_id: Id; title: string; description: string; location: string; starts_at: string; ends_at: string; audience_all: boolean; course_ids: Id[]; rsvp_enabled: boolean }
interface Ann { id: Id; author_id: Id; title: string; body: string; kind: 'informativo' | 'lectura' | 'autorizacion'; audience_all: boolean; course_ids: Id[]; deadline: string | null; event_id: Id | null; created_at: string; attachments: { name: string; url: string }[] }
interface Rec { announcement_id: Id; guardian_id: Id; student_id: Id; read_at: string | null; response: 'si' | 'no' | null; responded_at: string | null; reminded_at: string | null }
interface Conv { id: Id; teacher_id: Id; guardian_id: Id; student_id: Id; created_at: string }
interface Msg { id: Id; conversation_id: Id; sender_id: Id; body: string; created_at: string; read_at: string | null }
interface Post { id: Id; author_id: Id; course_id: Id | null; body: string; images: string[]; created_at: string }
interface Slot { id: Id; teacher_id: Id; starts_at: string; ends_at: string }
interface Appt { id: Id; slot_id: Id; teacher_id: Id; guardian_id: Id; student_id: Id; reason: string; status: 'solicitada' | 'confirmada' | 'rechazada' | 'cancelada'; created_at: string }
interface Rep { id: Id; message_id: Id; reporter_id: Id; reason: string; status: 'pendiente' | 'revisado'; created_at: string }

const office = { days: [1, 2, 3, 4, 5], start: '08:00', end: '16:00' };
const mkUser = (role: User['role'], full_name: string, email: string, title: string | null = null, oh = role === 'representante' ? null : office): User =>
  ({ id: uid(), role, full_name, title, email, office_hours: oh, last_seen_at: role === 'representante' ? ago(48) : null, active: true, activated: true, phone: null, email_prefs: 'importante' });

const direccion = mkUser('admin', 'Patricia Vera', 'direccion@demo.ec', 'Msc.');
const andrea = mkUser('docente', 'Andrea Ruiz', 'andrea.ruiz@demo.ec', 'Lcda.');
const jorge = mkUser('docente', 'Jorge Salas', 'jorge.salas@demo.ec', 'Lic.');
const maria = mkUser('docente', 'María León', 'maria.leon@demo.ec', 'Lcda.');
const carmen = mkUser('representante', 'Carmen Andrade', 'carmen.andrade@demo.ec');
const luis = mkUser('representante', 'Luis Torres', 'luis.torres@demo.ec');
const rosa = mkUser('representante', 'Rosa Paredes', 'rosa.paredes@demo.ec');
const diego = mkUser('representante', 'Diego Cedeño', 'diego.cedeno@demo.ec');
const ana = mkUser('representante', 'Ana Mora', 'ana.mora@demo.ec');
ana.last_seen_at = null;
ana.activated = false;
const users: User[] = [direccion, andrea, jorge, maria, carmen, luis, rosa, diego, ana];

const c2a: Course = { id: uid(), grade: '2.º EGB', parallel: 'A', tutor_id: maria.id };
const c5b: Course = { id: uid(), grade: '5.º EGB', parallel: 'B', tutor_id: andrea.id };
const c7a: Course = { id: uid(), grade: '7.º EGB', parallel: 'A', tutor_id: jorge.id };
const courses = [c2a, c5b, c7a];
const teacherCourses = [
  { teacher_id: jorge.id, course_id: c5b.id, subject: 'Ciencias Naturales' },
  { teacher_id: jorge.id, course_id: c7a.id, subject: 'Ciencias Naturales' },
  { teacher_id: andrea.id, course_id: c7a.id, subject: 'Lengua y Literatura' },
];
const st = (full_name: string, c: Course): Student => ({ id: uid(), full_name, course_id: c.id, active: true });
const mateo = st('Mateo Andrade', c5b), lucia = st('Lucía Andrade', c2a), emilia = st('Emilia Torres', c5b);
const samuel = st('Samuel Paredes', c5b), valentina = st('Valentina Cedeño', c2a), joaquin = st('Joaquín Mora', c7a);
const students = [mateo, lucia, emilia, samuel, valentina, joaquin];
const guardians = [
  { user_id: carmen.id, student_id: mateo.id, relationship: 'Madre' },
  { user_id: carmen.id, student_id: lucia.id, relationship: 'Madre' },
  { user_id: luis.id, student_id: emilia.id, relationship: 'Padre' },
  { user_id: rosa.id, student_id: samuel.id, relationship: 'Madre' },
  { user_id: diego.id, student_id: valentina.id, relationship: 'Padre' },
  { user_id: ana.id, student_id: joaquin.id, relationship: 'Madre' },
];

const events: Ev[] = [];
const rsvps: { event_id: Id; guardian_id: Id; response: 'si' | 'tal_vez' | 'no' }[] = [];
const anns: Ann[] = [];
const recs: Rec[] = [];
const convs: Conv[] = [];
const msgs: Msg[] = [];
const posts: Post[] = [];
const reactions = new Set<string>();
const views = new Set<string>();
const slots: Slot[] = [];
const appts: Appt[] = [];
const reports: Rep[] = [];

function addEvent(e: Omit<Ev, 'id' | 'rsvp_enabled'> & { rsvp_enabled?: boolean }) {
  const ev = { id: uid(), rsvp_enabled: true, ...e };
  events.push(ev);
  return ev;
}
function studentsFor(all: boolean, courseIds: Id[]) {
  return students.filter((s) => s.active && (all || courseIds.includes(s.course_id)));
}
function addAnn(a: Omit<Ann, 'id' | 'attachments'>) {
  const ann: Ann = { id: uid(), attachments: [], ...a };
  anns.push(ann);
  for (const s of studentsFor(a.audience_all, a.course_ids)) {
    for (const g of guardians.filter((x) => x.student_id === s.id)) {
      recs.push({ announcement_id: ann.id, guardian_id: g.user_id, student_id: s.id, read_at: null, response: null, responded_at: null, reminded_at: null });
    }
  }
  return ann;
}

// Semilla (equivalente a backend/src/db/seed.ts)
{
  const reunion = addEvent({ author_id: andrea.id, title: 'Reunión de representantes', description: 'Revisaremos el avance del trimestre y las actividades de octubre.',
    location: 'Aula 5.º EGB B', starts_at: at(weekday(4), '18:00'), ends_at: at(weekday(4), '19:00'), audience_all: false, course_ids: [c5b.id] });
  addEvent({ author_id: andrea.id, title: 'Salida al Museo Interactivo de Ciencia', description: 'Salida pedagógica con traslado en bus del colegio.',
    location: 'Museo Interactivo de Ciencia', starts_at: at(weekday(6), '09:00'), ends_at: at(weekday(6), '13:00'), audience_all: false, course_ids: [c5b.id] });
  const feria = addEvent({ author_id: direccion.id, title: 'Feria de ciencias', description: 'Exposición de proyectos de todos los cursos. Las familias están invitadas.',
    location: 'Patio central', starts_at: at(weekday(20), '09:00'), ends_at: at(weekday(20), '12:00'), audience_all: true, course_ids: [] });
  rsvps.push({ event_id: reunion.id, guardian_id: luis.id, response: 'si' }, { event_id: feria.id, guardian_id: luis.id, response: 'si' }, { event_id: feria.id, guardian_id: diego.id, response: 'tal_vez' });

  const museo = addAnn({ author_id: andrea.id, title: 'Autorización: salida al Museo Interactivo de Ciencia',
    body: 'Queridas familias: 5.º EGB B visitará el Museo Interactivo de Ciencia de 9:00 a 13:00. El traslado será en bus del colegio con dos docentes acompañantes. Envíen refrigerio, agua y ropa cómoda.\n\nNecesitamos su autorización para que su representado participe.',
    kind: 'autorizacion', audience_all: false, course_ids: [c5b.id], deadline: at(localDate(4), '23:59'), event_id: null, created_at: ago(20) });
  recs.filter((r) => r.announcement_id === museo.id && r.guardian_id === luis.id).forEach((r) => { r.response = 'si'; r.responded_at = ago(2); r.read_at = ago(2); });
  addAnn({ author_id: andrea.id, title: 'Reunión de representantes del trimestre', body: 'Les esperamos para conversar sobre el avance del grupo y las actividades de octubre. Confirmen su asistencia, por favor.',
    kind: 'informativo', audience_all: false, course_ids: [c5b.id], deadline: null, event_id: reunion.id, created_at: ago(10) });
  const horario = addAnn({ author_id: andrea.id, title: 'Cambio de horario de Educación Física', body: 'Desde la próxima semana, Educación Física será los martes y jueves a primera hora. Los estudiantes deben venir con el uniforme deportivo esos días.',
    kind: 'lectura', audience_all: false, course_ids: [c5b.id], deadline: null, event_id: null, created_at: ago(120) });
  recs.filter((r) => r.announcement_id === horario.id && r.guardian_id !== rosa.id).forEach((r) => { r.read_at = ago(96); r.response = 'si'; r.responded_at = ago(96); });
  const semana = addAnn({ author_id: direccion.id, title: 'Semana de la lectura', body: 'Del lunes al viernes cada curso tendrá un momento de lectura compartida. Las familias que quieran leer un cuento en el aula pueden escribir a su tutor o tutora.',
    kind: 'informativo', audience_all: true, course_ids: [], deadline: null, event_id: null, created_at: ago(200) });
  recs.filter((r) => r.announcement_id === semana.id).forEach((r) => { r.read_at = ago(168); });
  addAnn({ author_id: direccion.id, title: 'Feria de ciencias: invitación a las familias', body: 'Cada curso presentará sus proyectos en el patio central. Les esperamos.',
    kind: 'informativo', audience_all: true, course_ids: [], deadline: null, event_id: feria.id, created_at: ago(30) });

  posts.push(
    { id: uid(), author_id: andrea.id, course_id: c5b.id, body: 'Así vivimos la jornada de lectura en 5.º EGB B. ¡Gracias a los representantes que nos acompañaron a leer!', images: [], created_at: ago(20) },
    { id: uid(), author_id: direccion.id, course_id: null, body: 'Abrimos inscripciones para el club de robótica, de 5.º a 7.º EGB. Los cupos son limitados; escriban a dirección para reservar.', images: [], created_at: ago(72) },
  );

  const cv: Conv = { id: uid(), teacher_id: andrea.id, guardian_id: carmen.id, student_id: mateo.id, created_at: ago(30) };
  const cv2: Conv = { id: uid(), teacher_id: andrea.id, guardian_id: rosa.id, student_id: samuel.id, created_at: ago(52) };
  convs.push(cv, cv2);
  msgs.push(
    { id: uid(), conversation_id: cv.id, sender_id: andrea.id, body: 'Buenas tardes. Les recuerdo que el proyecto de Ciencias se entrega el viernes.', created_at: ago(26), read_at: ago(25) },
    { id: uid(), conversation_id: cv.id, sender_id: carmen.id, body: 'Hola, licenciada. Mateo estuvo enfermo esta semana, ¿podría entregarlo el lunes?', created_at: ago(24), read_at: ago(20) },
    { id: uid(), conversation_id: cv.id, sender_id: andrea.id, body: 'Gracias por avisar. Mateo puede entregarlo el lunes sin problema. ¡Que se mejore!', created_at: ago(3), read_at: null },
    { id: uid(), conversation_id: cv2.id, sender_id: rosa.id, body: 'Buenos días, licenciada. ¿Samuel puede salir más temprano el jueves por una cita médica?', created_at: ago(52), read_at: null },
  );

  for (const [d, from] of [[1, '14:00'], [4, '10:30'], [6, '14:00']] as const) {
    const day = weekday(d);
    for (let i = 0; i < 3; i++) {
      const s = new Date(at(day, from)).getTime() + i * 20 * 60_000;
      slots.push({ id: uid(), teacher_id: andrea.id, starts_at: iso(new Date(s)), ends_at: iso(new Date(s + 20 * 60_000)) });
    }
  }
  slots.sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  appts.push({ id: uid(), slot_id: slots[0].id, teacher_id: andrea.id, guardian_id: luis.id, student_id: emilia.id,
    reason: 'Quisiera conversar sobre cómo apoyar a Emilia con la lectura en casa.', status: 'solicitada', created_at: ago(5) });
}

/* ——— Reglas ——— */
const byId = <T extends { id: Id }>(xs: T[], id: Id) => xs.find((x) => x.id === id);
const label = (c: Course) => `${c.grade} ${c.parallel}`;
const courseOf = (s: Student) => byId(courses, s.course_id)!;
const person = (u: User) => ({ id: u.id, full_name: u.full_name, title: u.title, role: u.role });
const fail = (status: number, msg: string): never => { throw new ApiError(status, msg); };
const notFound = (what: string) => fail(404, `${what} no existe o no tienes acceso.`);
const isStaff = (u: User) => u.role !== 'representante';

function courseIdsFor(u: User): Id[] {
  if (u.role === 'admin') return courses.map((c) => c.id);
  if (u.role === 'docente') return [...new Set([...courses.filter((c) => c.tutor_id === u.id).map((c) => c.id), ...teacherCourses.filter((t) => t.teacher_id === u.id).map((t) => t.course_id)])];
  return [...new Set(guardians.filter((g) => g.user_id === u.id).map((g) => byId(students, g.student_id)!).filter((s) => s.active).map((s) => s.course_id))];
}
const isGuardianOf = (gid: Id, sid: Id) => guardians.some((g) => g.user_id === gid && g.student_id === sid);
function teachersOfStudent(sid: Id) {
  const s = byId(students, sid)!;
  const c = courseOf(s);
  const out = new Map<Id, { id: Id; full_name: string; title: string | null; office_hours: User['office_hours']; role_label: string }>();
  const tutor = byId(users, c.tutor_id)!;
  out.set(tutor.id, { ...person(tutor), office_hours: tutor.office_hours, role_label: 'Tutoría' });
  for (const tc of teacherCourses.filter((t) => t.course_id === c.id)) {
    const t = byId(users, tc.teacher_id)!;
    const prev = out.get(t.id);
    if (prev) prev.role_label += ` · ${tc.subject}`;
    else out.set(t.id, { ...person(t), office_hours: t.office_hours, role_label: tc.subject });
  }
  return [...out.values()];
}
const audience = (all: boolean, ids: Id[]) =>
  all ? 'Todo el colegio' : courses.filter((c) => ids.includes(c.id)).map(label).sort().join(', ');

function viewEvent(u: User, e: Ev) {
  const mine = rsvps.find((r) => r.event_id === e.id && r.guardian_id === u.id);
  const cnt = (k: string) => rsvps.filter((r) => r.event_id === e.id && r.response === k).length;
  return {
    ...e, audience_label: audience(e.audience_all, e.course_ids),
    my_rsvp: u.role === 'representante' ? mine?.response ?? null : undefined,
    counts: isStaff(u) ? { si: cnt('si'), tal_vez: cnt('tal_vez'), no: cnt('no') } : undefined,
  };
}
function listEvents(u: User, opts: { ids?: Id[]; from?: Date; to?: Date } = {}) {
  const mine = courseIdsFor(u);
  return events
    .filter((e) => u.role === 'admin' || e.audience_all || e.author_id === u.id || e.course_ids.some((c) => mine.includes(c)))
    .filter((e) => !opts.ids || opts.ids.includes(e.id))
    .filter((e) => !opts.from || new Date(e.ends_at) >= opts.from)
    .filter((e) => !opts.to || new Date(e.starts_at) <= opts.to)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at))
    .map((e) => viewEvent(u, e));
}
function checkAudience(u: User, all: boolean, ids: Id[]) {
  if (all) { if (u.role !== 'admin') fail(403, 'Solo dirección puede enviar a todo el colegio.'); return; }
  if (!ids.length) fail(400, 'Elige al menos un curso.');
  const ok = courseIdsFor(u);
  if (ids.some((i) => !ok.includes(i))) fail(403, 'Solo puedes elegir tus cursos.');
}

const needsAnswer = (k: string) => k === 'lectura' || k === 'autorizacion';
function listAnns(u: User, opts: { ids?: Id[]; pendingOnly?: boolean } = {}) {
  let out = anns
    .filter((a) => !opts.ids || opts.ids.includes(a.id))
    .filter((a) => (u.role === 'representante' ? recs.some((r) => r.announcement_id === a.id && r.guardian_id === u.id) : u.role === 'admin' || a.author_id === u.id))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((a): any => {
      const base = {
        id: a.id, title: a.title, body: a.body, kind: a.kind, deadline: a.deadline, attachments: a.attachments, created_at: a.created_at,
        audience_label: audience(a.audience_all, a.course_ids), author: person(byId(users, a.author_id)!),
        event: a.event_id ? listEvents(u, { ids: [a.event_id] })[0] ?? null : null,
      };
      const rs = recs.filter((r) => r.announcement_id === a.id);
      if (u.role === 'representante') {
        return { ...base, targets: rs.filter((r) => r.guardian_id === u.id).map((r) => ({ student_id: r.student_id, student_name: byId(students, r.student_id)!.full_name, read_at: r.read_at, response: r.response, responded_at: r.responded_at })).sort((x, y) => x.student_name.localeCompare(y.student_name)) };
      }
      const s = { total: rs.length, read: rs.filter((r) => r.read_at).length, si: rs.filter((r) => r.response === 'si').length, no: rs.filter((r) => r.response === 'no').length, pending: 0 };
      s.pending = needsAnswer(a.kind) ? s.total - s.si - s.no : s.total - s.read;
      return { ...base, stats: s };
    });
  if (opts.pendingOnly) {
    const t = now();
    out = out.filter((a) => (needsAnswer(a.kind) && a.targets!.some((x: { response: string | null }) => !x.response) && (!a.deadline || new Date(a.deadline) > t))
      || (a.event?.rsvp_enabled && !a.event.my_rsvp && new Date(a.event.starts_at) > t));
  }
  return out;
}

function listConvs(u: User, ids?: Id[]) {
  return convs
    .filter((c) => (c.teacher_id === u.id || c.guardian_id === u.id) && (!ids || ids.includes(c.id)))
    .map((c) => {
      const t = byId(users, c.teacher_id)!, g = byId(users, c.guardian_id)!, s = byId(students, c.student_id)!;
      const ms = msgs.filter((m) => m.conversation_id === c.id);
      const last = ms[ms.length - 1];
      return {
        id: c.id, teacher: { ...person(t), office_hours: t.office_hours }, guardian: person(g),
        student: { id: s.id, full_name: s.full_name, course_label: label(courseOf(s)) },
        last_message: last ? { body: last.body, created_at: last.created_at, sender_id: last.sender_id } : null,
        unread: ms.filter((m) => m.sender_id !== u.id && !m.read_at).length,
        updated_at: last?.created_at ?? c.created_at,
      };
    })
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

function listPosts(u: User, ids?: Id[]) {
  const mine = courseIdsFor(u);
  return posts
    .filter((p) => u.role === 'admin' || !p.course_id || mine.includes(p.course_id) || p.author_id === u.id)
    .filter((p) => !ids || ids.includes(p.id))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((p) => ({
      ...p, audience_label: p.course_id ? label(byId(courses, p.course_id)!) : 'Todo el colegio',
      author: person(byId(users, p.author_id)!),
      reactions: [...reactions].filter((k) => k.startsWith(`${p.id}:`)).length,
      reacted: reactions.has(`${p.id}:${u.id}`),
      views: [...views].filter((k) => k.startsWith(`${p.id}:`)).length,
    }));
}

const ACTIVE = ['solicitada', 'confirmada'];
function listAppts(u: User, opts: { ids?: Id[]; upcomingOnly?: boolean } = {}) {
  return appts
    .filter((a) => (a.teacher_id === u.id || a.guardian_id === u.id) && (!opts.ids || opts.ids.includes(a.id)))
    .map((a) => {
      const sl = byId(slots, a.slot_id)!, s = byId(students, a.student_id)!;
      return {
        id: a.id, status: a.status, reason: a.reason, created_at: a.created_at,
        slot: { id: sl.id, starts_at: sl.starts_at, ends_at: sl.ends_at },
        teacher: person(byId(users, a.teacher_id)!), guardian: person(byId(users, a.guardian_id)!),
        student: { id: s.id, full_name: s.full_name, course_label: label(courseOf(s)) },
      };
    })
    .filter((a) => !opts.upcomingOnly || (new Date(a.slot.starts_at) > now() && ACTIVE.includes(a.status)))
    .sort((a, b) => a.slot.starts_at.localeCompare(b.slot.starts_at));
}

function profile(u: User) {
  return {
    user: { ...person(u), email: u.email, office_hours: u.office_hours, email_prefs: u.email_prefs, school_name: 'Unidad Educativa Anai (demo)' },
    notifications: { push_available: false, push_devices: 0, email_prefs: u.email_prefs },
    children: u.role === 'representante'
      ? guardians.filter((g) => g.user_id === u.id).map((g) => byId(students, g.student_id)!).filter((s) => s.active).map((s) => ({ id: s.id, full_name: s.full_name, course_id: s.course_id, course_label: label(courseOf(s)) })).sort((a, b) => a.full_name.localeCompare(b.full_name))
      : [],
    courses: u.role === 'representante' ? [] : courses.filter((c) => courseIdsFor(u).includes(c.id)).map((c) => ({ id: c.id, label: label(c), is_tutor: c.tutor_id === u.id, students: students.filter((s) => s.course_id === c.id).length })),
  };
}

function dashboard() {
  const month = Date.now() - 30 * 24 * H;
  const recent = recs.filter((r) => new Date(byId(anns, r.announcement_id)!.created_at).getTime() > month);
  const fams = users.filter((u) => u.role === 'representante');
  const inactive = (u: User) => !u.last_seen_at || new Date(u.last_seen_at).getTime() < month;
  const times: { course_id: Id; hours: number }[] = [];
  for (const c of convs) {
    let waiting: number | null = null;
    for (const m of msgs.filter((x) => x.conversation_id === c.id)) {
      if (m.sender_id === c.guardian_id) waiting ??= new Date(m.created_at).getTime();
      else if (waiting !== null) { times.push({ course_id: byId(students, c.student_id)!.course_id, hours: (new Date(m.created_at).getTime() - waiting) / H }); waiting = null; }
    }
  }
  const median = (xs: number[]) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const rate = (rs: Rec[]) => (rs.length ? rs.filter((r) => r.read_at).length / rs.length : null);
  return {
    read_rate: rate(recent),
    families_active: fams.filter((u) => !inactive(u)).length, families_total: fams.length,
    median_response_hours: median(times.map((t) => t.hours)),
    pending_authorizations: recs.filter((r) => { const a = byId(anns, r.announcement_id)!; return a.kind === 'autorizacion' && !r.response && (!a.deadline || new Date(a.deadline) > now()); }).length,
    unanswered_48h: convs.filter((c) => { const ms = msgs.filter((m) => m.conversation_id === c.id); const l = ms[ms.length - 1]; return l && l.sender_id === c.guardian_id && Date.now() - new Date(l.created_at).getTime() > 48 * H; }).length,
    pending_appointments: appts.filter((a) => a.status === 'solicitada').length,
    open_reports: reports.filter((r) => r.status === 'pendiente').length,
    courses: courses.map((c) => ({
      id: c.id, label: label(c),
      read_rate: rate(recent.filter((r) => byId(students, r.student_id)!.course_id === c.id)),
      response_hours: median(times.filter((t) => t.course_id === c.id).map((t) => t.hours)),
      inactive_families: new Set(guardians.filter((g) => byId(students, g.student_id)!.course_id === c.id).map((g) => g.user_id).filter((id) => inactive(byId(users, id)!))).size,
    })),
  };
}

/* ——— Rutas ——— */
type Ctx = { u: User; p: string[]; q: URLSearchParams; b: any };
type Handler = (c: Ctx) => unknown;
const routes: [string, RegExp, Handler, User['role'][]?][] = [];
const on = (m: string, path: string, h: Handler, roles?: User['role'][]) =>
  routes.push([m, new RegExp(`^${path.replace(/:\w+/g, '([^/]+)')}$`), h, roles]);
const STAFF: User['role'][] = ['admin', 'docente'];
const FAM: User['role'][] = ['representante'];

on('GET', '/me', ({ u }) => profile(u));
on('PUT', '/me/office-hours', ({ u, b }) => { if (!b.days?.length || b.end <= b.start) fail(400, 'Revisa los días y las horas.'); u.office_hours = b; return b; }, STAFF);

on('GET', '/home', ({ u }) => {
  const cs = listConvs(u);
  return {
    pending: listAnns(u, { pendingOnly: true }),
    upcoming: listEvents(u, { from: now(), to: new Date(Date.now() + 14 * 24 * H) }).slice(0, 5),
    latest_post: listPosts(u)[0] ?? null,
    conversations: cs.slice(0, 2), unread_messages: cs.reduce((n, c) => n + c.unread, 0),
    appointments: listAppts(u, { upcomingOnly: true }),
  };
}, FAM);

on('GET', '/announcements', ({ u, q }) => listAnns(u, { pendingOnly: q.get('status') === 'pendientes' }));
on('GET', '/announcements/:id', ({ u, p }) => listAnns(u, { ids: [p[0]] })[0] ?? notFound('El comunicado'));
on('POST', '/announcements', ({ u, b }) => {
  if (!b.title || b.title.trim().length < 3) fail(400, 'Escribe un título de al menos 3 letras.');
  if (!b.body?.trim()) fail(400, 'Escribe el mensaje.');
  checkAudience(u, !!b.audience_all, b.course_ids ?? []);
  let eventId: Id | null = null;
  if (b.event) {
    if (new Date(b.event.ends_at) <= new Date(b.event.starts_at)) fail(400, 'La hora de fin debe ser posterior al inicio.');
    eventId = addEvent({ author_id: u.id, title: b.title, description: b.body, location: b.event.location ?? '', starts_at: iso(new Date(b.event.starts_at)), ends_at: iso(new Date(b.event.ends_at)), audience_all: !!b.audience_all, course_ids: b.course_ids ?? [] }).id;
  }
  const a = addAnn({ author_id: u.id, title: b.title.trim(), body: b.body.trim(), kind: b.kind, audience_all: !!b.audience_all, course_ids: b.audience_all ? [] : b.course_ids, deadline: b.deadline ? iso(new Date(b.deadline)) : null, event_id: eventId, created_at: iso(now()) });
  return listAnns(u, { ids: [a.id] })[0];
}, STAFF);
on('POST', '/announcements/:id/read', ({ u, p }) => { recs.filter((r) => r.announcement_id === p[0] && r.guardian_id === u.id).forEach((r) => { r.read_at ??= iso(now()); }); return null; }, FAM);
on('POST', '/announcements/:id/respond', ({ u, p, b }) => {
  const a = listAnns(u, { ids: [p[0]] })[0] ?? notFound('El comunicado');
  if (!needsAnswer(a.kind)) fail(400, 'Este comunicado no pide respuesta.');
  if (a.deadline && new Date(a.deadline) < now()) fail(409, 'El plazo para responder terminó.');
  const r = recs.find((x) => x.announcement_id === p[0] && x.guardian_id === u.id && x.student_id === b.student_id) ?? notFound('El estudiante');
  r.response = b.response; r.responded_at = iso(now()); r.read_at ??= iso(now());
  return listAnns(u, { ids: [p[0]] })[0];
}, FAM);
on('GET', '/announcements/:id/recipients', ({ u, p }) => {
  listAnns(u, { ids: [p[0]] })[0] ?? notFound('El comunicado');
  return recs.filter((r) => r.announcement_id === p[0]).map((r) => {
    const s = byId(students, r.student_id)!;
    return { ...r, guardian_name: byId(users, r.guardian_id)!.full_name, student_name: s.full_name, course_label: label(courseOf(s)) };
  }).sort((a, b) => Number(!!a.response) - Number(!!b.response) || Number(!!a.read_at) - Number(!!b.read_at) || a.student_name.localeCompare(b.student_name));
}, STAFF);
on('POST', '/announcements/:id/remind', ({ u, p }) => {
  const a = listAnns(u, { ids: [p[0]] })[0] ?? notFound('El comunicado');
  const pend = recs.filter((r) => r.announcement_id === p[0] && (needsAnswer(a.kind) ? !r.response : !r.read_at));
  pend.forEach((r) => { r.reminded_at = iso(now()); });
  return { reminded: new Set(pend.map((r) => r.guardian_id)).size };
}, STAFF);

on('GET', '/events', ({ u }) => listEvents(u, { from: new Date(Date.now() - 24 * H), to: new Date(Date.now() + 120 * 24 * H) }));
on('POST', '/events', ({ u, b }) => {
  if (!b.title || b.title.trim().length < 3) fail(400, 'Escribe el nombre del evento.');
  if (new Date(b.ends_at) <= new Date(b.starts_at)) fail(400, 'La hora de fin debe ser posterior al inicio.');
  checkAudience(u, !!b.audience_all, b.course_ids ?? []);
  const e = addEvent({ author_id: u.id, title: b.title.trim(), description: b.description ?? '', location: b.location ?? '', starts_at: iso(new Date(b.starts_at)), ends_at: iso(new Date(b.ends_at)), audience_all: !!b.audience_all, course_ids: b.audience_all ? [] : b.course_ids, rsvp_enabled: b.rsvp_enabled !== false });
  return viewEvent(u, e);
}, STAFF);
on('PUT', '/events/:id/rsvp', ({ u, p, b }) => {
  const e = listEvents(u, { ids: [p[0]] })[0] ?? notFound('El evento');
  if (!e.rsvp_enabled) fail(400, 'Este evento no pide confirmación.');
  if (new Date(e.starts_at) < now()) fail(409, 'El evento ya empezó.');
  const r = rsvps.find((x) => x.event_id === e.id && x.guardian_id === u.id);
  if (r) r.response = b.response; else rsvps.push({ event_id: e.id, guardian_id: u.id, response: b.response });
  return listEvents(u, { ids: [p[0]] })[0];
}, FAM);
on('GET', '/events/:id/rsvps', ({ p }) => rsvps.filter((r) => r.event_id === p[0]).map((r) => ({
  guardian_id: r.guardian_id, guardian_name: byId(users, r.guardian_id)!.full_name, response: r.response,
  students: guardians.filter((g) => g.user_id === r.guardian_id).map((g) => byId(students, g.student_id)!.full_name).join(', '),
})), STAFF);

on('GET', '/posts', ({ u }) => {
  const ps = listPosts(u);
  if (u.role === 'representante') ps.forEach((x) => views.add(`${x.id}:${u.id}`));
  return ps;
});
on('POST', '/posts', ({ u, b }) => {
  if (!b.body?.trim()) fail(400, 'Escribe algo para publicar.');
  if (!b.course_id && u.role !== 'admin') fail(403, 'Elige uno de tus cursos.');
  if (b.course_id && !courseIdsFor(u).includes(b.course_id)) fail(403, 'Solo puedes publicar en tus cursos.');
  const post: Post = { id: uid(), author_id: u.id, course_id: b.course_id ?? null, body: b.body.trim(), images: [], created_at: iso(now()) };
  posts.push(post);
  return listPosts(u, [post.id])[0];
}, STAFF);
on('POST', '/posts/:id/react', ({ u, p }) => {
  const k = `${p[0]}:${u.id}`;
  if (reactions.has(k)) reactions.delete(k); else reactions.add(k);
  const x = listPosts(u, [p[0]])[0];
  return { reacted: x.reacted, reactions: x.reactions };
});

on('GET', '/contacts', ({ u }) => {
  if (u.role === 'representante') {
    return profile(u).children.map((k) => ({ student: { id: k.id, full_name: k.full_name, course_label: k.course_label }, teachers: teachersOfStudent(k.id) }));
  }
  const mine = courseIdsFor(u);
  return students.filter((s) => s.active && mine.includes(s.course_id)).map((s) => ({
    student: { id: s.id, full_name: s.full_name, course_label: label(courseOf(s)) },
    guardians: guardians.filter((g) => g.student_id === s.id).map((g) => ({ ...person(byId(users, g.user_id)!), relationship: g.relationship })),
  }));
});
on('GET', '/conversations', ({ u }) => listConvs(u));
on('POST', '/conversations', ({ u, b }) => {
  let t: Id, g: Id;
  if (u.role === 'representante') {
    if (!isGuardianOf(u.id, b.student_id) || !teachersOfStudent(b.student_id).some((x) => x.id === b.teacher_id)) fail(403, 'Ese docente no atiende a tu representado.');
    t = b.teacher_id; g = u.id;
  } else {
    if (!isGuardianOf(b.guardian_id, b.student_id)) fail(403, 'No tienes permiso para esta acción.');
    t = u.id; g = b.guardian_id;
  }
  let c = convs.find((x) => x.teacher_id === t && x.guardian_id === g && x.student_id === b.student_id);
  if (!c) convs.push((c = { id: uid(), teacher_id: t, guardian_id: g, student_id: b.student_id, created_at: iso(now()) }));
  return listConvs(u, [c.id])[0];
});
on('GET', '/conversations/:id/messages', ({ u, p }) => {
  const c = listConvs(u, [p[0]])[0] ?? notFound('La conversación');
  msgs.filter((m) => m.conversation_id === p[0] && m.sender_id !== u.id && !m.read_at).forEach((m) => { m.read_at = iso(now()); });
  return { conversation: { ...c, unread: 0 }, messages: msgs.filter((m) => m.conversation_id === p[0]) };
});
on('POST', '/conversations/:id/messages', ({ u, p, b }) => {
  const c = listConvs(u, [p[0]])[0] ?? notFound('La conversación');
  if (!b.body?.trim()) fail(400, 'Escribe un mensaje.');
  const m: Msg = { id: uid(), conversation_id: p[0], sender_id: u.id, body: b.body.trim(), created_at: iso(now()), read_at: null };
  msgs.push(m);
  const oh = c.teacher.office_hours;
  const local = new Date(Date.now() - 5 * H);
  const dow = local.getUTCDay() || 7;
  const hm = local.toISOString().slice(11, 16);
  const outside = u.id === c.guardian.id && !!oh && !(oh.days.includes(dow) && hm >= oh.start && hm < oh.end);
  // En la demo, la otra persona "lee" el mensaje al rato
  setTimeout(() => { m.read_at ??= iso(now()); }, 8000);
  return { ...m, outside_office_hours: outside };
});
on('POST', '/messages/:id/report', ({ u, p, b }) => {
  if (!b.reason || b.reason.trim().length < 3) fail(400, 'Cuéntanos qué pasó.');
  reports.push({ id: uid(), message_id: p[0], reporter_id: u.id, reason: b.reason.trim(), status: 'pendiente', created_at: iso(now()) });
  return { ok: true };
});
on('GET', '/reports', () => reports.map((r) => {
  const m = byId(msgs, r.message_id)!, c = byId(convs, m.conversation_id)!;
  return {
    id: r.id, reason: r.reason, status: r.status, created_at: r.created_at,
    message: { id: m.id, body: m.body, created_at: m.created_at, sender_name: byId(users, m.sender_id)!.full_name },
    reporter_name: byId(users, r.reporter_id)!.full_name, teacher_name: byId(users, c.teacher_id)!.full_name,
    guardian_name: byId(users, c.guardian_id)!.full_name, student_name: byId(students, c.student_id)!.full_name,
  };
}).sort((a, b) => Number(a.status === 'revisado') - Number(b.status === 'revisado')), ['admin']);
on('PATCH', '/reports/:id', ({ p, b }) => { const r = byId(reports, p[0]) ?? notFound('El reporte'); r.status = b.status; return null; }, ['admin']);

const freeSlot = (s: Slot) => !appts.some((a) => a.slot_id === s.id && ACTIVE.includes(a.status));
on('GET', '/slots', ({ u, q }) => {
  if (u.role === 'representante') {
    const tid = q.get('teacher_id')!, sid = q.get('student_id')!;
    if (!isGuardianOf(u.id, sid) || !teachersOfStudent(sid).some((t) => t.id === tid)) fail(403, 'No tienes permiso para esta acción.');
    return slots.filter((s) => s.teacher_id === tid && new Date(s.starts_at).getTime() > Date.now() + 2 * H && freeSlot(s));
  }
  return slots.filter((s) => s.teacher_id === u.id && new Date(s.starts_at) > now())
    .map((s) => ({ ...s, appointment_id: appts.find((a) => a.slot_id === s.id && ACTIVE.includes(a.status))?.id ?? null }));
});
on('POST', '/slots', ({ u, b }) => {
  const from = new Date(`${b.date}T${b.start}:00-05:00`).getTime(), to = new Date(`${b.date}T${b.end}:00-05:00`).getTime();
  if (to <= from) fail(400, 'La hora de fin debe ser posterior al inicio.');
  if (from < Date.now()) fail(400, 'Elige un horario futuro.');
  const step = b.duration_minutes * 60_000;
  const out: Slot[] = [];
  for (let t = from; t + step <= to; t += step) {
    if (slots.some((s) => s.teacher_id === u.id && new Date(s.starts_at).getTime() === t)) continue;
    const s = { id: uid(), teacher_id: u.id, starts_at: iso(new Date(t)), ends_at: iso(new Date(t + step)) };
    slots.push(s); out.push(s);
  }
  if (!out.length && to - from < step) fail(400, 'El bloque es más corto que la duración de una cita.');
  slots.sort((a, c) => a.starts_at.localeCompare(c.starts_at));
  return out;
}, STAFF);
on('DELETE', '/slots/:id', ({ u, p }) => {
  const s = slots.find((x) => x.id === p[0] && x.teacher_id === u.id) ?? notFound('El horario');
  if (!freeSlot(s)) fail(409, 'Ese horario tiene una cita. Cancélala primero.');
  slots.splice(slots.indexOf(s), 1);
  return null;
}, STAFF);
on('GET', '/appointments', ({ u, q }) => listAppts(u, { upcomingOnly: q.get('upcoming') === '1' }).filter((a) => new Date(a.slot.starts_at).getTime() > Date.now() - 30 * 24 * H));
on('POST', '/appointments', ({ u, b }) => {
  if (!isGuardianOf(u.id, b.student_id)) fail(403, 'No tienes permiso para esta acción.');
  const s = byId(slots, b.slot_id) ?? notFound('El horario');
  if (!freeSlot(s)) fail(409, 'Alguien acaba de tomar ese horario. Elige otro.');
  const a: Appt = { id: uid(), slot_id: s.id, teacher_id: s.teacher_id, guardian_id: u.id, student_id: b.student_id, reason: (b.reason ?? '').trim(), status: 'solicitada', created_at: iso(now()) };
  appts.push(a);
  return listAppts(u, { ids: [a.id] })[0];
}, FAM);
on('PATCH', '/appointments/:id', ({ u, p, b }) => {
  const a = appts.find((x) => x.id === p[0] && (x.teacher_id === u.id || x.guardian_id === u.id)) ?? notFound('La cita');
  if (a.teacher_id !== u.id && b.status !== 'cancelada') fail(403, 'Solo el docente puede confirmar o rechazar.');
  if (!ACTIVE.includes(a.status)) fail(409, 'Esta cita ya no está activa.');
  a.status = b.status;
  return listAppts(u, { ids: [a.id] })[0];
});

on('GET', '/dashboard', () => dashboard(), ['admin']);


/* ——— Administración (demo) ——— */
const GRADES = ['Inicial 1', 'Inicial 2', ...Array.from({ length: 10 }, (_, i) => `${i + 1}.º EGB`), ...Array.from({ length: 3 }, (_, i) => `${i + 1}.º BGU`)];
const gradeIdx = (g: string) => GRADES.indexOf(g);
const ORD: Record<string, number> = { primero: 1, primer: 1, segundo: 2, tercero: 3, tercer: 3, cuarto: 4, quinto: 5, sexto: 6, septimo: 7, octavo: 8, noveno: 9, decimo: 10 };
function normalizeGrade(input: string) {
  const s = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const num = Number(s.match(/\d+/)?.[0] ?? NaN) || Object.entries(ORD).find(([w]) => s.includes(w))?.[1];
  if (s.includes('inicial')) return num === 1 || num === 2 ? `Inicial ${num}` : null;
  if (!num) return null;
  if (s.includes('bgu') || s.includes('bachiller')) return num >= 1 && num <= 3 ? `${num}.º BGU` : null;
  return num >= 1 && num <= 10 ? `${num}.º EGB` : null;
}
const sortedCourses = () => [...courses].sort((a, b) => gradeIdx(a.grade) - gradeIdx(b.grade) || a.parallel.localeCompare(b.parallel));
const status = (u: User) => (!u.active ? 'inactiva' : !u.activated ? 'invitada' : 'activa');
const link = (u: User) => ({ url: `https://comunica.anai.edu.ec/${u.activated ? 'restablecer' : 'activar'}?token=demo-${u.id.slice(0, 8)}`, email_sent: false });
const logSim = (u: User, title: string) => notifLog.unshift({ id: uid(), channel: 'correo', title, status: 'simulado', error: null, created_at: iso(now()), full_name: u.full_name, email: u.email });
const notifLog: { id: Id; channel: string; title: string; status: string; error: null; created_at: string; full_name: string; email: string }[] = [];
const needName = (v: unknown) => { if (typeof v !== 'string' || v.trim().length < 3) fail(400, 'Escribe el nombre completo.'); return (v as string).trim(); };
const needEmail = (v: unknown) => { const e = String(v ?? '').trim().toLowerCase(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) fail(400, 'Correo inválido.'); return e; };
function upsertGuardian(g: { full_name: string; email: string; phone?: string | null }) {
  const email = needEmail(g.email);
  const found = users.find((x) => x.email === email);
  if (found) { if (found.role !== 'representante') fail(409, `${email} ya pertenece a una cuenta de personal.`); return found; }
  const nu = mkUser('representante', needName(g.full_name), email);
  nu.activated = false; nu.last_seen_at = null; nu.phone = g.phone ?? null;
  users.push(nu);
  return nu;
}

on('GET', '/admin/summary', () => ({
  courses: courses.length, staff: users.filter((u) => u.role !== 'representante' && u.active).length,
  students: students.filter((s) => s.active).length, guardians: users.filter((u) => u.role === 'representante' && u.active).length,
  pending_activation: users.filter((u) => u.active && !u.activated).length, channels: { push: false, email: false }, grades: GRADES,
}), ['admin']);

on('GET', '/admin/courses', () => sortedCourses().map((c) => {
  const t = c.tutor_id ? byId(users, c.tutor_id) : null;
  return {
    id: c.id, grade: c.grade, parallel: c.parallel, label: label(c), tutor: t ? person(t) : null,
    students: students.filter((s) => s.course_id === c.id && s.active).length,
    teachers: teacherCourses.filter((tc) => tc.course_id === c.id).map((tc) => ({ ...person(byId(users, tc.teacher_id)!), subject: tc.subject })),
  };
}), ['admin']);
on('POST', '/admin/courses', ({ b }) => {
  if (gradeIdx(b.grade) < 0) fail(400, 'Elige un grado.');
  const par = String(b.parallel ?? '').toUpperCase();
  if (!/^[A-Z]{1,2}$/.test(par)) fail(400, 'Usa una letra para el paralelo.');
  if (courses.some((c) => c.grade === b.grade && c.parallel === par)) fail(409, `${b.grade} ${par} ya existe.`);
  const c = { id: uid(), grade: b.grade, parallel: par, tutor_id: b.tutor_id ?? null } as Course;
  courses.push(c);
  return { id: c.id };
}, ['admin']);
on('PATCH', '/admin/courses/:id', ({ p, b }) => {
  const c = byId(courses, p[0]) ?? notFound('El curso');
  const grade = b.grade ?? c.grade, par = String(b.parallel ?? c.parallel).toUpperCase();
  if (courses.some((x) => x.id !== c.id && x.grade === grade && x.parallel === par)) fail(409, 'Ya existe un curso con ese grado y paralelo.');
  c.grade = grade; c.parallel = par;
  if ('tutor_id' in b) c.tutor_id = b.tutor_id ?? (null as unknown as Id);
  return { ok: true };
}, ['admin']);
on('DELETE', '/admin/courses/:id', ({ p }) => {
  if (students.some((s) => s.course_id === p[0])) fail(409, 'El curso tiene estudiantes. Muévelos antes de borrarlo.');
  courses.splice(courses.findIndex((c) => c.id === p[0]), 1);
  return null;
}, ['admin']);

on('GET', '/admin/staff', () => users.filter((u) => u.role !== 'representante')
  .sort((a, b) => Number(b.active) - Number(a.active) || a.role.localeCompare(b.role) || a.full_name.localeCompare(b.full_name))
  .map((u) => ({
    id: u.id, full_name: u.full_name, title: u.title, email: u.email, role: u.role, last_seen_at: u.last_seen_at, status: status(u),
    tutor_of: sortedCourses().filter((c) => c.tutor_id === u.id).map((c) => ({ id: c.id, label: label(c) })),
    subjects: teacherCourses.filter((tc) => tc.teacher_id === u.id).map((tc) => ({ course_id: tc.course_id, label: label(byId(courses, tc.course_id)!), subject: tc.subject })),
  })), ['admin']);
on('POST', '/admin/staff', ({ b }) => {
  const email = needEmail(b.email);
  if (users.some((x) => x.email === email)) fail(409, `Ya existe una cuenta con ${email}.`);
  const nu = mkUser(b.role === 'admin' ? 'admin' : 'docente', needName(b.full_name), email, b.title || null);
  nu.activated = false;
  users.push(nu);
  if (b.send_invite !== false) logSim(nu, 'Activa tu cuenta');
  return { id: nu.id, invite: b.send_invite !== false ? link(nu) : null };
}, ['admin']);
on('PUT', '/admin/staff/:id/subjects', ({ p, b }) => {
  for (let i = teacherCourses.length - 1; i >= 0; i--) if (teacherCourses[i].teacher_id === p[0]) teacherCourses.splice(i, 1);
  for (const it of b.items ?? []) teacherCourses.push({ teacher_id: p[0], course_id: it.course_id, subject: String(it.subject).trim() });
  return { ok: true };
}, ['admin']);
on('PATCH', '/admin/users/:id', ({ u, p, b }) => {
  const t = byId(users, p[0]) ?? notFound('La cuenta');
  if (t.id === u.id && (b.active === false || b.role === 'docente')) fail(403, 'No puedes quitarte tu propio acceso de dirección.');
  if (b.email) { const e = needEmail(b.email); if (users.some((x) => x.email === e && x.id !== t.id)) fail(409, `Ya existe una cuenta con ${e}.`); t.email = e; }
  if (b.full_name) t.full_name = needName(b.full_name);
  if ('title' in b) t.title = b.title || null;
  if ('phone' in b) t.phone = b.phone || null;
  if (b.role && t.role !== 'representante') t.role = b.role;
  if (typeof b.active === 'boolean') t.active = b.active;
  return { ok: true };
}, ['admin']);
on('POST', '/admin/users/:id/access-link', ({ p }) => { const t = byId(users, p[0]) ?? notFound('La cuenta'); logSim(t, t.activated ? 'Restablece tu contraseña' : 'Activa tu cuenta'); return link(t); }, ['admin']);
on('POST', '/admin/invite-pending', () => { const pend = users.filter((x) => x.active && !x.activated); pend.forEach((x) => logSim(x, 'Activa tu cuenta')); return { queued: pend.length }; }, ['admin']);

on('GET', '/admin/students', ({ q }) => {
  const course = q.get('course_id'), needle = (q.get('q') ?? '').toLowerCase(), all = q.get('inactive') === '1';
  return students
    .filter((s) => (all || s.active) && (!course || s.course_id === course))
    .map((s) => ({
      id: s.id, full_name: s.full_name, active: s.active, course_id: s.course_id, course_label: label(courseOf(s)),
      guardians: guardians.filter((g) => g.student_id === s.id).map((g) => { const gu = byId(users, g.user_id)!; return { id: gu.id, full_name: gu.full_name, email: gu.email, phone: gu.phone, relationship: g.relationship, status: status(gu), last_seen_at: gu.last_seen_at }; }),
    }))
    .filter((s) => !needle || s.full_name.toLowerCase().includes(needle) || s.guardians.some((g) => g.full_name.toLowerCase().includes(needle) || g.email.includes(needle)))
    .sort((a, b) => Number(b.active) - Number(a.active) || gradeIdx(courseOf(byId(students, a.id)!).grade) - gradeIdx(courseOf(byId(students, b.id)!).grade) || a.course_label.localeCompare(b.course_label) || a.full_name.localeCompare(b.full_name));
}, ['admin']);
on('POST', '/admin/students', ({ b }) => {
  const s: Student = { id: uid(), full_name: needName(b.full_name), course_id: (byId(courses, b.course_id) ?? notFound('El curso')).id, active: true };
  const created = (b.guardians ?? []).map((g: { full_name: string; email: string; relationship?: string; phone?: string }) => {
    const gu = upsertGuardian(g);
    guardians.push({ user_id: gu.id, student_id: s.id, relationship: g.relationship || '' });
    return gu;
  });
  students.push(s);
  const invites = b.send_invites !== false ? created.filter((x: User) => !x.activated).map((x: User) => { logSim(x, 'Activa tu cuenta'); return link(x); }) : [];
  return { id: s.id, invites };
}, ['admin']);
on('PATCH', '/admin/students/:id', ({ p, b }) => {
  const s = byId(students, p[0]) ?? notFound('El estudiante');
  if (b.full_name) s.full_name = needName(b.full_name);
  if (b.course_id) s.course_id = (byId(courses, b.course_id) ?? notFound('El curso')).id;
  if (typeof b.active === 'boolean') s.active = b.active;
  return { ok: true };
}, ['admin']);
on('POST', '/admin/students/:id/guardians', ({ p, b }) => {
  byId(students, p[0]) ?? notFound('El estudiante');
  const gu = upsertGuardian(b);
  if (!guardians.some((g) => g.user_id === gu.id && g.student_id === p[0])) guardians.push({ user_id: gu.id, student_id: p[0], relationship: b.relationship || '' });
  if (!gu.activated && b.send_invite !== false) logSim(gu, 'Activa tu cuenta');
  return { id: gu.id, created: true, invite: gu.activated ? null : link(gu) };
}, ['admin']);
on('DELETE', '/admin/students/:id/guardians/:uid', ({ p }) => {
  const i = guardians.findIndex((g) => g.student_id === p[0] && g.user_id === p[1]);
  if (i >= 0) guardians.splice(i, 1);
  return null;
}, ['admin']);
on('POST', '/admin/import', ({ b }) => {
  const errors: { row: number; message: string }[] = [];
  const norm = (k: string) => k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  const pick = (row: Record<string, string>, ...keys: string[]) => { for (const k of Object.keys(row)) if (keys.includes(norm(k))) return String(row[k] ?? '').trim(); return ''; };
  const clean: { row: number; student: string; grade: string; par: string; guardian: string; email: string; rel: string; phone: string }[] = [];
  (b.rows as Record<string, string>[]).forEach((raw, i) => {
    const row = i + 2;
    const student = pick(raw, 'estudiante', 'alumno'), gRaw = pick(raw, 'curso', 'grado'), par = pick(raw, 'paralelo', 'seccion').toUpperCase();
    const guardian = pick(raw, 'representante', 'padre', 'madre'), email = pick(raw, 'correo', 'email', 'correoelectronico').toLowerCase();
    if (!student && !guardian && !email) return;
    const grade = normalizeGrade(gRaw);
    if (student.length < 3) errors.push({ row, message: 'Falta el nombre del estudiante.' });
    else if (!grade) errors.push({ row, message: `No reconozco el curso «${gRaw}». Usa, por ejemplo, 5.º EGB, 1.º BGU o Inicial 2.` });
    else if (!/^[A-Z]{1,2}$/.test(par)) errors.push({ row, message: 'Falta el paralelo (A, B…).' });
    else if (guardian.length < 3) errors.push({ row, message: 'Falta el nombre del representante.' });
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push({ row, message: `Correo inválido: «${email}».` });
    else clean.push({ row, student, grade, par, guardian, email, rel: pick(raw, 'parentesco'), phone: pick(raw, 'telefono', 'celular') });
  });
  const sum = { courses_new: 0, students_new: 0, students_existing: 0, guardians_new: 0, guardians_existing: 0, links: 0 };
  if (!b.dry_run && errors.length) fail(400, 'Corrige las filas con errores antes de importar.');
  const seenC = new Map<string, string>(), seenS = new Map<string, string>(), seenG = new Map<string, string>();
  for (const r of clean) {
    const ck = `${r.grade}|${r.par}`;
    let cid = seenC.get(ck) ?? courses.find((c) => c.grade === r.grade && c.parallel === r.par)?.id;
    if (!cid) { sum.courses_new++; cid = b.dry_run ? `n:${ck}` : (courses.push({ id: uid(), grade: r.grade, parallel: r.par, tutor_id: null as unknown as Id }), courses[courses.length - 1].id); }
    seenC.set(ck, cid);
    const sk = `${cid}|${r.student.toLowerCase()}`;
    let sid = seenS.get(sk);
    if (!sid) {
      const ex = students.find((s) => s.course_id === cid && s.full_name.toLowerCase() === r.student.toLowerCase());
      if (ex) { sid = ex.id; sum.students_existing++; }
      else { sum.students_new++; sid = b.dry_run ? `n:${sk}` : (students.push({ id: uid(), full_name: r.student, course_id: cid, active: true }), students[students.length - 1].id); }
      seenS.set(sk, sid);
    }
    let gid = seenG.get(r.email);
    if (!gid) {
      const ex = users.find((x) => x.email === r.email);
      if (ex && ex.role !== 'representante') { errors.push({ row: r.row, message: `${r.email} ya es una cuenta de personal.` }); continue; }
      if (ex) { gid = ex.id; sum.guardians_existing++; }
      else { sum.guardians_new++; gid = b.dry_run ? `n:${r.email}` : upsertGuardian({ full_name: r.guardian, email: r.email, phone: r.phone || null }).id; }
      seenG.set(r.email, gid);
    }
    if (!b.dry_run && !guardians.some((g) => g.user_id === gid && g.student_id === sid)) guardians.push({ user_id: gid, student_id: sid, relationship: r.rel });
    sum.links++;
  }
  return { dry_run: !!b.dry_run, rows: clean.length, errors: errors.sort((x, y) => x.row - y.row), ...sum };
}, ['admin']);
on('GET', '/admin/notifications', () => ({ channels: { push: false, email: false }, items: notifLog.slice(0, 150) }), ['admin']);

on('PUT', '/me/notifications', ({ u, b }) => { u.email_prefs = b.email_prefs === 'todo' ? 'todo' : 'importante'; return { email_prefs: u.email_prefs }; });
on('PUT', '/me/password', ({ b }) => { if (String(b.password ?? '').length < 8) fail(400, 'Usa al menos 8 caracteres.'); return { ok: true }; });


/* ——— Transporte ——— */
const clone = <T,>(x: T): T => (x === undefined ? (null as T) : JSON.parse(JSON.stringify(x)));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const demoTransport: Transport = async (method, rawPath, body, token) => {
  await wait(120 + Math.random() * 180);
  const [path, query = ''] = rawPath.split('?');
  if (method === 'POST' && path === '/auth/login') {
    const b = body as { email: string };
    const u = users.find((x) => x.email === b.email?.trim().toLowerCase());
    if (!u || !u.active) fail(401, 'Correo o contraseña incorrectos.');
    if (!u!.activated) fail(401, 'Aún no activas tu cuenta. Usa el enlace del correo de bienvenida.');
    u!.last_seen_at = iso(now());
    scheduleSave();
    return { token: u!.id };
  }
  if (method === 'POST' && (path === '/auth/forgot')) return { ok: true };
  if (method === 'POST' && (path === '/auth/token' || path === '/auth/set-password')) fail(400, 'En la demostración no se usan enlaces de invitación.');
  const u = token ? byId(users, token) : undefined;
  if (!u || !u.active) fail(401, 'Inicia sesión para continuar.');
  for (const [m, re, h, roles] of routes) {
    const match = m === method ? path.match(re) : null;
    if (!match) continue;
    if (roles && !roles.includes(u!.role)) fail(403, 'No tienes permiso para esta acción.');
    const out = clone(h({ u: u!, p: match.slice(1), q: new URLSearchParams(query), b: body ?? {} }));
    scheduleSave();
    return out;
  }
  return fail(404, 'Ruta no encontrada.');
};

/* ——— Persistencia: los cambios de la demo se guardan en este navegador ——— */
export const DEMO_STORE_KEY = 'anai-comunica.demo.v1';
const tables = { users, courses, teacherCourses, students, guardians, events, rsvps, anns, recs, convs, msgs, posts, slots, appts, reports, notifLog } as unknown as Record<string, unknown[]>;
let saveTimer: ReturnType<typeof setTimeout> | undefined;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(DEMO_STORE_KEY, JSON.stringify({ saved_at: Date.now(), ...tables, reactions: [...reactions], views: [...views] }));
    } catch { /* sin almacenamiento: la demo sigue funcionando en memoria */ }
  }, 200);
}
(function restore() {
  try {
    const raw = localStorage.getItem(DEMO_STORE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    for (const k of Object.keys(tables)) if (Array.isArray(d[k])) tables[k].splice(0, tables[k].length, ...d[k]);
    reactions.clear(); (d.reactions ?? []).forEach((x: string) => reactions.add(x));
    views.clear(); (d.views ?? []).forEach((x: string) => views.add(x));
  } catch { /* datos dañados: se usan los de ejemplo */ }
})();
