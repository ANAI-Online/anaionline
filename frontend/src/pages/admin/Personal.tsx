import { useState } from 'react';
import { api } from '../../api/client';
import type { AccessLink, AdminCourse, AdminStaff } from '../../api/types';
import { useMe } from '../../auth';
import { Icon } from '../../components/icons';
import { Avatar, Empty, ErrorBox, Loading, Sheet, useAction } from '../../components/ui';
import { displayName, when } from '../../lib/format';
import { useApi } from '../../lib/useApi';
import { AccessLinkButton, AccessLinkSheet, StatusBadge, SUBJECTS, TITLES } from './shared';

export function Personal({ onChanged }: { onChanged: () => void }) {
  const { data, error, loading, reload } = useApi<AdminStaff[]>('/admin/staff');
  const { data: courses } = useApi<AdminCourse[]>('/admin/courses');
  const [editing, setEditing] = useState<AdminStaff | 'new' | null>(null);
  const refresh = () => { reload(); onChanged(); };

  return (
    <section className="stack">
      <div className="toolbar">
        <p className="muted small grow">La tutoría de cada curso se asigna en «Cursos». Aquí se asignan las materias.</p>
        <button className="btn btn-primary" onClick={() => setEditing('new')}><Icon name="plus" size={20} />Agregar docente</button>
      </div>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && data.length === 0 && <div className="card"><Empty title="Aún no hay docentes" /></div>}
      {data?.map((s) => (
        <article key={s.id} className="card entity" style={s.status === 'inactiva' ? { opacity: 0.6 } : undefined}>
          <div className="entity-head">
            <Avatar name={s.full_name} tone="plum" />
            <div className="grow" style={{ minWidth: 180 }}>
              <div className="item-title">{displayName(s)}</div>
              <div className="item-sub" style={{ wordBreak: 'break-all' }}>{s.email}</div>
            </div>
            <div className="row-gap">
              {s.role === 'admin' && <span className="badge b-plum">Dirección</span>}
              <StatusBadge status={s.status} />
            </div>
          </div>
          <div className="small" style={{ color: 'var(--ink-2)' }}>
            {s.tutor_of.length > 0 && <div>Tutoría: <strong>{s.tutor_of.map((t) => t.label).join(', ')}</strong></div>}
            {s.subjects.length > 0 && <div>{summarizeSubjects(s.subjects)}</div>}
            {s.tutor_of.length === 0 && s.subjects.length === 0 && s.role === 'docente' && <div className="muted">Sin cursos asignados todavía.</div>}
            {s.last_seen_at && <div className="muted">Último ingreso: {when(s.last_seen_at)}</div>}
          </div>
          <div className="row-gap">
            <button className="btn btn-sm btn-outline" onClick={() => setEditing(s)}>Editar y asignar materias</button>
            <AccessLinkButton person={s} disabled={s.status === 'inactiva'} />
          </div>
        </article>
      ))}
      {editing === 'new' && <NewStaffSheet onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />}
      {editing && editing !== 'new' && courses && (
        <EditStaffSheet staff={editing} courses={courses} onClose={() => setEditing(null)} onSaved={refresh} />
      )}
    </section>
  );
}

function summarizeSubjects(items: AdminStaff['subjects']) {
  const bySubject = new Map<string, string[]>();
  for (const it of items) bySubject.set(it.subject, [...(bySubject.get(it.subject) ?? []), it.label]);
  return [...bySubject.entries()].map(([sub, labels]) => `${sub} en ${labels.join(', ')}`).join('. ');
}

function NewStaffSheet({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({ title: 'Lcda.', full_name: '', email: '', role: 'docente' as 'docente' | 'admin', send_invite: true });
  const [link, setLink] = useState<AccessLink | null>(null);
  const { busy, error, run } = useAction();
  if (link) return <AccessLinkSheet person={f} link={link} onClose={onSaved} />;
  return (
    <Sheet title="Agregar docente" onClose={onClose}>
      <form className="stack" onSubmit={async (e) => {
        e.preventDefault();
        const r = await run(() => api.post<{ id: string; invite: AccessLink | null }>('/admin/staff', { ...f, title: f.title || null }), 'Cuenta creada');
        if (!r) return;
        if (r.invite && !r.invite.email_sent) setLink(r.invite);
        else onSaved();
      }}>
        <div className="row-form" style={{ gridTemplateColumns: '110px minmax(0, 1fr)' }}>
          <div className="field"><label htmlFor="st-title">Título</label>
            <select id="st-title" className="select" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })}>
              {TITLES.map((t) => <option key={t} value={t}>{t || 'Ninguno'}</option>)}
            </select></div>
          <div className="field"><label htmlFor="st-name">Nombre completo</label>
            <input id="st-name" className="input" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} required minLength={3} /></div>
        </div>
        <div className="field"><label htmlFor="st-mail">Correo institucional</label>
          <input id="st-mail" className="input" type="email" inputMode="email" autoCapitalize="off" placeholder="nombre.apellido@anai.edu.ec" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required /></div>
        <div className="field">
          <span className="field-label">Rol</span>
          <div className="option-cards">
            <button type="button" className="option-card" aria-pressed={f.role === 'docente'} onClick={() => setF({ ...f, role: 'docente' })}>
              <strong>Docente</strong><span>Escribe a las familias de sus cursos.</span></button>
            <button type="button" className="option-card" aria-pressed={f.role === 'admin'} onClick={() => setF({ ...f, role: 'admin' })}>
              <strong>Dirección</strong><span>Ve todo, escribe a todo el colegio y administra cuentas.</span></button>
          </div>
        </div>
        <label className="switch-row"><input type="checkbox" checked={f.send_invite} onChange={(e) => setF({ ...f, send_invite: e.target.checked })} />Enviar ahora el correo de invitación</label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="btn btn-primary" disabled={busy}>Crear cuenta</button>
      </form>
    </Sheet>
  );
}

