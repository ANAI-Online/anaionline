import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Announcement, Kind, Recipient } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { AnnouncementRow, EventCard, familyStatus, KIND_LABEL } from '../components/pieces';
import { useRefreshBadges } from '../components/Shell';
import { Avatar, Empty, ErrorBox, Loading, Segmented, useAction } from '../components/ui';
import { addDays, dayLabel, deadlineText, displayName, firstName, fmtDayLong, fmtTime, localIso, plural, todayKey, when } from '../lib/format';
import { useApi } from '../lib/useApi';

/* ——— Lista ——— */

export function ComunicadosLista() {
  const me = useMe();
  const [filter, setFilter] = useState<'todos' | 'pendientes'>('todos');
  const { data, error, loading, reload } = useApi<Announcement[]>('/announcements');

  const items = useMemo(() => {
    if (!data) return [];
    if (me.isStaff) return filter === 'pendientes' ? data.filter((a) => a.stats!.pending > 0) : data;
    return filter === 'pendientes' ? data.filter((a) => familyStatus(a).pending) : data;
  }, [data, filter, me.isStaff]);
  const pendingCount = data ? (me.isStaff ? data.filter((a) => a.stats!.pending > 0) : data.filter((a) => familyStatus(a).pending)).length : 0;

  return (
    <div className={`page ${me.isStaff ? 'wide' : ''}`}>
      <div className="page-head">
        <div>
          <h1>Comunicados</h1>
          {me.isStaff && <p className="page-sub">Envía avisos y sigue quién los leyó o respondió.</p>}
        </div>
        {me.isStaff && <Link to="/comunicados/nuevo" className="btn btn-primary"><Icon name="plus" size={20} />Nuevo comunicado</Link>}
      </div>

      <div className="row-gap">
        <button className={`chip ${filter === 'todos' ? 'on' : ''}`} aria-pressed={filter === 'todos'} onClick={() => setFilter('todos')}>Todos</button>
        <button className={`chip ${filter === 'pendientes' ? 'on' : ''}`} aria-pressed={filter === 'pendientes'} onClick={() => setFilter('pendientes')}>
          {me.isStaff ? 'Con respuestas pendientes' : 'Pendientes'}{pendingCount > 0 && <span className="n">{pendingCount}</span>}
        </button>
      </div>

      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && items.length === 0 && (
        <div className="card">
          {filter === 'pendientes'
            ? <Empty title="Nada pendiente">{me.isStaff ? 'Todas las familias respondieron.' : 'Respondiste todo. Buen trabajo.'}</Empty>
            : <Empty title="Aún no hay comunicados" action={me.isStaff ? <Link to="/comunicados/nuevo" className="btn btn-primary">Escribir el primero</Link> : undefined} />}
        </div>
      )}
      {items.length > 0 && (
        <div className="list">
          {items.map((a) => <AnnouncementRow key={a.id} a={a} to={`/comunicados/${a.id}`} staff={me.isStaff} />)}
        </div>
      )}
    </div>
  );
}

/* ——— Detalle para representantes ——— */

