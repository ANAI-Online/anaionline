import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Conversation, FamilyContact, Message, StaffContact } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { useRefreshBadges } from '../components/Shell';
import { Avatar, Empty, ErrorBox, Loading, Sheet, useAction, useToast } from '../components/ui';
import { dateKey, dayLabel, displayName, firstName, fmtTime, officeHoursText, when, withinOfficeHours } from '../lib/format';
import { useApi } from '../lib/useApi';

export function MensajesLista() {
  const me = useMe();
  const [composing, setComposing] = useState(false);
  const { data, error, loading, reload } = useApi<Conversation[]>('/conversations', { poll: 30_000 });

  return (
    <div className="page">
      <div className="page-head">
        <h1>Mensajes</h1>
        <button className="btn btn-primary" onClick={() => setComposing(true)}><Icon name="plus" size={20} />Nuevo mensaje</button>
      </div>
      {me.isStaff && (
        <div className="card pad row-gap small" style={{ gap: 10 }}>
          <Icon name="clock" size={18} />
          <span className="grow">Atiendes {officeHoursText(me.user.office_hours) ?? 'sin horario definido'}. Puedes cambiarlo en tu cuenta.</span>
        </div>
      )}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && data.length === 0 && (
        <div className="card">
          <Empty title="Aún no tienes conversaciones"
            action={<button className="btn btn-primary" onClick={() => setComposing(true)}>Escribir un mensaje</button>}>
            {me.isFamily ? 'Escribe a la tutoría o a un docente de tu representado.' : 'Escribe al representante de uno de tus estudiantes.'}
          </Empty>
        </div>
      )}
      {data && data.length > 0 && (
        <div className="list">
          {data.map((c) => {
            const other = me.isFamily ? displayName(c.teacher) : c.guardian.full_name;
            const mine = c.last_message?.sender_id === me.user.id;
            return (
              <Link key={c.id} to={`/mensajes/${c.id}`} className="item">
                <Avatar name={me.isFamily ? c.teacher.full_name : c.guardian.full_name} tone={me.isFamily ? undefined : 'plum'} />
                <div className="grow">
                  <div className="row-gap" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                    <span className="item-title clamp">{other}</span>
                    {c.last_message && <span className="item-meta">{when(c.last_message.created_at)}</span>}
                  </div>
                  <div className="item-sub clamp">Sobre {c.student.full_name}, {c.student.course_label}</div>
                  <div className="item-sub clamp" style={c.unread ? { color: 'var(--ink)', fontWeight: 600 } : undefined}>
                    {c.last_message ? `${mine ? 'Tú: ' : ''}${c.last_message.body}` : 'Sin mensajes todavía'}
                  </div>
                </div>
                {c.unread > 0 && <span className="count" aria-label={`${c.unread} sin leer`}>{c.unread}</span>}
              </Link>
            );
          })}
        </div>
      )}
      {composing && <NewConversation onClose={() => setComposing(false)} />}
    </div>
  );
}

function NewConversation({ onClose }: { onClose: () => void }) {
  const me = useMe();
  const nav = useNavigate();
  const { data, error, loading } = useApi<(FamilyContact | StaffContact)[]>('/contacts');
  const [q, setQ] = useState('');
  const { busy, error: startError, run } = useAction();

  async function start(body: { student_id: string; teacher_id?: string; guardian_id?: string }) {
    const cv = await run(() => api.post<Conversation>('/conversations', body));
    if (cv) nav(`/mensajes/${cv.id}`);
  }

  const staffRows = useMemo(() => {
    if (!data || me.isFamily) return [];
    const needle = q.trim().toLowerCase();
    return (data as StaffContact[]).filter((c) =>
      !needle || c.student.full_name.toLowerCase().includes(needle) || c.guardians.some((g) => g.full_name.toLowerCase().includes(needle)),
    );
  }, [data, q, me.isFamily]);

  return (
    <Sheet title={me.isFamily ? '¿A quién escribes?' : 'Escribir a un representante'} onClose={onClose}>
      {loading && <Loading rows={2} />}
      {error && <ErrorBox message={error} />}
      {startError && <div className="form-error">{startError}</div>}
      {data && me.isFamily && (data as FamilyContact[]).map((c) => (
        <div key={c.student.id} className="stack" style={{ gap: 8 }}>
          {data.length > 1 && <div className="field-label">Sobre {c.student.full_name}, {c.student.course_label}</div>}
          <div className="list">
            {c.teachers.map((t) => (
              <button key={t.id} className="item" disabled={busy} onClick={() => start({ student_id: c.student.id, teacher_id: t.id })}>
                <Avatar name={t.full_name} />
                <div className="grow">
                  <div className="item-title">{displayName(t)}</div>
                  <div className="item-sub">{t.role_label}</div>
                  {t.office_hours && <div className="item-sub">Atiende {officeHoursText(t.office_hours)}</div>}
                </div>
                <Icon name="chat" size={20} />
              </button>
            ))}
          </div>
        </div>
      ))}
      {data && me.isStaff && (
        <>
          <div className="field">
            <label htmlFor="q" className="sr-only">Buscar</label>
            <input id="q" className="input" placeholder="Busca por estudiante o representante" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="list">
            {staffRows.map((c) => c.guardians.map((g) => (
              <button key={c.student.id + g.id} className="item" disabled={busy} onClick={() => start({ student_id: c.student.id, guardian_id: g.id })}>
                <Avatar name={g.full_name} tone="plum" />
                <div className="grow">
                  <div className="item-title">{g.full_name}</div>
                  <div className="item-sub">{g.relationship ? `${g.relationship} de ` : 'Representante de '}{c.student.full_name}, {c.student.course_label}</div>
                </div>
              </button>
            )))}
            {staffRows.length === 0 && <Empty title="Sin resultados" />}
          </div>
        </>
      )}
    </Sheet>
  );
}

