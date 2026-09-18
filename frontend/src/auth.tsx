import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, setToken, setUnauthorizedHandler } from './api/client';
import type { Profile } from './api/types';
import { forgetDevice } from './lib/push';

const KEY = 'comunica.token';
const store = {
  get: () => { try { return localStorage.getItem(KEY); } catch { return null; } },
  set: (v: string | null) => {
    try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch { /* sin almacenamiento */ }
  },
};

interface AuthState {
  profile: Profile | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    forgetDevice();
    store.set(null);
    setToken(null);
    setProfile(null);
  }, []);

  const refresh = useCallback(async () => {
    setProfile(await api.get<Profile>('/me'));
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
    const saved = store.get();
    if (!saved) { setReady(true); return; }
    setToken(saved);
    refresh().catch(logout).finally(() => setReady(true));
  }, [logout, refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const { token } = await api.post<{ token: string }>('/auth/login', { email, password });
    setToken(token);
    store.set(token);
    await refresh();
  }, [refresh]);

  const loginWithToken = useCallback(async (token: string) => {
    setToken(token);
    store.set(token);
    await refresh();
  }, [refresh]);

  return <Ctx.Provider value={{ profile, ready, login, loginWithToken, logout, refresh }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth fuera de AuthProvider');
  return c;
}

/** Perfil garantizado (solo dentro de rutas protegidas). */
export function useMe() {
  const { profile } = useAuth();
  const p = profile!;
  return {
    ...p,
    role: p.user.role,
    isFamily: p.user.role === 'representante',
    isStaff: p.user.role !== 'representante',
    isAdmin: p.user.role === 'admin',
  };
}
