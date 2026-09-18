import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../api/client';

/** Carga datos de la API y permite recargarlos o ajustarlos localmente. */
export function useApi<T>(path: string | null, opts: { poll?: number } = {}) {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!path);
  const current = useRef(path);
  current.current = path;

  const reload = useCallback(async () => {
    if (!path) return;
    try {
      const d = await api.get<T>(path);
      if (current.current === path) { setData(d); setError(null); }
    } catch (e) {
      if (current.current === path) setError((e as Error).message);
    } finally {
      if (current.current === path) setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    setLoading(!!path);
    reload();
    if (!opts.poll || !path) return;
    const id = setInterval(reload, opts.poll);
    return () => clearInterval(id);
  }, [path, reload, opts.poll]);

  return { data, setData, error, loading, reload };
}
