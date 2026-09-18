import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Appointment, EventItem, FamilyContact, Slot } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { DateBlock, EventCard } from '../components/pieces';
import { Avatar, Empty, ErrorBox, Loading, Segmented, Sheet, useAction } from '../components/ui';
import { addDays, dateKey, dayLabel, displayName, firstName, fmtRange, fmtTime, localIso, officeHoursText, todayKey } from '../lib/format';
import { useApi } from '../lib/useApi';

type View = 'eventos' | 'citas';

export function Agenda() {
  const me = useMe();
  const [params, setParams] = useSearchParams();
  const view: View = params.get('vista') === 'citas' ? 'citas' : 'eventos';
  const setView = (v: View) => setParams(v === 'citas' ? { vista: 'citas' } : {}, { replace: true });

  return (
    <div className="page">
      <div className="page-head"><h1>Agenda</h1></div>
      <Segmented label="Sección" value={view} onChange={setView}
        options={[{ value: 'eventos', label: 'Eventos' }, { value: 'citas', label: me.isFamily ? 'Citas con docentes' : 'Citas' }]} />
      {view === 'eventos' ? <Eventos /> : me.isFamily ? <CitasFamilia /> : <CitasDocente />}
    </div>
  );
}

function groupByDay<T>(items: T[], iso: (t: T) => string) {
  const groups: { key: string; label: string; items: T[] }[] = [];
  for (const it of items) {
    const k = dateKey(iso(it));
    let g = groups.find((x) => x.key === k);
    if (!g) groups.push((g = { key: k, label: dayLabel(iso(it)), items: [] }));
    g.items.push(it);
  }
  return groups;
}

/* ——— Eventos ——— */

