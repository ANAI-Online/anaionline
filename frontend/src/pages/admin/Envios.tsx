import type { NotificationLogItem } from '../../api/types';
import { Empty, ErrorBox, Loading } from '../../components/ui';
import { dayLabel, fmtTime } from '../../lib/format';
import { useApi } from '../../lib/useApi';

const STATUS = { enviado: ['b-green', 'Enviado'], fallido: ['b-red', 'Falló'], simulado: ['b-amber', 'Simulado'] } as const;

/** Registro de los últimos avisos: sirve para responder «no me llegó». */
export function Envios() {
  const { data, error, loading, reload } = useApi<{ channels: { push: boolean; email: boolean }; items: NotificationLogItem[] }>('/admin/notifications', { poll: 20_000 });
  return (
    <section className="stack">
      <p className="muted small">Los últimos 150 avisos. «Simulado» significa que el servidor aún no tiene el correo configurado: el aviso se registró pero no salió.</p>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && data.items.length === 0 && <div className="card"><Empty title="Aún no se ha enviado nada" /></div>}
      {data && data.items.length > 0 && (
        <div className="list">
          {data.items.map((l) => (
            <div key={l.id} className="item log-row">
              <span className={`badge ${l.channel === 'push' ? 'b-teal' : 'b-plum'}`}>{l.channel === 'push' ? 'Push' : 'Correo'}</span>
              <div style={{ minWidth: 0 }}>
                <div className="item-title clamp" style={{ fontWeight: 500 }}>{l.title}</div>
                <div className="item-sub clamp">{l.full_name ?? 'Cuenta borrada'}{l.email ? `, ${l.email}` : ''} · {dayLabel(l.created_at)} {fmtTime(l.created_at)}</div>
                {l.error && <div className="item-sub" style={{ color: 'var(--red)' }}>{l.error}</div>}
              </div>
              <span className={`badge ${STATUS[l.status][0]}`}>{STATUS[l.status][1]}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
