import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { IS_DEMO } from './api/client';
import { AuthProvider, useAuth, useMe } from './auth';
import { Shell } from './components/Shell';
import { Loading, ToastProvider } from './components/ui';
import { Activar } from './pages/Activar';
import { Admin } from './pages/Admin';
import { Agenda } from './pages/Agenda';
import { ComunicadoDetalle, ComunicadosLista, NuevoComunicado, Seguimiento } from './pages/Comunicados';
import { Inicio } from './pages/Inicio';
import { Login } from './pages/Login';
import { Conversacion, MensajesLista } from './pages/Mensajes';
import { Novedades } from './pages/Novedades';
import { Moderacion, Panel } from './pages/Panel';

const Router = IS_DEMO ? HashRouter : BrowserRouter;

function AppRoutes() {
  const me = useMe();
  const home = me.isFamily ? <Inicio /> : <Navigate to={me.isAdmin ? '/panel' : '/comunicados'} replace />;
  const staffOnly = (el: React.ReactElement) => (me.isStaff ? el : <Navigate to="/" replace />);
  const adminOnly = (el: React.ReactElement) => (me.isAdmin ? el : <Navigate to="/" replace />);
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={home} />
        <Route path="comunicados" element={<ComunicadosLista />} />
        <Route path="comunicados/nuevo" element={staffOnly(<NuevoComunicado />)} />
        <Route path="comunicados/:id" element={me.isStaff ? <Seguimiento /> : <ComunicadoDetalle />} />
        <Route path="mensajes" element={<MensajesLista />} />
        <Route path="mensajes/:id" element={<Conversacion />} />
        <Route path="novedades" element={<Novedades />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="panel" element={adminOnly(<Panel />)} />
        <Route path="moderacion" element={adminOnly(<Moderacion />)} />
        <Route path="admin" element={adminOnly(<Admin />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function Gate() {
  const { profile, ready } = useAuth();
  const { pathname } = useLocation();
  if (pathname === '/activar' || pathname === '/restablecer') return <Activar />;
  if (!ready) return <div className="page"><Loading rows={2} /></div>;
  if (!profile) return <Login />;
  return <AppRoutes key={profile.user.id} />;
}

export function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Gate />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
