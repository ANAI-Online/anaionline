import { useState } from 'react';
import { api } from '../../api/client';
import type { AdminCourse, AdminStaff, AdminSummary } from '../../api/types';
import { Icon } from '../../components/icons';
import { Empty, ErrorBox, Loading, Sheet, useAction } from '../../components/ui';
import { displayName, plural } from '../../lib/format';
import { useApi } from '../../lib/useApi';

export function Cursos({ summary, onChanged }: { summary: AdminSummary; onChanged: () => void }) {
  const { data, error, loading, reload } = useApi<AdminCourse[]>('/admin/courses');
  const { data: staff } = useApi<AdminStaff[]>('/admin/staff');
  const [editing, setEditing] = useState<AdminCourse | 'new' | null>(null);
  const refresh = () => { reload(); onChanged(); };

  return (
    <section className="stack">
      <div className="toolbar">
        <p className="muted small grow">Cada curso tiene un tutor o tutora, que es el contacto principal de las familias.</p>
        <button className="btn btn-primary" onClick={() => setEditing('new')}><Icon name="plus" size={20} />Agregar curso</button>
      </div>
      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading />}
      {data && data.length === 0 && <div className="card"><Empty title="Aún no hay cursos">Créalos aquí o importa tu lista de estudiantes desde Excel.</Empty></div>}
      {data && data.length > 0 && (
        <div className="list">
          {data.map((c) => (
            <button key={c.id} className="item" onClick={() => setEditing(c)}>
              <div className="grow">
                <div className="item-title">{c.label}</div>
                <div className="item-sub">
                  {c.tutor ? `Tutoría: ${displayName(c.tutor)}` : <span style={{ color: 'var(--amber)', fontWeight: 600 }}>Sin tutor asignado</span>}
                </div>
                {c.teachers.length > 0 && (
                  <div className="item-sub">{c.teachers.map((t) => `${t.subject}: ${displayName(t)}`).join('. ')}</div>
                )}
              </div>
              <span className="badge b-gray">{plural(c.students, 'estudiante', 'estudiantes')}</span>
            </button>
          ))}
        </div>
      )}
      {editing && staff && (
        <CourseSheet course={editing === 'new' ? null : editing} grades={summary.grades}
          staff={staff.filter((s) => s.status !== 'inactiva')} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />
      )}
    </section>
  );
}

function CourseSheet({ course, grades, staff, onClose, onSaved }: {
  course: AdminCourse | null; grades: string[]; staff: AdminStaff[]; onClose: () => void; onSaved: () => void;
}) {
  const [f, setF] = useState({ grade: course?.grade ?? grades[2], parallel: course?.parallel ?? 'A', tutor_id: course?.tutor?.id ?? '' });
  const { busy, error, run } = useAction();

  return (
    <Sheet title={course ? course.label : 'Agregar curso'} onClose={onClose}>
      <form className="stack" onSubmit={async (e) => {
        e.preventDefault();
        const body = { grade: f.grade, parallel: f.parallel, tutor_id: f.tutor_id || null };
        const ok = await run(() => (course ? api.patch(`/admin/courses/${course.id}`, body) : api.post('/admin/courses', body)).then(() => true),
          course ? 'Curso actualizado' : 'Curso creado');
        if (ok) onSaved();
      }}>
        <div className="grid-2">
          <div className="field"><label htmlFor="c-grade">Grado</label>
            <select id="c-grade" className="select" value={f.grade} onChange={(e) => setF({ ...f, grade: e.target.value })}>
              {grades.map((g) => <option key={g}>{g}</option>)}
            </select></div>
          <div className="field"><label htmlFor="c-par">Paralelo</label>
            <input id="c-par" className="input" value={f.parallel} maxLength={2} onChange={(e) => setF({ ...f, parallel: e.target.value.toUpperCase() })} required /></div>
        </div>
        <div className="field"><label htmlFor="c-tutor">Tutor o tutora</label>
          <select id="c-tutor" className="select" value={f.tutor_id} onChange={(e) => setF({ ...f, tutor_id: e.target.value })}>
            <option value="">Sin asignar</option>
            {staff.map((s) => <option key={s.id} value={s.id}>{displayName(s)}</option>)}
          </select>
          {staff.length === 0 && <span className="hint">Primero agrega docentes en «Docentes y dirección».</span>}
        </div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="btn btn-primary" disabled={busy}>{course ? 'Guardar cambios' : 'Crear curso'}</button>
      </form>
      {course && (
        course.students === 0 ? (
          <button className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busy} onClick={async () => {
            if (!window.confirm(`¿Borrar ${course.label}?`)) return;
            const ok = await run(() => api.del(`/admin/courses/${course.id}`).then(() => true), 'Curso borrado');
            if (ok) onSaved();
          }}>Borrar curso</button>
        ) : <p className="hint">Para borrar este curso, primero mueve a sus {course.students} estudiantes a otro curso.</p>
      )}
    </Sheet>
  );
}