export function ComunicadoDetalle() {
  const { id } = useParams();
  const refreshBadges = useRefreshBadges();
  const { data: a, setData, error, loading } = useApi<Announcement>(`/announcements/${id}`);
  const { busy, error: actionError, run } = useAction();

  useEffect(() => {
    if (a && a.targets?.some((t) => !t.read_at)) {
      api.post(`/announcements/${a.id}/read`).then(refreshBadges).catch(() => {});
    }
  }, [a, refreshBadges]);

  if (error) return <div className="page"><BackLink /><ErrorBox message={error} /></div>;
  if (loading || !a) return <div className="page"><Loading rows={2} /></div>;

  const expired = !!a.deadline && new Date(a.deadline) < new Date();
  const respond = async (studentId: string, response: 'si' | 'no') => {
    const updated = await run(
      () => api.post<Announcement>(`/announcements/${a.id}/respond`, { student_id: studentId, response }),
      a.kind === 'lectura' ? 'Lectura confirmada' : response === 'si' ? 'Autorización enviada' : 'Respuesta enviada',
    );
    if (updated) { setData(updated); refreshBadges(); }
  };

  return (
    <div className="page">
      <BackLink />
      <article className="stack" style={{ gap: 18 }}>
        <div className="stack" style={{ gap: 10 }}>
          <div className="row-gap">
            <span className={`badge ${a.kind === 'informativo' ? 'b-teal' : 'b-amber'}`}>{KIND_LABEL[a.kind]}</span>
            {a.deadline && <span className="small muted">{deadlineText(a.deadline)}</span>}
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 600 }}>{a.title}</h1>
          <div className="row-gap" style={{ gap: 10 }}>
            <Avatar name={a.author.full_name} size="sm" tone="plum" />
            <div className="small">
              <div style={{ fontWeight: 600 }}>{displayName(a.author)}</div>
              <div className="muted">Para {a.audience_label}, {dayLabel(a.created_at).toLowerCase()} a las {fmtTime(a.created_at)}</div>
            </div>
          </div>
        </div>

        <p className="pre" style={{ fontSize: 16.5, lineHeight: 1.6 }}>{a.body}</p>

        {a.attachments.length > 0 && (
          <div className="list">
            {a.attachments.map((f) => (
              <a key={f.url} href={f.url} target="_blank" rel="noreferrer" className="item">
                <Icon name="paper" /><span className="grow">{f.name}</span><span className="small muted">Abrir</span>
              </a>
            ))}
          </div>
        )}

        {a.event && (
          <div className="stack" style={{ gap: 8 }}>
            <div className="field-label">Evento en la agenda</div>
            <EventCard ev={a.event} onChange={(ev) => { setData({ ...a, event: ev }); refreshBadges(); }} />
          </div>
        )}

        {(a.kind === 'autorizacion' || a.kind === 'lectura') && (
          <section className="card pad stack" aria-label="Tu respuesta">
            {a.targets!.map((t) => (
              <div key={t.student_id} className="stack" style={{ gap: 10 }}>
                {a.kind === 'autorizacion' ? (
                  <>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>¿Autorizas a {firstName(t.student_name)}?</div>
                    {t.response && (
                      <div className={`badge wrap ${t.response === 'si' ? 'b-green' : 'b-gray'}`} style={{ alignSelf: 'flex-start' }}>
                        <Icon name="check" size={16} />
                        {t.response === 'si' ? 'Autorizaste' : 'No autorizaste'} el {fmtDayLong(t.responded_at!)} a las {fmtTime(t.responded_at!)}
                      </div>
                    )}
                    {!expired && (
                      <div className="choices">
                        <button className="choice" aria-pressed={t.response === 'si'} disabled={busy} onClick={() => respond(t.student_id, 'si')}>Autorizo</button>
                        <button className="choice no" aria-pressed={t.response === 'no'} disabled={busy} onClick={() => respond(t.student_id, 'no')}>No autorizo</button>
                      </div>
                    )}
                    {t.response && !expired && <span className="hint">Puedes cambiar tu respuesta hasta que termine el plazo.</span>}
                  </>
                ) : t.response ? (
                  <div className="badge b-green" style={{ alignSelf: 'flex-start' }}>
                    <Icon name="check" size={16} />Confirmaste la lectura{a.targets!.length > 1 ? ` (${firstName(t.student_name)})` : ''}
                  </div>
                ) : (
                  <button className="btn btn-primary" disabled={busy || expired} onClick={() => respond(t.student_id, 'si')}>
                    Confirmo que leí{a.targets!.length > 1 ? ` (${firstName(t.student_name)})` : ''}
                  </button>
                )}
              </div>
            ))}
            {expired && <div className="hint">{deadlineText(a.deadline!)}. Si necesitas cambiar algo, escribe a la tutoría.</div>}
            {actionError && <div className="form-error" role="alert">{actionError}</div>}
          </section>
        )}
      </article>
    </div>
  );
}

function BackLink() {
  return <Link to="/comunicados" className="link row-gap" style={{ gap: 4, alignSelf: 'flex-start' }}><Icon name="back" size={18} />Comunicados</Link>;
}

/* ——— Seguimiento para docentes y dirección ——— */

