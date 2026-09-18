import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { OfficeHours } from '../api/types';
import { api, IS_DEMO } from '../api/client';
import { useAuth, useMe } from '../auth';
import { resetDemo } from '../lib/demoReset';
import { displayName, officeHoursText } from '../lib/format';
import { NotificationSettings } from './Notifications';
import { Avatar, Sheet, useAction } from './ui';

const DAY_NAMES = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const DAY_FULL = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

export function OfficeHoursForm({ onDone }: { onDone?: () => void }) {
  const me = useMe();
  const { refresh } = useAuth();
  const initial: OfficeHours = me.user.office_hours ?? { days: [1, 2, 3, 4, 5], start: '08:00', end: '16:00' };
  const [oh, setOh] = useState(initial);
  const { busy, error, run } = useAction();
  const toggle = (d: number) =>
    setOh((o) => ({ ...o, days: o.days.includes(d) ? o.days.filter((x) => x !== d) : [...o.days, d].sort() }));

  return (
    <form className="stack" onSubmit={async (e) => {
      e.preventDefault();
      const ok = await run(() => api.put('/me/office-hours', oh), 'Horario guardado');
      if (ok) { await refresh(); onDone?.(); }
    }}>
      <p className="muted small">Los representantes ven este horario al escribirte. Fuera de él, no recibes avisos: sus mensajes te esperan hasta el siguiente día de atención.</p>
      <div className="field">
        <span className="field-label">Días</span>
        <div className="day-toggles">
          {DAY_NAMES.map((n, i) => (
            <button type="button" key={n} aria-pressed={oh.days.includes(i + 1)} aria-label={DAY_FULL[i]} onClick={() => toggle(i + 1)}>{n}</button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="field"><label htmlFor="oh-start">Desde</label>
          <input id="oh-start" className="input" type="time" value={oh.start} onChange={(e) => setOh({ ...oh, start: e.target.value })} required /></div>
        <div className="field"><label htmlFor="oh-end">Hasta</label>
          <input id="oh-end" className="input" type="time" value={oh.end} onChange={(e) => setOh({ ...oh, end: e.target.value })} required /></div>
      </div>
      {error && <div className="form-error">{error}</div>}
      <button className="btn btn-primary" disabled={busy || oh.days.length === 0}>Guardar horario</button>
    </form>
  );
}

export function AccountSheet({ onClose }: { onClose: () => void }) {
  const me = useMe();
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  return (
    <Sheet title="Tu cuenta" onClose={onClose}>
      <div className="row-gap" style={{ gap: 14 }}>
        <Avatar name={me.user.full_name} tone={me.isFamily ? undefined : 'plum'} />
        <div>
          <div className="item-title">{displayName(me.user)}</div>
          <div className="item-sub">{me.user.email}</div>
        </div>
      </div>
      <div className="list">
        <div className="item"><span className="grow"><span className="muted small">Institución</span><br />{me.user.school_name}</span></div>
        {me.isFamily && me.children.map((c) => (
          <div className="item" key={c.id}><span className="grow">{c.full_name}</span><span className="muted">{c.course_label}</span></div>
        ))}
        {me.isStaff && (
          <div className="item">
            <span className="grow"><span className="muted">Horario de atención</span><br />{officeHoursText(me.user.office_hours) ?? 'Sin definir'}</span>
            <button className="btn btn-sm btn-outline" onClick={() => setEditing((v) => !v)}>{editing ? 'Cerrar' : 'Cambiar'}</button>
          </div>
        )}
      </div>
      {editing && <OfficeHoursForm onDone={() => setEditing(false)} />}
      {me.isAdmin && <Link to="/admin" className="btn btn-outline btn-block" onClick={onClose}>Administrar cursos, docentes y familias</Link>}
      <section className="stack" aria-label="Notificaciones">
        <h3 style={{ fontSize: 16 }}>Notificaciones</h3>
        <NotificationSettings />
      </section>
      <details className="card pad">
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Cambiar contraseña</summary>
        <PasswordForm />
      </details>
      <button className="btn btn-outline btn-block" onClick={logout}>{IS_DEMO ? 'Cambiar de persona' : 'Cerrar sesión'}</button>
      {IS_DEMO && (
        <button className="link small" style={{ alignSelf: 'center' }} onClick={() => { if (window.confirm('¿Volver a los datos de ejemplo? Se borrarán tus cambios.')) resetDemo(); }}>Reiniciar la demostración</button>
      )}
    </Sheet>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const { busy, error, run } = useAction();
  return (
    <form className="stack" style={{ marginTop: 12 }} onSubmit={async (e) => {
      e.preventDefault();
      const ok = await run(() => api.put('/me/password', { current, password: next }), 'Contraseña actualizada');
      if (ok) { setCurrent(''); setNext(''); }
    }}>
      <div className="field"><label htmlFor="pw-cur">Contraseña actual</label>
        <input id="pw-cur" className="input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required /></div>
      <div className="field"><label htmlFor="pw-new">Contraseña nueva</label>
        <input id="pw-new" className="input" type="password" autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} required />
        <span className="hint">Al menos 8 caracteres.</span></div>
      {error && <div className="form-error">{error}</div>}
      <button className="btn btn-primary" disabled={busy}>Guardar contraseña</button>
    </form>
  );
}
