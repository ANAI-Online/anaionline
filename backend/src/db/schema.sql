-- Anai Comunica · esquema inicial (PostgreSQL 14+ / PGlite)

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'America/Guayaquil',
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  role text not null check (role in ('admin', 'docente', 'representante')),
  full_name text not null,
  title text,                                  -- Lcda., Lic., Msc.
  email text not null unique,
  password_hash text not null,
  office_hours jsonb,                          -- {"days":[1,2,3,4,5],"start":"08:00","end":"16:00"}
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  grade text not null,                         -- "5.º EGB", "1.º BGU"
  parallel text not null,                      -- "A", "B"
  tutor_id uuid references users(id),
  unique (school_id, grade, parallel)
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  full_name text not null,
  course_id uuid not null references courses(id)
);

-- Representantes de cada estudiante
create table if not exists guardians (
  user_id uuid not null references users(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  relationship text,
  primary key (user_id, student_id)
);

-- Docentes por curso y asignatura (además del tutor)
create table if not exists teacher_courses (
  teacher_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  subject text not null,
  primary key (teacher_id, course_id, subject)
);

-- Agenda
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  author_id uuid not null references users(id),
  title text not null,
  description text not null default '',
  location text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  audience_all boolean not null default false,
  rsvp_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists event_courses (
  event_id uuid not null references events(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  primary key (event_id, course_id)
);

create table if not exists event_rsvps (
  event_id uuid not null references events(id) on delete cascade,
  guardian_id uuid not null references users(id) on delete cascade,
  response text not null check (response in ('si', 'tal_vez', 'no')),
  updated_at timestamptz not null default now(),
  primary key (event_id, guardian_id)
);

-- Comunicados
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  author_id uuid not null references users(id),
  title text not null,
  body text not null,
  kind text not null check (kind in ('informativo', 'lectura', 'autorizacion')),
  audience_all boolean not null default false,
  deadline timestamptz,
  attachments jsonb not null default '[]',
  event_id uuid references events(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists announcement_courses (
  announcement_id uuid not null references announcements(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  primary key (announcement_id, course_id)
);

-- Una fila por representante y estudiante: la autorización es por cada hijo
create table if not exists announcement_recipients (
  announcement_id uuid not null references announcements(id) on delete cascade,
  guardian_id uuid not null references users(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  read_at timestamptz,
  response text check (response in ('si', 'no')),
  responded_at timestamptz,
  reminded_at timestamptz,
  primary key (announcement_id, guardian_id, student_id)
);
create index if not exists idx_recipients_guardian on announcement_recipients(guardian_id);

-- Mensajería: una conversación = docente + representante + estudiante
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  teacher_id uuid not null references users(id),
  guardian_id uuid not null references users(id),
  student_id uuid not null references students(id),
  created_at timestamptz not null default now(),
  unique (teacher_id, guardian_id, student_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references users(id),
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);
create index if not exists idx_messages_conversation on messages(conversation_id, created_at);

create table if not exists message_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  reporter_id uuid not null references users(id),
  reason text not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'revisado')),
  created_at timestamptz not null default now()
);

-- Novedades
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id),
  author_id uuid not null references users(id),
  course_id uuid references courses(id),       -- null = todo el colegio
  body text not null,
  images jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists post_reactions (
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  primary key (post_id, user_id)
);

create table if not exists post_views (
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- Citas con docentes
create table if not exists availability_slots (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references users(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (teacher_id, starts_at)
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references availability_slots(id) on delete cascade,
  teacher_id uuid not null references users(id),
  guardian_id uuid not null references users(id),
  student_id uuid not null references students(id),
  reason text not null default '',
  status text not null default 'solicitada'
    check (status in ('solicitada', 'confirmada', 'rechazada', 'cancelada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Impide reservar dos veces el mismo horario
create unique index if not exists uq_active_appointment_per_slot
  on appointments(slot_id) where status in ('solicitada', 'confirmada');

-- ——— Fase 2: administración, cuentas y notificaciones ———

alter table users alter column password_hash drop not null;   -- sin contraseña hasta activar la invitación
alter table users add column if not exists active boolean not null default true;
alter table users add column if not exists phone text;
alter table users add column if not exists email_prefs text not null default 'importante';
alter table students add column if not exists active boolean not null default true;
alter table announcements add column if not exists auto_reminded_at timestamptz;
alter table events add column if not exists reminded_at timestamptz;
alter table appointments add column if not exists reminded_at timestamptz;

-- Enlaces de un solo uso: invitación (activar cuenta) y restablecer contraseña
create table if not exists auth_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  kind text not null check (kind in ('invitacion', 'restablecer')),
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

-- Dispositivos con notificaciones push activadas
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists idx_push_user on push_subscriptions(user_id);

-- Registro de envíos (para revisar si un aviso llegó)
create table if not exists notification_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  channel text not null check (channel in ('push', 'correo')),
  title text not null,
  status text not null check (status in ('enviado', 'fallido', 'simulado')),
  error text,
  created_at timestamptz not null default now()
);
create index if not exists idx_notification_log_created on notification_log(created_at desc);

alter table courses add column if not exists sort_order int not null default 0;
update courses set sort_order = case
  when grade like 'Inicial%' then coalesce(nullif(regexp_replace(grade, '\D', '', 'g'), '')::int, 1)
  when grade like '%EGB' then 10 + coalesce(nullif(regexp_replace(grade, '\D', '', 'g'), '')::int, 0)
  when grade like '%BGU' then 30 + coalesce(nullif(regexp_replace(grade, '\D', '', 'g'), '')::int, 0)
  else 99 end
where sort_order = 0;

-- Configuración generada por el servidor (p. ej. claves VAPID)
create table if not exists settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
