import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { api } from '../api/client';
import type { Conversation, Home, Report } from '../api/types';
import { useAuth, useMe } from '../auth';
import { displayName } from '../lib/format';
import { Icon, type IconName } from './icons';
import { Avatar } from './ui';
import { AccountSheet } from './AccountSheet';

interface Badges { comunicados: number; mensajes: number; moderacion: number }
const BadgeCtx = createContext<() => void>(() => {});
/** Pide a la barra de navegación que actualice sus contadores. */
export const useRefreshBadges = () => useContext(BadgeCtx);

interface NavItem { to: string; label: string; icon: IconName; badge?: keyof Badges; mobile?: boolean }

const FAMILY: NavItem[] = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/comunicados', label: 'Comunicados', icon: 'doc', badge: 'comunicados' },
  { to: '/mensajes', label: 'Mensajes', icon: 'chat', badge: 'mensajes' },
  { to: '/novedades', label: 'Novedades', icon: 'news' },
  { to: '/agenda', label: 'Agenda', icon: 'calendar' },
];
const TEACHER: NavItem[] = [
  { to: '/comunicados', label: 'Comunicados', icon: 'doc' },
  { to: '/mensajes', label: 'Mensajes', icon: 'chat', badge: 'mensajes' },
  { to: '/novedades', label: 'Novedades', icon: 'news' },
  { to: '/agenda', label: 'Agenda', icon: 'calendar' },
];
const ADMIN: NavItem[] = [
  { to: '/panel', label: 'Panel', icon: 'chart' },
  ...TEACHER,
  { to: '/moderacion', label: 'Moderación', icon: 'shield', badge: 'moderacion', mobile: false },
  { to: '/admin', label: 'Administración', icon: 'users', mobile: false },
];

const ROLE_LABEL = { admin: 'Dirección', docente: 'Docente', representante: 'Representante' };

export function Shell() {
  const me = useMe();
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const [account, setAccount] = useState(false);
  const [badges, setBadges] = useState<Badges>({ comunicados: 0, mensajes: 0, moderacion: 0 });
  const items = me.isFamily ? FAMILY : me.isAdmin ? ADMIN : TEACHER;
  const inChat = /^\/mensajes\/.+/.test(pathname);

  const refresh = useCallback(async () => {
    try {
      if (me.isFamily) {
        const h = await api.get<Home>('/home');
        setBadges({ comunicados: h.pending.length, mensajes: h.unread_messages, moderacion: 0 });
      } else {
        const cs = await api.get<Conversation[]>('/conversations');
        const reports = me.isAdmin ? await api.get<Report[]>('/reports') : [];
        setBadges({
          comunicados: 0,
          mensajes: cs.reduce((n, c) => n + c.unread, 0),
          moderacion: reports.filter((r) => r.status === 'pendiente').length,
        });
      }
    } catch { /* los contadores no son críticos */ }
  }, [me.isFamily, me.isAdmin]);

  useEffect(() => { refresh(); }, [refresh, pathname]);
  useEffect(() => {
    const id = setInterval(refresh, 45_000);
    return () => clearInterval(id);
  }, [refresh]);

  const count = (b?: keyof Badges) => (b ? badges[b] : 0);

  return (
    <BadgeCtx.Provider value={refresh}>
      <div className="app">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-name">Anai Comunica</div>
            <div className="brand-school">{me.user.school_name}</div>
          </div>
          <nav className="side-nav" aria-label="Principal">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.to === '/'} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
                <Icon name={it.icon} size={20} />
                {it.label}
                {count(it.badge) > 0 && <span className="count" aria-label={`${count(it.badge)} pendientes`}>{count(it.badge)}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="side-user">
            <button className="side-user-btn" onClick={() => setAccount(true)}>
              <Avatar name={me.user.full_name} size="sm" tone={me.isFamily ? undefined : 'plum'} />
              <span>
                <span className="name" style={{ display: 'block' }}>{displayName(me.user)}</span>
                <span className="role">{ROLE_LABEL[me.role]}</span>
              </span>
            </button>
            <button onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión"><Icon name="logout" size={20} /></button>
          </div>
        </aside>

        <main className="main" style={inChat ? { paddingBottom: 0 } : undefined}>
          {!inChat && (
            <div className="topbar">
              <span className="brand-name">Anai Comunica</span>
              <button className="topbar-user" onClick={() => setAccount(true)} aria-label="Tu cuenta">
                <Avatar name={me.user.full_name} size="sm" tone={me.isFamily ? undefined : 'plum'} />
              </button>
            </div>
          )}
          <Outlet />
        </main>

        {!inChat && (
          <nav className="tabbar" aria-label="Principal">
            {items.filter((it) => it.mobile !== false).map((it) => (
              <NavLink key={it.to} to={it.to} end={it.to === '/'} className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
                <Icon name={it.icon} />
                {it.label}
                {count(it.badge) > 0 && <span className="dot">{count(it.badge)}</span>}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
      {account && <AccountSheet onClose={() => setAccount(false)} />}
    </BadgeCtx.Provider>
  );
}
