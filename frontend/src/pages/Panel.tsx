import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Dashboard, Report } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { useRefreshBadges } from '../components/Shell';
import { Empty, ErrorBox, Loading, useAction } from '../components/ui';
import { dayLabel, fmtTime, hours, pct, plural } from '../lib/format';
import { useApi } from '../lib/useApi';

export function Panel() {
  const me = useMe();
  const { data: d, error, loading, reload } = useApi<Dashboard>('/dashboard');

  return (
    <div className="page wide">
      <div className="page-head">
        <div>
          <h1>Panel de comunicación</h1>
          <p className="page-sub">{me.user.school_name}, últimos 30 días</p>
        </div>
        <div className="row-gap">
          <Link to="/admin" className="btn btn-outline"><Icon name="users" size={20} />Cursos, docentes y familias</Link>
          <Link to="/comunicados/nuevo" className="btn btn-primary"><Icon name="plus" size={20} />Comunicado para todos</Link>
        </div>
      </div>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={2} />}
      {d && (
        <>
          <div className="kpis">
            <div className="card kpi"><span className="label">Tasa de lectura</span><span className="value">{pct(d.read_rate)}</span><span className="note">de los comunicados enviados</span></div>
            <div className="card kpi"><span className="label">Familias activas</span><span className="value">{d.families_active} de {d.families_total}</span><span className="note">entraron en los últimos 30 días</span></div>
            <div className="card kpi"><span className="label">Respuesta a familias</span><span className="value">{hours(d.median_response_hours)}</span><span className="note">tiempo típico (mediana)</span></div>
            <div className={`card kpi ${d.pending_authorizations ? 'warn' : ''}`}><span className="label">Autorizaciones pendientes</span><span className="value">{d.pending_authorizations}</span><span className="note">con plazo vigente</span></div>
          </div>

          <section className="section">
            <div className="section-head"><h2>Necesita atención</h2></div>
            <div className="list">
              <Attention n={d.unanswered_48h} text="Mensajes de representantes sin respuesta hace más de 48 horas" zero="Todos los mensajes tienen respuesta" to="/mensajes" />
              <Attention n={d.pending_appointments} text="Citas solicitadas sin confirmar" zero="No hay citas por confirmar" to="/agenda?vista=citas" />
              <Attention n={d.open_reports} text="Mensajes reportados por revisar" zero="No hay reportes pendientes" to="/moderacion" />
            </div>
          </section>

          <section className="section">
            <div className="section-head"><h2>Por curso</h2></div>
            <div className="card table-wrap">
              <table>
                <thead><tr><th>Curso</th><th>Lectura</th><th>Respuesta típica</th><th>Familias sin entrar</th></tr></thead>
                <tbody>
                  {d.courses.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.label}</td>
                      <td className={c.read_rate !== null && c.read_rate < 0.6 ? 'bad' : ''}>{pct(c.read_rate)}</td>
                      <td className={c.response_hours !== null && c.response_hours > 24 ? 'bad' : ''}>{hours(c.response_hours)}</td>
                      <td className={c.inactive_families > 0 ? 'bad' : ''}>{c.inactive_families}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Attention({ n, text, zero, to }: { n: number; text: string; zero: string; to: string }) {
  return (
    <Link to={to} className="item">
      <span className={`badge ${n ? 'b-amber' : 'b-green'}`} style={{ minWidth: 34, justifyContent: 'center' }}>{n}</span>
      <span className="grow">{n === 0 ? zero : text}</span>
      <Icon name="back" size={18} style={{ transform: 'rotate(180deg)' }} />
    </Link>
  );
}

export function Moderacion() {
  const { data, setData, error, loading, reload } = useApi<Report[]>('/reports');
  const refreshBadges = useRefreshBadges();
  const { run } = useAction();
  const pending = (data ?? []).filter((r) => r.status === 'pendiente');

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Moderación</h1>
          <p className="page-sub">Mensajes que docentes o familias reportaron. Revisa el contexto y marca cada reporte cuando lo atiendas.</p>
        </div>
      </div>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={2} />}
      {data && data.length === 0 && <div className="card"><Empty title="No hay reportes">Cuando alguien reporte un mensaje, aparecerá aquí.</Empty></div>}
      {data && data.length > 0 && <p className="muted small">{plural(pending.length, 'reporte pendiente', 'reportes pendientes')}</p>}
      {data?.map((r) => (
        <article key={r.id} className="card pad stack" style={{ opacity: r.status === 'revisado' ? 0.65 : 1 }}>
          <div className="row-gap">
            <span className={`badge ${r.status === 'pendiente' ? 'b-amber' : 'b-green'}`}>{r.status === 'pendiente' ? 'Pendiente' : 'Revisado'}</span>
            <span className="small muted">{dayLabel(r.created_at)} a las {fmtTime(r.created_at)}</span>
          </div>
          <blockquote className="pre" style={{ margin: 0, paddingLeft: 14, borderLeft: '3px solid var(--line)' }}>{r.message.body}</blockquote>
          <div className="small muted">
            Escrito por {r.message.sender_name}. Conversación entre {r.teacher_name} y {r.guardian_name}, sobre {r.student_name}.
          </div>
          <div className="small"><strong>Motivo del reporte ({r.reporter_name}):</strong> {r.reason}</div>
          {r.status === 'pendiente' && (
            <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} onClick={async () => {
              const ok = await run(() => api.patch(`/reports/${r.id}`, { status: 'revisado' }).then(() => true), 'Marcado como revisado');
              if (ok) { setData((d) => d?.map((x) => (x.id === r.id ? { ...x, status: 'revisado' } : x))); refreshBadges(); }
            }}>Marcar como revisado</button>
          )}
        </article>
      ))}
    </div>
  );
}
