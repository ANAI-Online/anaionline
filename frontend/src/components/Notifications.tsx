import { useEffect, useState } from 'react';
import { api, IS_DEMO } from '../api/client';
import type { EmailPrefs } from '../api/types';
import { useAuth, useMe } from '../auth';
import { disablePush, enablePush, pushState, type PushState } from '../lib/push';
import { Icon } from './icons';
import { Segmented, useAction } from './ui';

export function usePushState() {
  const [state, setState] = useState<PushState | null>(null);
  useEffect(() => { pushState().then(setState); }, []);
  return [state, setState] as const;
}

function IosSteps() {
  return (
    <ol className="small" style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6 }}>
      <li>Abre esta página en Safari.</li>
      <li>Toca el botón Compartir (el cuadrado con la flecha hacia arriba).</li>
      <li>Elige «Agregar a pantalla de inicio» y luego «Agregar».</li>
      <li>Abre Anai Comunica desde el ícono nuevo y activa las notificaciones aquí.</li>
    </ol>
  );
}

/** Interruptor de notificaciones de este dispositivo + preferencia de correo. */
export function NotificationSettings() {
  const me = useMe();
  const { refresh } = useAuth();
  const [state, setState] = usePushState();
  const { busy, error, run } = useAction();
  const [prefs, setPrefs] = useState<EmailPrefs>(me.notifications.email_prefs);

  return (
    <div className="stack">
      <div className="field">
        <span className="field-label">En este dispositivo</span>
        {IS_DEMO && <p className="hint">En la demostración no se envían notificaciones reales.</p>}
        {!IS_DEMO && !me.notifications.push_available && <p className="hint">El servidor aún no tiene configuradas las notificaciones push.</p>}
        {!IS_DEMO && me.notifications.push_available && state === 'on' && (
          <div className="row-gap">
            <span className="badge b-green"><Icon name="check" size={16} />Notificaciones activadas</span>
            <button className="btn btn-sm btn-quiet" disabled={busy} onClick={async () => {
              await run(disablePush, 'Notificaciones desactivadas en este dispositivo');
              setState(await pushState()); refresh();
            }}>Desactivar</button>
          </div>
        )}
        {!IS_DEMO && me.notifications.push_available && state === 'off' && (
          <button className="btn btn-primary" disabled={busy} onClick={async () => {
            await run(enablePush, 'Listo. Te enviamos una notificación de prueba');
            setState(await pushState()); refresh();
          }}><Icon name="bell" size={20} />Activar notificaciones</button>
        )}
        {state === 'denied' && <p className="hint">Bloqueaste las notificaciones para esta página. Actívalas desde la configuración del navegador (ícono del candado, junto a la dirección).</p>}
        {state === 'ios-install' && <><p className="hint">En iPhone, primero instala Anai Comunica en tu pantalla de inicio:</p><IosSteps /></>}
        {state === 'unsupported' && !IS_DEMO && <p className="hint">Este navegador no admite notificaciones. Prueba con Chrome, Edge o Safari actualizados.</p>}
      </div>

      <div className="field">
        <span className="field-label">Correo a {me.user.email}</span>
        <Segmented label="Qué recibir por correo" value={prefs} onChange={async (v) => {
          setPrefs(v);
          await run(() => api.put('/me/notifications', { email_prefs: v }), 'Preferencia guardada');
          refresh();
        }} options={[{ value: 'importante', label: 'Solo lo importante' }, { value: 'todo', label: 'Todo' }]} />
        <span className="hint">
          {prefs === 'importante'
            ? 'Autorizaciones, recordatorios de plazos y cambios en tus citas. Si no tienes notificaciones activadas, también comunicados y mensajes.'
            : 'Además, cada comunicado, mensaje y novedad.'}
        </span>
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

/** Aviso en Inicio para quien aún no activó las notificaciones. */
export function PushNudge() {
  const me = useMe();
  const [state, setState] = usePushState();
  const { busy, error, run } = useAction();
  const KEY = 'comunica.nudge.hidden';
  const [hidden, setHidden] = useState(() => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } });
  if (IS_DEMO || hidden || !me.notifications.push_available || !state || state === 'on' || state === 'unsupported') return null;
  const hide = () => { setHidden(true); try { localStorage.setItem(KEY, '1'); } catch { /* sin almacenamiento */ } };

  return (
    <div className="card pad stack" style={{ gap: 10 }}>
      <div className="row-gap" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
        <Icon name="bell" size={24} style={{ color: 'var(--teal)', flexShrink: 0 }} />
        <div className="grow">
          <div className="item-title">Entérate al instante</div>
          <div className="item-sub">Activa las notificaciones para recibir autorizaciones, mensajes y recordatorios en tu celular.</div>
        </div>
      </div>
      {state === 'ios-install' ? <IosSteps /> : state === 'denied' ? (
        <p className="hint">Las notificaciones están bloqueadas en este navegador. Actívalas desde su configuración.</p>
      ) : (
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" disabled={busy} onClick={async () => {
            await run(enablePush, 'Listo. Te enviamos una notificación de prueba');
            setState(await pushState());
          }}>Activar</button>
          <button className="btn btn-sm btn-quiet" onClick={hide}>Ahora no</button>
        </div>
      )}
      {state !== 'off' && <button className="link small" style={{ alignSelf: 'flex-start' }} onClick={hide}>Ocultar</button>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
