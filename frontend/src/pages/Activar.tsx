import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../auth';
import { Icon } from '../components/icons';
import { ErrorBox, Loading } from '../components/ui';
import { firstName } from '../lib/format';

/** Crear contraseña desde el enlace de invitación o de restablecimiento. */
export function Activar() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const nav = useNavigate();
  const { loginWithToken } = useAuth();
  const [info, setInfo] = useState<{ kind: string; full_name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.post<{ kind: string; full_name: string; email: string }>('/auth/token', { token })
      .then(setInfo).catch((e) => setError((e as Error).message));
  }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw !== pw2) return setError('Las contraseñas no coinciden.');
    setBusy(true); setError(null);
    try {
      const { token: jwt } = await api.post<{ token: string }>('/auth/set-password', { token, password: pw });
      await loginWithToken(jwt);
      nav('/', { replace: true });
    } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-mark">
          <span className="brand-tile" aria-hidden="true"><Icon name="brand" size={30} /></span>
          <div className="login-title">Anai Comunica</div>
        </div>
        {!info && !error && <Loading rows={1} />}
        {!info && error && (
          <div className="stack">
            <ErrorBox message={error} />
            <a href="/" className="btn btn-primary">Ir a ingresar</a>
          </div>
        )}
        {info && (
          <form className="card pad stack" onSubmit={submit}>
            <div>
              <h1 style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 600 }}>
                {info.kind === 'invitacion' ? `Hola, ${firstName(info.full_name)}` : 'Crea una contraseña nueva'}
              </h1>
              <p className="muted" style={{ marginTop: 6 }}>
                {info.kind === 'invitacion' ? 'Crea tu contraseña para entrar. Tu usuario es ' : 'Para la cuenta '}<strong>{info.email}</strong>.
              </p>
            </div>
            <div className="field"><label htmlFor="pw1">Contraseña</label>
              <input id="pw1" className="input" type={show ? 'text' : 'password'} autoComplete="new-password" minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} required />
              <span className="hint">Al menos 8 caracteres. Evita tu fecha de nacimiento o la de tus hijos.</span></div>
            <div className="field"><label htmlFor="pw2">Repite la contraseña</label>
              <input id="pw2" className="input" type={show ? 'text' : 'password'} autoComplete="new-password" minLength={8} value={pw2} onChange={(e) => setPw2(e.target.value)} required /></div>
            <label className="switch-row small"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />Mostrar contraseña</label>
            {error && <div className="form-error" role="alert">{error}</div>}
            <button className="btn btn-primary btn-block" disabled={busy}>{busy ? 'Guardando…' : 'Guardar y entrar'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
