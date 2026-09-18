import { Link } from 'react-router-dom';
import type { Home } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { PushNudge } from '../components/Notifications';
import { DateBlock, familyStatus, KIND_LABEL, RsvpButtons } from '../components/pieces';
import { Avatar, ErrorBox, Loading } from '../components/ui';
import { dayLabel, deadlineText, displayName, firstName, fmtRange, fmtTime, when } from '../lib/format';
import { useApi } from '../lib/useApi';

function greeting() {
  const h = Number(new Intl.DateTimeFormat('es-EC', { timeZone: 'America/Guayaquil', hour: 'numeric', hour12: false }).format(new Date()));
  return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
}

export function Inicio() {
  const me = useMe();
  const { data, error, loading, reload } = useApi<Home>('/home');

  return (
    <div className="page">
      <div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 600 }}>{greeting()}, {firstName(me.user.full_name)}</h1>
        <p className="page-sub">{me.children.map((c) => `${firstName(c.full_name)}, ${c.course_label}`).join(' · ')}</p>
      </div>

      <PushNudge />
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={3} />}

      {data && (
        <>
          <section className="section" aria-labelledby="pend">
            <h2 id="pend" className="sr-only">Pendientes</h2>
            {data.pending.length === 0 ? (
              <div className="all-clear"><Icon name="check" size={26} />Estás al día. No tienes nada pendiente.</div>
            ) : (
              <div className="action-stack">
                <div className="section-head"><h2>Requiere tu acción</h2></div>
                {data.pending.map((a) => {
                  const st = familyStatus(a);
                  const needsRsvp = st.label === 'Confirma asistencia';
                  return (
                    <div key={a.id} className="action-card">
                      <span className="kind">{needsRsvp ? 'Confirma tu asistencia' : KIND_LABEL[a.kind]}</span>
                      <h3>{a.title}</h3>
                      {a.deadline && <span className="when">{deadlineText(a.deadline)}</span>}
                      {needsRsvp && a.event ? (
                        <>
                          <span className="when">{dayLabel(a.event.starts_at)}, {fmtRange(a.event.starts_at, a.event.ends_at)}</span>
                          <RsvpButtons ev={a.event} onChange={() => reload()} />
                        </>
                      ) : (
                        <Link to={`/comunicados/${a.id}`} className="btn btn-dark">
                          {a.kind === 'autorizacion' ? 'Revisar y responder' : 'Leer y confirmar'}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {data.appointments.length > 0 && (
            <section className="section">
              <div className="section-head"><h2>Tus citas</h2><Link to="/agenda?vista=citas">Ver todas</Link></div>
              <div className="list">
                {data.appointments.slice(0, 2).map((ap) => (
                  <Link key={ap.id} to="/agenda?vista=citas" className="item">
                    <DateBlock iso={ap.slot.starts_at} />
                    <div className="grow">
                      <div className="item-title">{displayName(ap.teacher)}</div>
                      <div className="item-sub">{fmtTime(ap.slot.starts_at)}, sobre {firstName(ap.student.full_name)}</div>
                    </div>
                    <span className={`badge ${ap.status === 'confirmada' ? 'b-green' : 'b-amber'}`}>
                      {ap.status === 'confirmada' ? 'Confirmada' : 'Por confirmar'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="section">
            <div className="section-head"><h2>Próximos días</h2><Link to="/agenda">Ver agenda</Link></div>
            {data.upcoming.length === 0 ? (
              <div className="card pad muted">No hay eventos en las próximas dos semanas.</div>
            ) : (
              <div className="list">
                {data.upcoming.map((ev) => (
                  <Link key={ev.id} to="/agenda" className="item">
                    <DateBlock iso={ev.starts_at} />
                    <div className="grow">
                      <div className="item-title">{ev.title}</div>
                      <div className="item-sub">{fmtRange(ev.starts_at, ev.ends_at)}{ev.location ? `, ${ev.location}` : ''}</div>
                    </div>
                    {ev.rsvp_enabled && (ev.my_rsvp
                      ? <span className="badge b-green">{ev.my_rsvp === 'si' ? 'Asistirás' : ev.my_rsvp === 'no' ? 'No irás' : 'Tal vez'}</span>
                      : <span className="badge b-plum">Por confirmar</span>)}
                  </Link>
                ))}
              </div>
            )}
          </section>

          {data.conversations.length > 0 && (
            <section className="section">
              <div className="section-head"><h2>Mensajes</h2><Link to="/mensajes">Ver todos</Link></div>
              <div className="list">
                {data.conversations.map((c) => (
                  <Link key={c.id} to={`/mensajes/${c.id}`} className="item">
                    <Avatar name={c.teacher.full_name} />
                    <div className="grow">
                      <div className="row-gap" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                        <span className="item-title clamp">{displayName(c.teacher)}</span>
                        {c.last_message && <span className="item-meta">{when(c.last_message.created_at)}</span>}
                      </div>
                      <div className="item-sub clamp" style={c.unread ? { color: 'var(--ink)', fontWeight: 600 } : undefined}>
                        {c.last_message?.body ?? `Sobre ${firstName(c.student.full_name)}`}
                      </div>
                    </div>
                    {c.unread > 0 && <span className="count" aria-label={`${c.unread} sin leer`}>{c.unread}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {data.latest_post && (
            <section className="section">
              <div className="section-head"><h2>Última novedad</h2><Link to="/novedades">Ver novedades</Link></div>
              <Link to="/novedades" className="card pad stack" style={{ textDecoration: 'none', color: 'inherit', gap: 8 }}>
                <div className="row-gap small muted">
                  <span>{displayName(data.latest_post.author)}</span><span>{when(data.latest_post.created_at)}</span>
                </div>
                <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.latest_post.body}</p>
              </Link>
            </section>
          )}
        </>
      )}
    </div>
  );
}