export function Conversacion() {
  const { id } = useParams();
  const me = useMe();
  const toast = useToast();
  const refreshBadges = useRefreshBadges();
  const { data, setData, error, loading } = useApi<{ conversation: Conversation; messages: Message[] }>(`/conversations/${id}/messages`, { poll: 10_000 });
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [reporting, setReporting] = useState<Message | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const count = data?.messages.length ?? 0;

  useEffect(() => { refreshBadges(); }, [count, refreshBadges]);
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'end' }); }, [count]);

  if (error) return <div className="page"><Link to="/mensajes" className="link">Volver a mensajes</Link><ErrorBox message={error} /></div>;
  if (loading || !data) return <div className="page"><Loading /></div>;

  const { conversation: c, messages } = data;
  const otherName = me.isFamily ? displayName(c.teacher) : c.guardian.full_name;
  const open = withinOfficeHours(c.teacher.office_hours);
  const lastMine = [...messages].reverse().find((m) => m.sender_id === me.user.id);

  async function send() {
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    setSendError(null);
    try {
      const m = await api.post<Message & { outside_office_hours: boolean }>(`/conversations/${id}/messages`, { body });
      setData((d) => d && { ...d, messages: [...d.messages, m] });
      setText('');
      if (m.outside_office_hours) toast('Enviado. Lo verá en su horario de atención.');
    } catch (e) {
      setSendError((e as Error).message);
    } finally {
      setSending(false);
    }
  }

  let lastDay = '';
  return (
    <div className="chat">
      <header className="chat-head">
        <Link to="/mensajes" className="icon-btn" style={{ border: 0 }} aria-label="Volver a mensajes"><Icon name="back" /></Link>
        <Avatar name={me.isFamily ? c.teacher.full_name : c.guardian.full_name} tone={me.isFamily ? undefined : 'plum'} />
        <div className="grow">
          <div className="item-title clamp">{otherName}</div>
          <div className="item-sub clamp">Sobre {c.student.full_name}, {c.student.course_label}</div>
        </div>
      </header>

      {me.isFamily && c.teacher.office_hours && (
        <div className={`hours-note ${open ? '' : 'off'}`}>
          <Icon name="clock" size={18} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            {open
              ? `Atiende ${officeHoursText(c.teacher.office_hours)}.`
              : `Ahora está fuera de su horario (${officeHoursText(c.teacher.office_hours)}). Puedes escribir: lo verá en su próximo horario de atención.`}
          </span>
        </div>
      )}

      <div className="chat-body" aria-live="polite">
        {messages.length === 0 && (
          <Empty title={`Escribe a ${firstName(otherName.replace(/^(Lcda?|Lic|Msc|Prof)\.\s/, ''))}`}>Sé breve y concreto; así la respuesta llega más rápido.</Empty>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === me.user.id;
          const day = dateKey(m.created_at);
          const sep = day !== lastDay ? <div className="day-sep">{dayLabel(m.created_at)}</div> : null;
          lastDay = day;
          return (
            <div key={m.id} style={{ display: 'contents' }}>
              {sep}
              <button className={`bubble ${mine ? 'me' : 'them'}`} onClick={() => setSelected(selected === m.id ? null : m.id)}
                aria-expanded={selected === m.id}>{m.body}</button>
              {(selected === m.id || (mine && m.id === lastMine?.id)) && (
                <div className={`bubble-meta ${mine ? 'me' : ''}`}>
                  <span>{fmtTime(m.created_at)}</span>
                  {mine && m.id === lastMine?.id && <span>{m.read_at ? 'Visto' : 'Enviado'}</span>}
                  {!mine && selected === m.id && (
                    <button className="link small" style={{ padding: 0, color: 'var(--ink-3)' }} onClick={() => setReporting(m)}>Reportar mensaje</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottom} />
      </div>

      {sendError && <div className="form-error" style={{ margin: '0 12px 8px' }}>{sendError}</div>}
      <form className="composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="msg" className="sr-only">Escribe un mensaje</label>
        <textarea id="msg" rows={1} placeholder="Escribe un mensaje" value={text} maxLength={4000}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && window.matchMedia('(min-width: 960px)').matches) { e.preventDefault(); send(); }
          }} />
        <button className="send" disabled={!text.trim() || sending} aria-label="Enviar"><Icon name="send" size={20} /></button>
      </form>

      {reporting && <ReportSheet message={reporting} onClose={() => setReporting(null)} />}
    </div>
  );
}

function ReportSheet({ message, onClose }: { message: Message; onClose: () => void }) {
  const [reason, setReason] = useState('');
  const { busy, error, run } = useAction();
  return (
    <Sheet title="Reportar mensaje" onClose={onClose}>
      <p className="muted small">Dirección revisará este mensaje. La otra persona no sabrá quién lo reportó.</p>
      <blockquote className="card pad small pre" style={{ margin: 0 }}>{message.body}</blockquote>
      <div className="field">
        <label htmlFor="reason">¿Qué pasó?</label>
        <textarea id="reason" className="textarea" style={{ minHeight: 90 }} value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>
      {error && <div className="form-error">{error}</div>}
      <button className="btn btn-dark" disabled={busy || reason.trim().length < 3} onClick={async () => {
        const ok = await run(() => api.post(`/messages/${message.id}/report`, { reason }), 'Reporte enviado a dirección');
        if (ok) onClose();
      }}>Enviar reporte</button>
    </Sheet>
  );
}
