import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import type { AccessLink, AdminCourse, AdminGuardian, AdminStudent, AdminSummary } from '../../api/types';
import { Icon } from '../../components/icons';
import { Avatar, Empty, ErrorBox, Loading, Sheet, useAction } from '../../components/ui';
import { useApi } from '../../lib/useApi';
import { AccessLinkButton, AccessLinkSheet, RELATIONSHIPS, StatusBadge } from './shared';

export function Familias({ onChanged }: { summary: AdminSummary; onChanged: () => void }) {
  const { data: courses } = useApi<AdminCourse[]>('/admin/courses');
  const [course, setCourse] = useState('');
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [inactive, setInactive] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDebounced(q), 300); return () => clearTimeout(t); }, [q]);
  const params = new URLSearchParams({ ...(course && { course_id: course }), ...(debounced && { q: debounced }), ...(inactive && { inactive: '1' }) });
  const { data, error, loading, reload } = useApi<AdminStudent[]>(`/admin/students?${params}`);
  const [editing, setEditing] = useState<AdminStudent | 'new' | null>(null);
  const refresh = () => { reload(); onChanged(); };

  if (courses && courses.length === 0) {
    return <div className="card"><Empty title="Primero crea los cursos">Ve a la pestaña «Cursos» o importa tu lista desde Excel: los cursos se crean solos.</Empty></div>;
  }

  return (
    <section className="stack">
      <div className="toolbar">
        <label className="sr-only" htmlFor="f-course">Curso</label>
        <select id="f-course" className="select" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Todos los cursos</option>
          {courses?.map((c) => <option key={c.id} value={c.id}>{c.label} ({c.students})</option>)}
        </select>
        <label className="sr-only" htmlFor="f-q">Buscar</label>
        <input id="f-q" className="input" placeholder="Buscar estudiante, representante o correo" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-primary" onClick={() => setEditing('new')}><Icon name="plus" size={20} />Agregar estudiante</button>
      </div>
      <label className="switch-row small"><input type="checkbox" checked={inactive} onChange={(e) => setInactive(e.target.checked)} />Mostrar estudiantes retirados</label>

      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && data.length === 0 && <div className="card"><Empty title={debounced || course ? 'Sin resultados' : 'Aún no hay estudiantes'}>Agrégalos uno por uno o impórtalos desde Excel.</Empty></div>}
      {data && data.length > 0 && <p className="small muted">{data.length === 500 ? 'Mostrando los primeros 500. Filtra por curso para ver el resto.' : `${data.length} estudiantes`}</p>}

      {data?.map((s) => (
        <article key={s.id} className="card entity" style={s.active ? undefined : { opacity: 0.6 }}>
          <div className="entity-head">
            <div className="grow">
              <div className="item-title">{s.full_name}</div>
              <div className="item-sub">{s.course_label}{s.active ? '' : ', retirado'}</div>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => setEditing(s)}>Editar</button>
          </div>
          {s.guardians.length === 0 && <div className="form-error small">Sin representante: no recibirá comunicados. Agrégalo con «Editar».</div>}
          {s.guardians.map((g) => (
            <div key={g.id} className="person-line">
              <Avatar name={g.full_name} size="sm" />
              <div className="who">
                <div style={{ fontWeight: 600 }}>{g.full_name}{g.relationship ? <span className="muted" style={{ fontWeight: 400 }}>, {g.relationship.toLowerCase()}</span> : null}</div>
                <div className="item-sub" style={{ wordBreak: 'break-all' }}>{g.email}{g.phone ? `, ${g.phone}` : ''}</div>
              </div>
              <StatusBadge status={g.status} />
              <AccessLinkButton person={g} disabled={g.status === 'inactiva'} />
            </div>
          ))}
        </article>
      ))}

      {editing === 'new' && courses && (
        <NewStudentSheet courses={courses} defaultCourse={course} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />
      )}
      {editing && editing !== 'new' && courses && (
        <EditStudentSheet student={editing} courses={courses} onClose={() => setEditing(null)} onSaved={refresh} />
      )}
    </section>
  );
}

interface GuardianDraft { full_name: string; email: string; relationship: string; phone: string }
const emptyGuardian = (): GuardianDraft => ({ full_name: '', email: '', relationship: 'Madre', phone: '' });

