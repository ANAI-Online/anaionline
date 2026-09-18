import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Announcement, EventItem, Rsvp } from '../api/types';
import { dateParts, deadlineText, fmtRange, when } from '../lib/format';
import { Icon } from './icons';
import { useToast } from './ui';

export function DateBlock({ iso }: { iso: string }) {
  const p = dateParts(iso);
  return (
    <div className="date-block" aria-hidden="true">
      <div className="dow">{p.dow}</div>
      <div className="day">{p.day}</div>
      <div className="mon">{p.mon}</div>
    </div>
  );
}

export const KIND_LABEL = { informativo: 'Informativo', lectura: 'Confirmar lectura', autorizacion: 'Requiere autorización' } as const;

/** Estado del comunicado para el representante. */
export function familyStatus(a: Announcement): { label: string; tone: string; pending: boolean } {
  const t = a.targets ?? [];
  const eventPending = !!a.event?.rsvp_enabled && !a.event.my_rsvp && new Date(a.event.starts_at) > new Date();
  const expired = !!a.deadline && new Date(a.deadline) < new Date();
  if (a.kind === 'autorizacion') {
    if (t.every((x) => x.response)) {
      const allYes = t.every((x) => x.response === 'si');
      return { label: allYes ? 'Autorizado' : 'Respondido', tone: 'b-green', pending: false };
    }
    return expired ? { label: 'Plazo vencido', tone: 'b-gray', pending: false } : { label: 'Por autorizar', tone: 'b-amber', pending: true };
  }
  if (a.kind === 'lectura' && t.some((x) => !x.response)) return { label: 'Por confirmar', tone: 'b-amber', pending: !expired };
  if (eventPending) return { label: 'Confirma asistencia', tone: 'b-amber', pending: true };
  if (t.every((x) => x.read_at)) return { label: 'Leído', tone: 'b-green', pending: false };
  return { label: 'Nuevo', tone: 'b-teal', pending: false };
}

export function AnnouncementRow({ a, to, staff }: { a: Announcement; to: string; staff?: boolean }) {
  const s = !staff ? familyStatus(a) : null;
  const unread = !staff && a.targets?.some((t) => !t.read_at);
  return (
    <Link to={to} className="item">
      <div className="grow stack" style={{ gap: 4 }}>
        <div className="item-title two-lines" style={unread ? undefined : { fontWeight: 500 }}>{a.title}</div>
        <div className="row-gap" style={{ gap: 8 }}>
          {s && <span className={`badge ${s.tone}`}>{s.label}</span>}
          {staff && a.stats && <StaffMini a={a} />}
          <span className="item-sub">
            {a.audience_label}, {when(a.created_at)}
            {a.deadline && s?.pending ? `. ${deadlineText(a.deadline)}` : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StaffMini({ a }: { a: Announcement }) {
  const s = a.stats!;
  const done = s.total - s.pending;
  return (
    <span className={`badge ${s.pending ? 'b-gray' : 'b-green'}`}>{a.kind === 'informativo' ? 'Leído' : 'Respondido'} {done}/{s.total}</span>
  );
}

const RSVP_OPTIONS: { value: Rsvp; label: string }[] = [
  { value: 'si', label: 'Asistiré' },
  { value: 'tal_vez', label: 'Tal vez' },
  { value: 'no', label: 'No podré' },
];

/** Confirmación de asistencia con respuesta inmediata. */
export function RsvpButtons({ ev, onChange }: { ev: EventItem; onChange?: (e: EventItem) => void }) {
  const toast = useToast();
  const [value, setValue] = useState(ev.my_rsvp ?? null);
  const [err, setErr] = useState<string | null>(null);
  const past = new Date(ev.starts_at) < new Date();
  if (!ev.rsvp_enabled) return null;
  if (past) return value ? <div className="muted small">Respondiste: {RSVP_OPTIONS.find((o) => o.value === value)?.label}</div> : null;
  return (
    <div className="stack" style={{ gap: 6 }}>
      <div className="choices" role="group" aria-label="¿Asistirás?">
        {RSVP_OPTIONS.map((o) => (
          <button key={o.value} type="button" className={`choice ${o.value === 'no' ? 'no' : ''}`} aria-pressed={value === o.value}
            onClick={async () => {
              const prev = value;
              setValue(o.value);
              setErr(null);
              try {
                const updated = await api.put<EventItem>(`/events/${ev.id}/rsvp`, { response: o.value });
                toast(o.value === 'si' ? 'Asistencia confirmada' : 'Respuesta guardada');
                onChange?.(updated);
              } catch (e) { setValue(prev); setErr((e as Error).message); }
            }}>{o.label}</button>
        ))}
      </div>
      {err && <div className="form-error">{err}</div>}
    </div>
  );
}

export function EventCard({ ev, onChange, onOpen }: { ev: EventItem; onChange?: (e: EventItem) => void; onOpen?: () => void }) {
  const staff = !!ev.counts;
  return (
    <article className="card pad stack" style={{ gap: 12 }}>
      <div className="row-gap" style={{ alignItems: 'flex-start', gap: 14, flexWrap: 'nowrap' }}>
        <DateBlock iso={ev.starts_at} />
        <div className="grow stack" style={{ gap: 4 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600 }}>{ev.title}</h3>
          <div className="row-gap small muted" style={{ gap: 12 }}>
            <span className="row-gap" style={{ gap: 4 }}><Icon name="clock" size={16} />{fmtRange(ev.starts_at, ev.ends_at)}</span>
            {ev.location && <span className="row-gap" style={{ gap: 4 }}><Icon name="pin" size={16} />{ev.location}</span>}
          </div>
          <div className="small muted">{ev.audience_label}</div>
        </div>
      </div>
      {ev.description && <p className="small pre" style={{ color: 'var(--ink-2)' }}>{ev.description}</p>}
      {!staff && <RsvpButtons ev={ev} onChange={onChange} />}
      {staff && ev.rsvp_enabled && ev.counts && (
        <div className="row-gap">
          <div className="legend grow">
            <span><strong>{ev.counts.si}</strong> asistirán</span>
            <span><strong>{ev.counts.tal_vez}</strong> tal vez</span>
            <span><strong>{ev.counts.no}</strong> no podrán</span>
          </div>
          {onOpen && <button className="btn btn-sm btn-outline" onClick={onOpen}>Ver respuestas</button>}
        </div>
      )}
    </article>
  );
}