function Eventos() {
  const me = useMe();
  const { data, setData, error, loading, reload } = useApi<EventItem[]>('/events');
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState<EventItem | null>(null);
  const groups = useMemo(() => groupByDay(data ?? [], (e) => e.starts_at), [data]);

  return (
    <div className="stack" style={{ gap: 18 }}>
      {me.isStaff && (
        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => setCreating(true)}>
          <Icon name="plus" size={20} />Nuevo evento
        </button>
      )}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={2} />}
      {data && data.length === 0 && <div className="card"><Empty title="No hay eventos próximos" /></div>}
      {groups.map((g) => (
        <section key={g.key} className="section">
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-3)' }}>{g.label}</h2>
          {g.items.map((ev) => (
            <EventCard key={ev.id} ev={ev}
              onChange={(u) => setData((d) => d?.map((x) => (x.id === u.id ? u : x)))}
              onOpen={me.isStaff ? () => setViewing(ev) : undefined} />
          ))}
        </section>
      ))}
      {creating && <NewEventSheet onClose={() => setCreating(false)} onCreated={() => { setCreating(false); reload(); }} />}
      {viewing && <RsvpSheet ev={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}

function NewEventSheet({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const me = useMe();
  const [f, setF] = useState({ title: '', date: addDays(todayKey(), 3), from: '09:00', to: '10:00', location: '', description: '', rsvp: true });
  const [all, setAll] = useState(false);
  const [courses, setCourses] = useState<string[]>(me.courses.length === 1 ? [me.courses[0].id] : []);
  const { busy, error, setError, run } = useAction();
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <Sheet title="Nuevo evento" onClose={onClose}>
      <form className="stack" onSubmit={async (e) => {
        e.preventDefault();
        if (!all && courses.length === 0) return setError('Elige al menos un curso.');
        const ok = await run(() => api.post('/events', {
          title: f.title, description: f.description, location: f.location,
          starts_at: localIso(f.date, f.from), ends_at: localIso(f.date, f.to),
          audience_all: all, course_ids: all ? [] : courses, rsvp_enabled: f.rsvp,
        }), 'Evento creado');
        if (ok) onCreated();
      }}>
        <div className="field"><label htmlFor="e-title">Nombre del evento</label>
          <input id="e-title" className="input" value={f.title} onChange={set('title')} required minLength={3} maxLength={160} /></div>
        <div className="grid-2">
          <div className="field"><label htmlFor="e-date">Fecha</label>
            <input id="e-date" type="date" className="input" min={todayKey()} value={f.date} onChange={set('date')} required /></div>
          <div className="field"><label htmlFor="e-loc">Lugar</label>
            <input id="e-loc" className="input" value={f.location} onChange={set('location')} /></div>
          <div className="field"><label htmlFor="e-from">Desde</label>
            <input id="e-from" type="time" className="input" value={f.from} onChange={set('from')} required /></div>
          <div className="field"><label htmlFor="e-to">Hasta</label>
            <input id="e-to" type="time" className="input" value={f.to} onChange={set('to')} required /></div>
        </div>
        <div className="field">
          <span className="field-label">Para</span>
          <div className="row-gap">
            {me.isAdmin && <button type="button" className={`chip ${all ? 'on' : ''}`} aria-pressed={all} onClick={() => setAll(!all)}>Todo el colegio</button>}
            {!all && me.courses.map((c) => (
              <button type="button" key={c.id} className={`chip ${courses.includes(c.id) ? 'on' : ''}`} aria-pressed={courses.includes(c.id)}
                onClick={() => setCourses((cs) => (cs.includes(c.id) ? cs.filter((x) => x !== c.id) : [...cs, c.id]))}>{c.label}</button>
            ))}
          </div>
        </div>
        <div className="field"><label htmlFor="e-desc">Detalles (opcional)</label>
          <textarea id="e-desc" className="textarea" style={{ minHeight: 80 }} value={f.description} onChange={set('description')} /></div>
        <label className="switch-row">
          <input type="checkbox" checked={f.rsvp} onChange={(e) => setF({ ...f, rsvp: e.target.checked })} />
          <span>Pedir confirmación de asistencia</span>
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn btn-primary" disabled={busy}>Crear evento</button>
      </form>
    </Sheet>
  );
}

const RSVP_TEXT = { si: 'Asistirá', tal_vez: 'Tal vez', no: 'No podrá' } as const;

function RsvpSheet({ ev, onClose }: { ev: EventItem; onClose: () => void }) {
  const { data, loading } = useApi<{ guardian_id: string; guardian_name: string; response: keyof typeof RSVP_TEXT; students: string }[]>(`/events/${ev.id}/rsvps`);
  return (
    <Sheet title={ev.title} onClose={onClose}>
      {loading && <Loading rows={2} />}
      {data && data.length === 0 && <Empty title="Aún nadie respondió" />}
      {data && data.length > 0 && (
        <div className="list">
          {data.map((r) => (
            <div key={r.guardian_id} className="item">
              <Avatar name={r.guardian_name} size="sm" />
              <div className="grow"><div className="item-title">{r.guardian_name}</div><div className="item-sub">{r.students}</div></div>
              <span className={`badge ${r.response === 'si' ? 'b-green' : r.response === 'no' ? 'b-gray' : 'b-amber'}`}>{RSVP_TEXT[r.response]}</span>
            </div>
          ))}
        </div>
      )}
    </Sheet>
  );
}

/* ——— Citas: representantes ——— */

const STATUS = {
  solicitada: { label: 'Por confirmar', tone: 'b-amber' },
  confirmada: { label: 'Confirmada', tone: 'b-green' },
  rechazada: { label: 'No disponible', tone: 'b-gray' },
  cancelada: { label: 'Cancelada', tone: 'b-gray' },
} as const;

function CitasFamilia() {
  const { data, setData, error, loading, reload } = useApi<Appointment[]>('/appointments');
  const [booking, setBooking] = useState(false);
  const { run } = useAction();
  const upcoming = (data ?? []).filter((a) => new Date(a.slot.starts_at) > new Date());

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="card pad stack" style={{ gap: 10 }}>
        <h2 style={{ fontSize: 17, fontWeight: 600 }}>¿Necesitas conversar con un docente?</h2>
        <p className="muted small">Elige un horario libre y cuéntale el motivo. Te avisaremos cuando lo confirme.</p>
        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => setBooking(true)}>Pedir una cita</button>
      </div>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={2} />}
      {upcoming.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Tus citas</h2></div>
          <div className="list">
            {upcoming.map((a) => (
              <div key={a.id} className="item" style={{ alignItems: 'flex-start' }}>
                <DateBlock iso={a.slot.starts_at} />
                <div className="grow stack" style={{ gap: 4 }}>
                  <div className="item-title">{displayName(a.teacher)}</div>
                  <div className="item-sub">{fmtRange(a.slot.starts_at, a.slot.ends_at)}, sobre {firstName(a.student.full_name)}</div>
                  {a.reason && <div className="item-sub">«{a.reason}»</div>}
                  <div className="row-gap" style={{ marginTop: 4 }}>
                    <span className={`badge ${STATUS[a.status].tone}`}>{STATUS[a.status].label}</span>
                    {(a.status === 'solicitada' || a.status === 'confirmada') && (
                      <button className="btn btn-sm btn-quiet" onClick={async () => {
                        if (!window.confirm('¿Cancelar esta cita?')) return;
                        const u = await run(() => api.patch<Appointment>(`/appointments/${a.id}`, { status: 'cancelada' }), 'Cita cancelada');
                        if (u) setData((d) => d?.map((x) => (x.id === u.id ? u : x)));
                      }}>Cancelar</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {data && upcoming.length === 0 && <div className="card"><Empty title="No tienes citas próximas" /></div>}
      {booking && <BookSheet onClose={() => setBooking(false)} onBooked={() => { setBooking(false); reload(); }} />}
    </div>
  );
}

function BookSheet({ onClose, onBooked }: { onClose: () => void; onBooked: () => void }) {
  const { data: contacts, loading } = useApi<FamilyContact[]>('/contacts');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const { busy, error, run } = useAction();

  const sid = studentId ?? (contacts?.length === 1 ? contacts[0].student.id : null);
  const current = contacts?.find((c) => c.student.id === sid);
  const teacher = current?.teachers.find((t) => t.id === teacherId);
  const { data: slots, loading: loadingSlots } = useApi<Slot[]>(sid && teacherId ? `/slots?teacher_id=${teacherId}&student_id=${sid}` : null);
  const days = useMemo(() => groupByDay(slots ?? [], (s) => s.starts_at), [slots]);

  return (
    <Sheet title="Pedir una cita" onClose={onClose}>
      {loading && <Loading rows={2} />}
      {contacts && contacts.length > 1 && (
        <div className="field">
          <span className="field-label">¿Sobre quién?</span>
          <div className="row-gap">
            {contacts.map((c) => (
              <button key={c.student.id} type="button" className={`chip ${sid === c.student.id ? 'on' : ''}`} aria-pressed={sid === c.student.id}
                onClick={() => { setStudentId(c.student.id); setTeacherId(null); setSlotId(null); }}>
                {firstName(c.student.full_name)}, {c.student.course_label}
              </button>
            ))}
          </div>
        </div>
      )}

      {current && (
        <div className="field">
          <span className="field-label">¿Con quién?</span>
          <div className="list">
            {current.teachers.map((t) => (
              <button key={t.id} type="button" className="item" aria-pressed={teacherId === t.id}
                style={teacherId === t.id ? { background: 'var(--teal-soft)' } : undefined}
                onClick={() => { setTeacherId(t.id); setSlotId(null); }}>
                <Avatar name={t.full_name} size="sm" />
                <div className="grow"><div className="item-title">{displayName(t)}</div><div className="item-sub">{t.role_label}</div></div>
                {teacherId === t.id && <Icon name="check" size={20} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {teacher && (
        <div className="field">
          <span className="field-label">Horarios libres</span>
          {loadingSlots && <Loading rows={1} />}
          {slots && slots.length === 0 && (
            <div className="card pad small muted">
              {displayName(teacher)} no tiene horarios libres por ahora. Puedes escribirle un mensaje{teacher.office_hours ? ` (atiende ${officeHoursText(teacher.office_hours)})` : ''}.
            </div>
          )}
          {days.map((d) => (
            <div key={d.key} className="stack" style={{ gap: 6 }}>
              <div className="small muted">{d.label}</div>
              <div className="row-gap">
                {d.items.map((s) => (
                  <button key={s.id} type="button" className={`chip ${slotId === s.id ? 'on' : ''}`} aria-pressed={slotId === s.id} onClick={() => setSlotId(s.id)}>
                    {fmtTime(s.starts_at)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {slotId && (
        <>
          <div className="field">
            <label htmlFor="reason">Motivo (opcional)</label>
            <textarea id="reason" className="textarea" style={{ minHeight: 80 }} value={reason} maxLength={500}
              onChange={(e) => setReason(e.target.value)} placeholder="Así el docente puede prepararse." />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn btn-primary" disabled={busy} onClick={async () => {
            const ok = await run(() => api.post('/appointments', { slot_id: slotId, student_id: sid, reason }), 'Cita solicitada');
            if (ok) onBooked();
          }}>Solicitar cita</button>
        </>
      )}
    </Sheet>
  );
}

/* ——— Citas: docentes ——— */

function CitasDocente() {
  const { data: appts, setData: setAppts, reload: reloadAppts, error } = useApi<Appointment[]>('/appointments');
  const { data: slots, reload: reloadSlots } = useApi<Slot[]>('/slots');
  const { run } = useAction();
  const [form, setForm] = useState({ date: addDays(todayKey(), 1), start: '14:00', end: '15:00', duration: 20 });
  const add = useAction();

  const future = (appts ?? []).filter((a) => new Date(a.slot.starts_at) > new Date());
  const requests = future.filter((a) => a.status === 'solicitada');
  const confirmed = future.filter((a) => a.status === 'confirmada');
  const slotDays = useMemo(() => groupByDay(slots ?? [], (s) => s.starts_at), [slots]);

  const update = async (a: Appointment, status: 'confirmada' | 'rechazada' | 'cancelada', msg: string) => {
    const u = await run(() => api.patch<Appointment>(`/appointments/${a.id}`, { status }), msg);
    if (u) { setAppts((d) => d?.map((x) => (x.id === u.id ? u : x))); reloadSlots(); }
  };

  return (
    <div className="stack" style={{ gap: 22 }}>
      {error && <ErrorBox message={error} onRetry={reloadAppts} />}
      <section className="section">
        <div className="section-head"><h2>Solicitudes</h2></div>
        {requests.length === 0 ? <div className="card pad muted small">No tienes solicitudes nuevas.</div> : (
          <div className="stack" style={{ gap: 10 }}>
            {requests.map((a) => (
              <div key={a.id} className="action-card">
                <span className="kind">{dayLabel(a.slot.starts_at)}, {fmtRange(a.slot.starts_at, a.slot.ends_at)}</span>
                <h3>{a.guardian.full_name}</h3>
                <span className="when">Sobre {a.student.full_name}, {a.student.course_label}</span>
                {a.reason && <p className="small">«{a.reason}»</p>}
                <div className="row-gap">
                  <button className="btn btn-primary btn-sm" onClick={() => update(a, 'confirmada', 'Cita confirmada')}>Confirmar</button>
                  <button className="btn btn-outline btn-sm" onClick={() => update(a, 'rechazada', 'Avisamos que no puedes')}>No puedo</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {confirmed.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Confirmadas</h2></div>
          <div className="list">
            {confirmed.map((a) => (
              <div key={a.id} className="item">
                <DateBlock iso={a.slot.starts_at} />
                <div className="grow">
                  <div className="item-title">{a.guardian.full_name}</div>
                  <div className="item-sub">{fmtRange(a.slot.starts_at, a.slot.ends_at)}, sobre {firstName(a.student.full_name)}</div>
                </div>
                <button className="btn btn-sm btn-quiet" onClick={() => window.confirm('¿Cancelar esta cita? Avisaremos al representante.') && update(a, 'cancelada', 'Cita cancelada')}>Cancelar</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head"><h2>Tu disponibilidad</h2></div>
        <form className="card pad stack" onSubmit={async (e) => {
          e.preventDefault();
          const created = await add.run(() => api.post<Slot[]>('/slots', {
            date: form.date, start: form.start, end: form.end, duration_minutes: form.duration,
          }));
          if (created) { reloadSlots(); add.setError(null); }
        }}>
          <p className="small muted">Publica un bloque y lo dividimos en citas. Las familias solo ven los horarios libres.</p>
          <div className="grid-2">
            <div className="field"><label htmlFor="s-date">Día</label>
              <input id="s-date" type="date" className="input" min={todayKey()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></div>
            <div className="field"><label htmlFor="s-dur">Duración de cada cita</label>
              <select id="s-dur" className="select" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}>
                {[15, 20, 30, 45].map((m) => <option key={m} value={m}>{m} minutos</option>)}
              </select></div>
            <div className="field"><label htmlFor="s-from">Desde</label>
              <input id="s-from" type="time" className="input" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} required /></div>
            <div className="field"><label htmlFor="s-to">Hasta</label>
              <input id="s-to" type="time" className="input" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} required /></div>
          </div>
          {add.error && <div className="form-error">{add.error}</div>}
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={add.busy}>Publicar horarios</button>
        </form>

        {slotDays.length === 0 && <div className="card pad muted small">Aún no publicas horarios.</div>}
        {slotDays.map((d) => (
          <div key={d.key} className="stack" style={{ gap: 6 }}>
            <div className="small muted">{d.label}</div>
            <div className="row-gap">
              {d.items.map((s) => s.appointment_id ? (
                <span key={s.id} className="chip" style={{ background: 'var(--teal-soft)', borderColor: 'transparent', cursor: 'default' }}>
                  {fmtTime(s.starts_at)}, reservada
                </span>
              ) : (
                <button key={s.id} className="chip" aria-label={`Quitar horario de las ${fmtTime(s.starts_at)}`}
                  onClick={async () => { const ok = await run(() => api.del(`/slots/${s.id}`).then(() => true), 'Horario quitado'); if (ok) reloadSlots(); }}>
                  {fmtTime(s.starts_at)}<Icon name="x" size={14} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