function GuardianFields({ g, onChange, idx }: { g: GuardianDraft; onChange: (g: GuardianDraft) => void; idx: number }) {
  return (
    <div className="stack" style={{ gap: 10 }}>
      <div className="grid-2">
        <div className="field"><label htmlFor={`g-name-${idx}`}>Nombre completo</label>
          <input id={`g-name-${idx}`} className="input" value={g.full_name} onChange={(e) => onChange({ ...g, full_name: e.target.value })} required minLength={3} /></div>
        <div className="field"><label htmlFor={`g-rel-${idx}`}>Parentesco</label>
          <select id={`g-rel-${idx}`} className="select" value={g.relationship} onChange={(e) => onChange({ ...g, relationship: e.target.value })}>
            {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
          </select></div>
      </div>
      <div className="grid-2">
        <div className="field"><label htmlFor={`g-mail-${idx}`}>Correo personal</label>
          <input id={`g-mail-${idx}`} className="input" type="email" inputMode="email" autoCapitalize="off" value={g.email} onChange={(e) => onChange({ ...g, email: e.target.value })} required /></div>
        <div className="field"><label htmlFor={`g-phone-${idx}`}>Celular (opcional)</label>
          <input id={`g-phone-${idx}`} className="input" type="tel" inputMode="tel" value={g.phone} onChange={(e) => onChange({ ...g, phone: e.target.value })} placeholder="09…" /></div>
      </div>
    </div>
  );
}

function NewStudentSheet({ courses, defaultCourse, onClose, onSaved }: { courses: AdminCourse[]; defaultCourse: string; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState(defaultCourse || courses[0]?.id || '');
  const [guardians, setGuardians] = useState<GuardianDraft[]>([emptyGuardian()]);
  const [invite, setInvite] = useState(true);
  const [links, setLinks] = useState<{ person: { full_name: string; email: string }; link: AccessLink } | null>(null);
  const { busy, error, run } = useAction();

  if (links) return <AccessLinkSheet person={links.person} link={links.link} onClose={onSaved} />;

  return (
    <Sheet title="Agregar estudiante" onClose={onClose}>
      <form className="stack" onSubmit={async (e) => {
        e.preventDefault();
        const r = await run(() => api.post<{ id: string; invites: AccessLink[] }>('/admin/students', {
          full_name: name, course_id: course, send_invites: invite,
          guardians: guardians.map((g) => ({ ...g, phone: g.phone || null })),
        }), 'Estudiante agregado');
        if (!r) return;
        if (r.invites.length && !r.invites[0].email_sent) setLinks({ person: guardians[0], link: r.invites[0] });
        else onSaved();
      }}>
        <div className="grid-2">
          <div className="field"><label htmlFor="s-name">Nombre completo del estudiante</label>
            <input id="s-name" className="input" value={name} onChange={(e) => setName(e.target.value)} required minLength={3} /></div>
          <div className="field"><label htmlFor="s-course">Curso</label>
            <select id="s-course" className="select" value={course} onChange={(e) => setCourse(e.target.value)} required>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select></div>
        </div>
        {guardians.map((g, i) => (
          <fieldset key={i} className="card pad stack" style={{ margin: 0 }}>
            <legend className="field-label" style={{ padding: '0 6px' }}>Representante {guardians.length > 1 ? i + 1 : ''}</legend>
            <GuardianFields g={g} idx={i} onChange={(ng) => setGuardians((gs) => gs.map((x, j) => (j === i ? ng : x)))} />
            {i > 0 && <button type="button" className="link small" style={{ alignSelf: 'flex-start' }} onClick={() => setGuardians((gs) => gs.filter((_, j) => j !== i))}>Quitar</button>}
          </fieldset>
        ))}
        {guardians.length < 3 && (
          <button type="button" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setGuardians((gs) => [...gs, { ...emptyGuardian(), relationship: 'Padre' }])}>
            <Icon name="plus" size={16} />Otro representante
          </button>
        )}
        <p className="hint">Si el correo ya existe (por ejemplo, hermanos), se usa la misma cuenta del representante.</p>
        <label className="switch-row"><input type="checkbox" checked={invite} onChange={(e) => setInvite(e.target.checked)} />
          <span>Enviar ahora el correo de invitación<br /><span className="hint">Desmárcalo si prefieres invitar a todos juntos más tarde.</span></span></label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="btn btn-primary" disabled={busy}>Guardar estudiante</button>
      </form>
    </Sheet>
  );
}

function EditStudentSheet({ student, courses, onClose, onSaved }: { student: AdminStudent; courses: AdminCourse[]; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(student.full_name);
  const [course, setCourse] = useState(student.course_id);
  const [guardians, setGuardians] = useState(student.guardians);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<GuardianDraft>({ ...emptyGuardian(), relationship: 'Padre' });
  const [editingG, setEditingG] = useState<AdminGuardian | null>(null);
  const { busy, error, run } = useAction();

  const save = async () => {
    const ok = await run(() => api.patch(`/admin/students/${student.id}`, { full_name: name, course_id: course }).then(() => true), 'Cambios guardados');
    if (ok) onSaved();
  };

  return (
    <Sheet title={student.full_name} onClose={onClose}>
      <div className="grid-2">
        <div className="field"><label htmlFor="e-name">Nombre completo</label>
          <input id="e-name" className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label htmlFor="e-course">Curso</label>
          <select id="e-course" className="select" value={course} onChange={(e) => setCourse(e.target.value)}>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select></div>
      </div>
      <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={busy || (name === student.full_name && course === student.course_id)} onClick={save}>Guardar cambios</button>

      <section className="stack">
        <h3 style={{ fontSize: 16 }}>Representantes</h3>
        {guardians.map((g) => editingG?.id === g.id ? (
          <GuardianEditor key={g.id} g={g} onCancel={() => setEditingG(null)} onSaved={(ng) => { setGuardians((gs) => gs.map((x) => (x.id === ng.id ? ng : x))); setEditingG(null); onSaved(); }} />
        ) : (
          <div key={g.id} className="person-line">
            <div className="who">
              <div style={{ fontWeight: 600 }}>{g.full_name}{g.relationship ? `, ${g.relationship.toLowerCase()}` : ''}</div>
              <div className="item-sub" style={{ wordBreak: 'break-all' }}>{g.email}</div>
            </div>
            <StatusBadge status={g.status} />
            <div className="row-gap">
              <button className="btn btn-sm btn-quiet" onClick={() => setEditingG(g)}>Editar</button>
              <button className="btn btn-sm btn-quiet" disabled={busy} onClick={async () => {
                if (!window.confirm(`¿Quitar a ${g.full_name} como representante de ${student.full_name}? Su cuenta sigue existiendo.`)) return;
                const ok = await run(() => api.del(`/admin/students/${student.id}/guardians/${g.id}`).then(() => true), 'Representante quitado');
                if (ok) { setGuardians((gs) => gs.filter((x) => x.id !== g.id)); onSaved(); }
              }}>Quitar</button>
            </div>
          </div>
        ))}
        {adding ? (
          <form className="card pad stack" onSubmit={async (e) => {
            e.preventDefault();
            const r = await run(() => api.post<{ id: string }>(`/admin/students/${student.id}/guardians`, { ...draft, phone: draft.phone || null, send_invite: true }), 'Representante agregado');
            if (r) { setAdding(false); onSaved(); onClose(); }
          }}>
            <GuardianFields g={draft} idx={9} onChange={setDraft} />
            <div className="row-gap">
              <button className="btn btn-primary btn-sm" disabled={busy}>Agregar y enviar invitación</button>
              <button type="button" className="btn btn-quiet btn-sm" onClick={() => setAdding(false)}>Cancelar</button>
            </div>
          </form>
        ) : (
          <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setAdding(true)}><Icon name="plus" size={16} />Agregar representante</button>
        )}
      </section>

      {error && <div className="form-error" role="alert">{error}</div>}

      <div className="card pad stack" style={{ gap: 8 }}>
        {student.active ? (
          <>
            <div className="small muted">Si el estudiante se retira, deja de estar en las listas y sus representantes ya no reciben comunicados de su curso. El historial se conserva.</div>
            <button className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={async () => {
              if (!window.confirm(`¿Retirar a ${student.full_name}?`)) return;
              const ok = await run(() => api.patch(`/admin/students/${student.id}`, { active: false }).then(() => true), 'Estudiante retirado');
              if (ok) { onSaved(); onClose(); }
            }}>Retirar estudiante</button>
          </>
        ) : (
          <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={async () => {
            const ok = await run(() => api.patch(`/admin/students/${student.id}`, { active: true }).then(() => true), 'Estudiante reincorporado');
            if (ok) { onSaved(); onClose(); }
          }}>Reincorporar estudiante</button>
        )}
      </div>
    </Sheet>
  );
}

function GuardianEditor({ g, onCancel, onSaved }: { g: AdminGuardian; onCancel: () => void; onSaved: (g: AdminGuardian) => void }) {
  const [f, setF] = useState({ full_name: g.full_name, email: g.email, phone: g.phone ?? '' });
  const { busy, error, run } = useAction();
  return (
    <form className="card pad stack" onSubmit={async (e) => {
      e.preventDefault();
      const ok = await run(() => api.patch(`/admin/users/${g.id}`, { ...f, phone: f.phone || null }).then(() => true), 'Representante actualizado');
      if (ok) onSaved({ ...g, ...f, phone: f.phone || null });
    }}>
      <div className="field"><label htmlFor="ge-name">Nombre completo</label>
        <input id="ge-name" className="input" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} required /></div>
      <div className="grid-2">
        <div className="field"><label htmlFor="ge-mail">Correo</label>
          <input id="ge-mail" className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required /></div>
        <div className="field"><label htmlFor="ge-phone">Celular</label>
          <input id="ge-phone" className="input" type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
      </div>
      <p className="hint">Si cambias el correo, cambia también su usuario para ingresar.</p>
      {error && <div className="form-error">{error}</div>}
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" disabled={busy}>Guardar</button>
        <button type="button" className="btn btn-quiet btn-sm" onClick={onCancel}>Cancelar</button>
        <span className="grow" />
        <button type="button" className="btn btn-danger btn-sm" disabled={busy} onClick={async () => {
          const deactivate = g.status !== 'inactiva';
          if (deactivate && !window.confirm(`¿Desactivar la cuenta de ${g.full_name}? No podrá ingresar ni recibirá avisos.`)) return;
          const ok = await run(() => api.patch(`/admin/users/${g.id}`, { active: !deactivate }).then(() => true), deactivate ? 'Cuenta desactivada' : 'Cuenta reactivada');
          if (ok) onSaved({ ...g, status: deactivate ? 'inactiva' : 'invitada' });
        }}>{g.status === 'inactiva' ? 'Reactivar cuenta' : 'Desactivar cuenta'}</button>
      </div>
    </form>
  );
}
