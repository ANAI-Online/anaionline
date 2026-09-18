import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { initials } from '../lib/format';
import { Icon } from './icons';

export function Avatar({ name, tone, size }: { name: string; tone?: 'plum' | 'amber' | 'ink'; size?: 'sm' }) {
  return <span className={`avatar ${tone ?? ''} ${size ?? ''}`} aria-hidden="true">{initials(name)}</span>;
}

export function Loading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="stack" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: rows }, (_, i) => <div key={i} className="skeleton" />)}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="form-error row-gap" role="alert">
      <span className="grow">{message}</span>
      {onRetry && <button className="btn btn-sm btn-outline" onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export function Empty({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      {children && <span>{children}</span>}
      {action}
    </div>
  );
}

/** Hoja inferior en móvil, diálogo centrado en escritorio. */
export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('input, textarea, select, button:not(.sheet-close)');
    first?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);
  return (
    <div className="backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <div className="sheet-grip" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="icon-btn sheet-close" onClick={onClose} aria-label="Cerrar"><Icon name="x" size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const show = useCallback((m: string) => {
    setMsg(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div aria-live="polite">
        {msg && <div className="toast"><Icon name="check" size={18} />{msg}</div>}
      </div>
    </ToastCtx.Provider>
  );
}

/** Ejecuta una acción con estado de envío, error y aviso de éxito. */
export function useAction() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = useCallback(async <T,>(fn: () => Promise<T>, success?: string): Promise<T | undefined> => {
    setBusy(true);
    setError(null);
    try {
      const out = await fn();
      if (success) toast(success);
      return out;
    } catch (e) {
      setError((e as Error).message);
      return undefined;
    } finally {
      setBusy(false);
    }
  }, [toast]);
  return { busy, error, setError, run };
}

export function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; label: string;
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
