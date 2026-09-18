import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import type { AdminSummary } from '../api/types';
import { ErrorBox, Loading, useAction, useToast } from '../components/ui';
import { plural } from '../lib/format';
import { useApi } from '../lib/useApi';
import { Cursos } from './admin/Cursos';
import { Envios } from './admin/Envios';
import { Familias } from './admin/Familias';
import { Importar } from './admin/Importar';
import { Personal } from './admin/Personal';

const TABS = [
  { id: 'familias', label: 'Estudiantes y familias' },
  { id: 'personal', label: 'Docentes y dirección' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'importar', label: 'Importar desde Excel' },
  { id: 'envios', label: 'Envíos' },
] as const;
type Tab = (typeof TABS)[number]['id'];

export function Admin() {
  const [params, setParams] = useSearchParams();
  const tab = (TABS.find((t) => t.id === params.get('tab'))?.id ?? 'familias') as Tab;
  const { data: s, error, reload } = useApi<AdminSummary>('/admin/summary');
  const invite = useAction();
  const toast = useToast();

  return (
    <div className="page wide">
      <div className="page-head">
        <div>
          <h1>Administración</h1>
          <p className="page-sub">Cursos, docentes, estudiantes y sus representantes. Cada persona recibe un enlace para crear su contraseña.</p>
        </div>
      </div>

      {error && <ErrorBox message={error} onRetry={reload} />}
      {!s && !error && <Loading rows={1} />}
      {s && (
        <div className="admin-stats">
          <div className="card kpi"><span className="label">Estudiantes</span><span className="value">{s.students}</span><span className="note">en {plural(s.courses, 'curso', 'cursos')}</span></div>
          <div className="card kpi"><span className="label">Representantes</span><span className="value">{s.guardians}</span><span className="note">{s.staff} docentes y dirección</span></div>
          <div className={`card kpi ${s.pending_activation ? 'warn' : ''}`}>
            <span className="label">Cuentas sin activar</span><span className="value">{s.pending_activation}</span>
            {s.pending_activation > 0 ? (
              <button className="btn btn-sm btn-dark" style={{ marginTop: 8, alignSelf: 'flex-start' }} disabled={invite.busy} onClick={async () => {
                const r = await invite.run(() => api.post<{ queued: number }>('/admin/invite-pending'));
                if (r) invite.setError(null);
                if (r) toast(queuedText(r.queued, s.channels.email));
                reload();
              }}>Enviar invitaciones</button>
            ) : <span className="note">Todas las cuentas están activas</span>}
            {invite.error && <span className="note" style={{ color: 'var(--red)' }}>{invite.error}</span>}
          </div>
          <div className="card kpi">
            <span className="label">Avisos</span>
            <span className="row-gap small" style={{ marginTop: 6 }}>
              <span className={`badge ${s.channels.email ? 'b-green' : s.channels.email_error ? 'b-red' : 'b-amber'}`}>
                {s.channels.email ? 'Correo activo' : s.channels.email_error ? 'Correo no disponible' : 'Correo simulado'}
              </span>
              <span className={`badge ${s.channels.push ? 'b-green' : 'b-amber'}`}>{s.channels.push ? 'Push activo' : 'Push sin configurar'}</span>
            </span>
            <span className="note" style={{ marginTop: 6 }}>
              {s.channels.email ? 'Las invitaciones y avisos salen por correo.'
                : s.channels.email_error ? `${s.channels.email_error} Mientras tanto, comparte los enlaces por WhatsApp.`
                : 'Configura el correo en el servidor (ver guía).'}
            </span>
          </div>
        </div>
      )}

      <div className="tabs-scroll" role="tablist" aria-label="Secciones">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={`chip ${tab === t.id ? 'on' : ''}`}
            onClick={() => setParams({ tab: t.id }, { replace: true })}>{t.label}</button>
        ))}
      </div>

      {s && tab === 'familias' && <Familias summary={s} onChanged={reload} />}
      {s && tab === 'personal' && <Personal onChanged={reload} />}
      {s && tab === 'cursos' && <Cursos summary={s} onChanged={reload} />}
      {s && tab === 'importar' && <Importar onDone={reload} />}
      {s && tab === 'envios' && <Envios />}
    </div>
  );
}

function queuedText(n: number, email: boolean) {
  return (
    n === 0
      ? 'No hay invitaciones por enviar: las pendientes ya recibieron una hoy.'
      : email
        ? `Enviando ${plural(n, 'invitación', 'invitaciones')} por correo.`
        : `Se generaron ${plural(n, 'invitación', 'invitaciones')}. El correo aún no está configurado: comparte los enlaces desde cada persona.`
  );
}