export function Seguimiento() {
  const { id } = useParams();
  const { data: a, error, loading } = useApi<Announcement>(`/announcements/${id}`);
  const { data: rows, reload } = useApi<Recipient[]>(`/announcements/${id}/recipients`);
  const [tab, setTab] = useState<'pendientes' | 'respondieron' | 'todos'>('pendientes');
  const { busy, error: actionError, run } = useAction();

  if (error) return <div className="page wide"><BackLink /><ErrorBox message={error} /></div>;
  if (loading || !a || !rows) return <div className="page wide"><Loading /></div>;

  const s = a.stats!;
  const asks = a.kind !== 'informativo';
  const isPending = (r: Recipient) => (asks ? !r.response : !r.read_at);
  const shown = rows.filter((r) => (tab === 'todos' ? true : tab === 'pendientes' ? isPending(r) : !isPending(r)));
  const w = (n: number) => `${s.total ? (n / s.total) * 100 : 0}%`;

  return (
    <div className="page wide">
      <BackLink />
      <div className="page-head">
        <div>
          <span className={`badge ${asks ? 'b-amber' : 'b-teal'}`}>{KIND_LABEL[a.kind]}</span>
          <h1 style={{ marginTop: 10 }}>{a.title}</h1>
          <p className="page-sub">Para {a.audience_label}, enviado {dayLabel(a.created_at).toLowerCase()} a las {fmtTime(a.created_at)}{a.deadline ? `. Plazo: ${fmtDayLong(a.deadline)}` : ''}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'start' }}>
        <div className="stack">
          <section className="card pad stack">
            <div className="progress" aria-hidden="true">
              {a.kind === 'autorizacion' ? (<><span className="p-ok" style={{ width: w(s.si) }} /><span className="p-no" style={{ width: w(s.no) }} /></>)
                : a.kind === 'lectura' ? <span className="p-ok" style={{ width: w(s.si) }} />
                : <span className="p-read" style={{ width: w(s.read) }} />}
            </div>
            <div className="legend">
              {a.kind === 'autorizacion' && <><span><strong>{s.si}</strong> autorizan</span><span><strong>{s.no}</strong> no autorizan</span></>}
              {a.kind === 'lectura' && <span><strong>{s.si}</strong> confirmaron</span>}
              {a.kind === 'informativo' && <span><strong>{s.read}</strong> leyeron</span>}
              <span><strong>{s.pending}</strong> pendientes de {s.total}</span>
            </div>
            {s.pending > 0 && (
              <button className="btn btn-dark" disabled={busy} onClick={async () => {
                const r = await run(() => api.post<{ reminded: number }>(`/announcements/${a.id}/remind`), 'Recordatorio enviado');
                if (r) { reload(); }
              }}>Recordar a pendientes ({s.pending})</button>
            )}
            {actionError && <div className="form-error">{actionError}</div>}
          </section>
          <details className="card pad">
            <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Ver el comunicado</summary>
            <p className="pre" style={{ marginTop: 12, lineHeight: 1.6 }}>{a.body}</p>
          </details>
          {a.event && <EventCard ev={a.event} />}
        </div>

        <section className="stack">
          <Segmented label="Filtrar familias" value={tab} onChange={setTab} options={[
            { value: 'pendientes', label: `Pendientes (${rows.filter(isPending).length})` },
            { value: 'respondieron', label: asks ? 'Respondieron' : 'Leyeron' },
            { value: 'todos', label: 'Todos' },
          ]} />
          {shown.length === 0 ? (
            <div className="card"><Empty title={tab === 'pendientes' ? 'Nadie pendiente' : 'Todavía nadie'} /></div>
          ) : (
            <div className="list">
              {shown.map((r) => (
                <div key={r.guardian_id + r.student_id} className="item">
                  <Avatar name={r.guardian_name} size="sm" />
                  <div className="grow">
                    <div className="item-title">{r.guardian_name}</div>
                    <div className="item-sub">{r.student_name}, {r.course_label}</div>
                  </div>
                  <RecipientBadge r={r} asks={asks} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function RecipientBadge({ r, asks }: { r: Recipient; asks: boolean }) {
  if (asks && r.response === 'si') return <span className="badge b-green">Sí, {when(r.responded_at!)}</span>;
  if (asks && r.response === 'no') return <span className="badge b-red">No, {when(r.responded_at!)}</span>;
  if (r.read_at) return <span className="badge b-teal">{asks ? 'Leído, sin responder' : `Leído, ${when(r.read_at)}`}</span>;
  return <span className="badge b-gray">{r.reminded_at ? 'Recordado' : 'Sin abrir'}</span>;
}

/* ——— Redacción ——— */

const KIND_HELP: Record<Kind, string> = {
  informativo: 'Solo para informar. Verás quién lo abrió.',
  lectura: 'Cada familia confirma que lo leyó.',
  autorizacion: 'Cada familia autoriza o no, por cada estudiante.',
};

export function NuevoComunicado() {
  const me = useMe();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [kind, setKind] = useState<Kind>('informativo');
  const [all, setAll] = useState(false);
  const [courses, setCourses] = useState<string[]>(me.courses.length === 1 ? [me.courses[0].id] : []);
  const [deadline, setDeadline] = useState(addDays(todayKey(), 3));
  const [withEvent, setWithEvent] = useState(false);
  const [ev, setEv] = useState({ date: addDays(todayKey(), 5), from: '18:00', to: '19:00', location: '' });
  const { busy, error, setError, run } = useAction();

  const families = all ? null : me.courses.filter((c) => courses.includes(c.id)).reduce((n, c) => n + c.students, 0);
  const toggle = (id: string) => setCourses((cs) => (cs.includes(id) ? cs.filter((x) => x !== id) : [...cs, id]));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!all && courses.length === 0) return setError('Elige al menos un curso.');
    if (withEvent && ev.to <= ev.from) return setError('La hora de fin del evento debe ser posterior al inicio.');
    const created = await run(() => api.post<Announcement>('/announcements', {
      title, body, kind, audience_all: all, course_ids: all ? [] : courses,
      deadline: kind === 'informativo' ? null : localIso(deadline, '23:59'),
      event: withEvent ? { starts_at: localIso(ev.date, ev.from), ends_at: localIso(ev.date, ev.to), location: ev.location } : null,
    }), 'Comunicado enviado');
    if (created) nav(`/comunicados/${created.id}`, { replace: true });
  }

  return (
    <div className="page">
      <BackLink />
      <div className="page-head"><h1>Nuevo comunicado</h1></div>
      <form className="stack" style={{ gap: 22 }} onSubmit={submit}>
        <div className="field">
          <span className="field-label">¿Para quién?</span>
          <div className="row-gap">
            {me.isAdmin && (
              <button type="button" className={`chip ${all ? 'on' : ''}`} aria-pressed={all} onClick={() => setAll((v) => !v)}>Todo el colegio</button>
            )}
            {!all && me.courses.map((c) => (
              <button type="button" key={c.id} className={`chip ${courses.includes(c.id) ? 'on' : ''}`} aria-pressed={courses.includes(c.id)} onClick={() => toggle(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <span className="hint">{all ? 'Llegará a todas las familias del colegio.' : families ? `Llegará a las familias de ${plural(families, 'estudiante', 'estudiantes')}.` : 'Elige uno o más cursos.'}</span>
        </div>

        <div className="field">
          <label htmlFor="title">Título</label>
          <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} required minLength={3}
            placeholder="Ej.: Salida pedagógica al museo" />
        </div>

        <div className="field">
          <label htmlFor="body">Mensaje</label>
          <textarea id="body" className="textarea" value={body} onChange={(e) => setBody(e.target.value)} required maxLength={5000} rows={6} />
        </div>

        <div className="field">
          <span className="field-label">¿Qué necesitas de las familias?</span>
          <div className="option-cards">
            {(Object.keys(KIND_HELP) as Kind[]).map((k) => (
              <button type="button" key={k} className="option-card" aria-pressed={kind === k} onClick={() => setKind(k)}>
                <strong>{k === 'informativo' ? 'Solo informar' : KIND_LABEL[k]}</strong>
                <span>{KIND_HELP[k]}</span>
              </button>
            ))}
          </div>
        </div>

        {kind !== 'informativo' && (
          <div className="field" style={{ maxWidth: 260 }}>
            <label htmlFor="deadline">Responder hasta</label>
            <input id="deadline" className="input" type="date" min={todayKey()} value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </div>
        )}

        <div className="card pad stack">
          <label className="switch-row">
            <input type="checkbox" checked={withEvent} onChange={(e) => setWithEvent(e.target.checked)} />
            <span><strong>Agregar un evento a la agenda</strong><br /><span className="hint">Las familias podrán confirmar su asistencia.</span></span>
          </label>
          {withEvent && (
            <div className="grid-2">
              <div className="field"><label htmlFor="ev-date">Fecha</label>
                <input id="ev-date" className="input" type="date" min={todayKey()} value={ev.date} onChange={(e) => setEv({ ...ev, date: e.target.value })} required /></div>
              <div className="field"><label htmlFor="ev-loc">Lugar</label>
                <input id="ev-loc" className="input" value={ev.location} onChange={(e) => setEv({ ...ev, location: e.target.value })} placeholder="Ej.: Aula 5.º EGB B" /></div>
              <div className="field"><label htmlFor="ev-from">Desde</label>
                <input id="ev-from" className="input" type="time" value={ev.from} onChange={(e) => setEv({ ...ev, from: e.target.value })} required /></div>
              <div className="field"><label htmlFor="ev-to">Hasta</label>
                <input id="ev-to" className="input" type="time" value={ev.to} onChange={(e) => setEv({ ...ev, to: e.target.value })} required /></div>
            </div>
          )}
        </div>

        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="row-gap">
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Enviando…' : 'Enviar comunicado'}</button>
          <Link to="/comunicados" className="btn btn-quiet">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