function EditStaffSheet({ staff, courses, onClose, onSaved }: { staff: AdminStaff; courses: AdminCourse[]; onClose: () => void; onSaved: () => void }) {
  const me = useMe();
  const [f, setF] = useState({ title: staff.title ?? '', full_name: staff.full_name, email: staff.email, role: staff.role });
  const [items, setItems] = useState(staff.subjects.map((s) => ({ course_id: s.course_id, subject: s.subject })));
  const { busy, error, run } = useAction();
  const self = staff.id === me.user.id;

  return (
    <Sheet title={displayName(staff)} onClose={onClose}>
      <form className="stack" onSubmit={async (e) => {
        e.preventDefault();
        const ok = await run(() => api.patch(`/admin/users/${staff.id}`, { ...f, title: f.title || null }).then(() => true), 'Datos guardados');
        if (ok) onSaved();
      }}>
        <div className="row-form" style={{ gridTemplateColumns: '110px minmax(0, 1fr)' }}>
          <div className="field"><label htmlFor="se-title">Título</label>
            <select id="se-title" className="select" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })}>
              {[...new Set([...TITLES, f.title])].map((t) => <option key={t} value={t}>{t || 'Ninguno'}</option>)}
            </select></div>
          <div className="field"><label htmlFor="se-name">Nombre completo</label>
            <input id="se-name" className="input" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} required /></div>
        </div>
        <div className="field"><label htmlFor="se-mail">Correo</label>
          <input id="se-mail" className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required /></div>
        {!self && (
          <label className="switch-row"><input type="checkbox" checked={f.role === 'admin'} onChange={(e) => setF({ ...f, role: e.target.checked ? 'admin' : 'docente' })} />
            <span>Acceso de dirección<br /><span className="hint">Puede administrar cuentas y escribir a todo el colegio.</span></span></label>
        )}
        <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy}>Guardar datos</button>
      </form>

      <section className="stack">
        <h3 style={{ fontSize: 16 }}>Materias por curso</h3>
        {staff.tutor_of.length > 0 && <p className="small muted">Además es tutor o tutora de {staff.tutor_of.map((t) => t.label).join(', ')}.</p>}
        <datalist id="subjects">{SUBJECTS.map((s) => <option key={s} value={s} />)}</datalist>
        {items.map((it, i) => (
          <div key={i} className="row-form">
            <div className="field"><label htmlFor={`as-c-${i}`} className={i ? 'sr-only' : ''}>Curso</label>
              <select id={`as-c-${i}`} className="select" value={it.course_id} onChange={(e) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, course_id: e.target.value } : x)))}>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select></div>
            <div className="field"><label htmlFor={`as-s-${i}`} className={i ? 'sr-only' : ''}>Materia</label>
              <input id={`as-s-${i}`} className="input" list="subjects" value={it.subject} placeholder="Ej.: Matemática"
                onChange={(e) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, subject: e.target.value } : x)))} /></div>
            <button type="button" className="icon-btn" aria-label="Quitar materia" onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))}><Icon name="x" size={18} /></button>
          </div>
        ))}
        <div className="row-gap">
          <button type="button" className="btn btn-outline btn-sm" disabled={!courses.length}
            onClick={() => setItems((xs) => [...xs, { course_id: xs.at(-1)?.course_id ?? courses[0].id, subject: '' }])}>
            <Icon name="plus" size={16} />Agregar materia</button>
          <button type="button" className="btn btn-primary btn-sm" disabled={busy || items.some((x) => x.subject.trim().length < 2)} onClick={async () => {
            const ok = await run(() => api.put(`/admin/staff/${staff.id}/subjects`, { items }).then(() => true), 'Materias guardadas');
            if (ok) onSaved();
          }}>Guardar materias</button>
        </div>
      </section>

      {error && <div className="form-error" role="alert">{error}</div>}

      {!self && (
        <div className="card pad stack" style={{ gap: 8 }}>
          {staff.status === 'inactiva' ? (
            <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={async () => {
              const ok = await run(() => api.patch(`/admin/users/${staff.id}`, { active: true }).then(() => true), 'Cuenta reactivada');
              if (ok) { onSaved(); onClose(); }
            }}>Reactivar cuenta</button>
          ) : (
            <>
              <div className="small muted">Si deja la institución, desactiva su cuenta: no podrá ingresar y sus conversaciones quedan guardadas.</div>
              <button className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={async () => {
                if (!window.confirm(`¿Desactivar la cuenta de ${displayName(staff)}?`)) return;
                const ok = await run(() => api.patch(`/admin/users/${staff.id}`, { active: false }).then(() => true), 'Cuenta desactivada');
                if (ok) { onSaved(); onClose(); }
              }}>Desactivar cuenta</button>
            </>
          )}
        </div>
      )}
    </Sheet>
  );
}
