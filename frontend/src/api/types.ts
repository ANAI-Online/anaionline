export type Role = 'admin' | 'docente' | 'representante';
export type Kind = 'informativo' | 'lectura' | 'autorizacion';
export type Rsvp = 'si' | 'tal_vez' | 'no';
export type AppointmentStatus = 'solicitada' | 'confirmada' | 'rechazada' | 'cancelada';

export interface OfficeHours { days: number[]; start: string; end: string }
export interface Person { id: string; full_name: string; title?: string | null; role?: Role }

export interface Profile {
  user: Person & { role: Role; email: string; office_hours: OfficeHours | null; school_name: string; email_prefs: EmailPrefs };
  children: { id: string; full_name: string; course_id: string; course_label: string }[];
  courses: { id: string; label: string; is_tutor: boolean; students: number }[];
  notifications: { push_available: boolean; push_devices: number; email_prefs: EmailPrefs };
}
export type EmailPrefs = 'importante' | 'todo';

export interface EventItem {
  id: string; title: string; description: string; location: string;
  starts_at: string; ends_at: string; audience_all: boolean; audience_label: string;
  course_ids: string[]; rsvp_enabled: boolean; author_id: string;
  my_rsvp?: Rsvp | null;
  counts?: { si: number; tal_vez: number; no: number };
}

export interface Target {
  student_id: string; student_name: string; read_at: string | null;
  response: 'si' | 'no' | null; responded_at: string | null;
}

export interface Announcement {
  id: string; title: string; body: string; kind: Kind; deadline: string | null;
  attachments: { name: string; url: string }[]; created_at: string; audience_label: string;
  author: Person; event: EventItem | null;
  targets?: Target[];
  stats?: { total: number; read: number; si: number; no: number; pending: number };
}

export interface Recipient {
  guardian_id: string; guardian_name: string; student_id: string; student_name: string;
  course_label: string; read_at: string | null; response: 'si' | 'no' | null;
  responded_at: string | null; reminded_at: string | null;
}

export interface Conversation {
  id: string;
  teacher: Person & { office_hours: OfficeHours | null };
  guardian: Person;
  student: { id: string; full_name: string; course_label: string };
  last_message: { body: string; created_at: string; sender_id: string } | null;
  unread: number; updated_at: string;
}
export interface Message { id: string; conversation_id: string; sender_id: string; body: string; created_at: string; read_at: string | null }

export interface TeacherContact { id: string; full_name: string; title: string | null; office_hours: OfficeHours | null; role_label: string }
export interface StudentRef { id: string; full_name: string; course_label: string }
export interface FamilyContact { student: StudentRef; teachers: TeacherContact[] }
export interface StaffContact { student: StudentRef; guardians: { id: string; full_name: string; relationship: string | null }[] }

export interface Post {
  id: string; body: string; images: string[]; created_at: string; course_id: string | null;
  audience_label: string; author: Person; reactions: number; reacted: boolean; views: number;
}

export interface Slot { id: string; teacher_id: string; starts_at: string; ends_at: string; appointment_id?: string | null }
export interface Appointment {
  id: string; status: AppointmentStatus; reason: string; created_at: string;
  slot: { id: string; starts_at: string; ends_at: string };
  teacher: Person; guardian: Person; student: StudentRef;
}

export interface Home {
  pending: Announcement[]; upcoming: EventItem[]; latest_post: Post | null;
  conversations: Conversation[]; unread_messages: number; appointments: Appointment[];
}

export interface Dashboard {
  read_rate: number | null; families_active: number; families_total: number;
  median_response_hours: number | null; pending_authorizations: number; unanswered_48h: number;
  pending_appointments: number; open_reports: number;
  courses: { id: string; label: string; read_rate: number | null; response_hours: number | null; inactive_families: number }[];
}

export interface Report {
  id: string; reason: string; status: 'pendiente' | 'revisado'; created_at: string;
  message: { id: string; body: string; created_at: string; sender_name: string };
  reporter_name: string; teacher_name: string; guardian_name: string; student_name: string;
}

/* ——— Administración ——— */
export type AccountStatus = 'activa' | 'invitada' | 'inactiva';
export interface AccessLink { url: string; email_sent: boolean }
export interface AdminSummary {
  courses: number; staff: number; students: number; guardians: number; pending_activation: number;
  channels: { push: boolean; email: boolean; email_error?: string | null }; grades: string[];
}
export interface AdminCourse {
  id: string; grade: string; parallel: string; label: string; students: number;
  tutor: Person | null; teachers: (Person & { subject: string })[];
}
export interface AdminStaff {
  id: string; full_name: string; title: string | null; email: string; role: 'admin' | 'docente';
  status: AccountStatus; last_seen_at: string | null;
  tutor_of: { id: string; label: string }[];
  subjects: { course_id: string; label: string; subject: string }[];
}
export interface AdminGuardian {
  id: string; full_name: string; email: string; phone: string | null; relationship: string | null;
  status: AccountStatus; last_seen_at: string | null;
}
export interface AdminStudent {
  id: string; full_name: string; active: boolean; course_id: string; course_label: string; guardians: AdminGuardian[];
}
export interface ImportResult {
  dry_run: boolean; rows: number; errors: { row: number; message: string }[];
  courses_new: number; students_new: number; students_existing: number;
  guardians_new: number; guardians_existing: number; links: number;
}
export interface NotificationLogItem {
  id: string; channel: 'push' | 'correo'; title: string; status: 'enviado' | 'fallido' | 'simulado';
  error: string | null; created_at: string; full_name: string | null; email: string | null;
}
