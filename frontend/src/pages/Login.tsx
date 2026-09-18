import { useState } from 'react';
import { IS_DEMO } from '../api/client';
import { useAuth } from '../auth';
import { Icon } from '../components/icons';
import { api } from '../api/client';
import { Avatar, Sheet } from '../components/ui';
import { resetDemo } from '../lib/demoReset';

const DEMO_PEOPLE = [
  { email: 'carmen.andrade@demo.ec', name: 'Carmen Andrade', what: 'Representante de Mateo (5.º EGB B) y Lucía (2.º EGB A)' },
  { email: 'luis.torres@demo.ec', name: 'Luis Torres', what: 'Representante de Emilia (5.º EGB B), con una cita solicitada' },
  { email: 'andrea.ruiz@demo.ec', name: 'Andrea Ruiz', what: 'Docente, tutora de 5.º EGB B' },
  { email: 'jorge.salas@demo.ec', name: 'Jorge Salas', what: 'Docente de Ciencias Naturales, tutor de 7.º EGB A' },
  { email: 'direccion@demo.ec', name: 'Patricia Vera', what: 'Dirección: panel y administración' },
];

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  async function go(e: string, p: string) {
    setBusy(true);
    setError(null);
    try { await login(e, p); } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-mark">
          <span className="brand-tile" aria-hidden="true"><Icon name="brand" size={30} /></span>
          <div>
            <div className="login-title">Anai Comunica</div>
            <div className="muted">Comunicados, mensajes y agenda del colegio</div>
          </div>
        </div>

        {IS_DEMO && (
          <div className="stack">
            <div className="field-label">Entra a la demostración como:</div>
            <div className="demo-people">
              {DEMO_PEOPLE.map((p, i) => (
                <button key={p.email} className="demo-person" disabled={busy} onClick={() => go(p.email, 'comunica123')}>
                  <Avatar name={p.name} tone={i < 2 ? undefined : 'plum'} />
                  <span className="grow"><span className="item-title" style={{ display: 'block' }}>{p.name}</span><span className="item-sub">{p.what}</span></span>
                </button>
              ))}
            </div>
            <div className="muted small">Tus cambios se guardan en este navegador: puedes cerrar y seguir después, o entrar con otra persona para ver el otro lado.{' '}
              <button type="button" className="link small" style={{ padding: 0 }} onClick={() => { if (window.confirm('¿Volver a los datos de ejemplo? Se borrarán tus cambios.')) resetDemo(); }}>Reiniciar la demostración</button>
            </div>
          </div>
        )}

        <form className="card pad stack" onSubmit={(e) => { e.preventDefault(); go(email, password); }}>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" className="input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="btn btn-primary btn-block" disabled={busy}>{busy ? 'Ingresando…' : 'Ingresar'}</button>
          <button type="button" className="link" style={{ alignSelf: 'center' }} onClick={() => setForgot(true)}>¿Olvidaste tu contraseña o es tu primera vez?</button>
        </form>
        {forgot && <ForgotSheet initial={email} onClose={() => setForgot(false)} />}
      </div>
    </div>
  );
}

function ForgotSheet({ initial, onClose }: { initial: string; onClose: () => void }) {
  const [email, setEmail] = useState(initial);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <Sheet title="Recuperar el acceso" onClose={onClose}>
      {sent ? (
        <div className="stack">
          <p>Si <strong>{email}</strong> está registrado, en unos minutos te llegará un correo con un enlace para crear tu contraseña.</p>
          <p className="muted small">Revisa también la carpeta de spam o promociones. Si no llega, pide a la institución que revise tu correo registrado.</p>
          <button className="btn btn-primary" onClick={onClose}>Entendido</button>
        </div>
      ) : (
        <form className="stack" onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true); setError(null);
          try { await api.post('/auth/forgot', { email }); setSent(true); } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
        }}>
          <p className="muted small">Escribe el correo que registraste en la institución. Te enviaremos un enlace para crear una contraseña nueva.</p>
          <div className="field"><label htmlFor="fg-email">Correo electrónico</label>
            <input id="fg-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn btn-primary" disabled={busy}>Enviar enlace</button>
        </form>
      )}
    </Sheet>
  );
}
