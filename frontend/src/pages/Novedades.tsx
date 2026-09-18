import { useState } from 'react';
import { api } from '../api/client';
import type { Post } from '../api/types';
import { useMe } from '../auth';
import { Icon } from '../components/icons';
import { Avatar, Empty, ErrorBox, Loading, useAction } from '../components/ui';
import { dayLabel, displayName, fmtTime, plural } from '../lib/format';
import { useApi } from '../lib/useApi';

export function Novedades() {
  const me = useMe();
  const { data, setData, error, loading, reload } = useApi<Post[]>('/posts');
  const [filter, setFilter] = useState<string>('todo');

  const courseFilters = me.isFamily
    ? [...new Map(me.children.map((c) => [c.course_id, c.course_label])).entries()]
    : me.courses.map((c) => [c.id, c.label] as const);
  const shown = (data ?? []).filter((p) =>
    filter === 'todo' ? true : filter === 'colegio' ? p.course_id === null : p.course_id === filter,
  );

  async function react(p: Post) {
    setData((d) => d?.map((x) => (x.id === p.id ? { ...x, reacted: !x.reacted, reactions: x.reactions + (x.reacted ? -1 : 1) } : x)));
    try {
      const r = await api.post<{ reacted: boolean; reactions: number }>(`/posts/${p.id}/react`);
      setData((d) => d?.map((x) => (x.id === p.id ? { ...x, ...r } : x)));
    } catch { reload(); }
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Novedades</h1>
          <p className="page-sub">{me.isFamily ? 'Lo que pasa en el colegio y en el aula.' : 'Comparte momentos y avisos breves con las familias.'}</p>
        </div>
      </div>

      {me.isStaff && <Composer onPosted={(p) => setData((d) => [p, ...(d ?? [])])} />}

      <div className="row-gap" role="group" aria-label="Filtrar">
        <button className={`chip ${filter === 'todo' ? 'on' : ''}`} aria-pressed={filter === 'todo'} onClick={() => setFilter('todo')}>Todo</button>
        <button className={`chip ${filter === 'colegio' ? 'on' : ''}`} aria-pressed={filter === 'colegio'} onClick={() => setFilter('colegio')}>Colegio</button>
        {courseFilters.map(([id, label]) => (
          <button key={id} className={`chip ${filter === id ? 'on' : ''}`} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
        ))}
      </div>

      {error && <ErrorBox message={error} onRetry={reload} />}
      {loading && <Loading rows={2} />}
      {data && shown.length === 0 && <div className="card"><Empty title="No hay publicaciones aquí todavía" /></div>}

      {shown.map((p) => (
        <article key={p.id} className="card post">
          <div className="post-head">
            <Avatar name={p.author.full_name} tone={p.author.role === 'admin' ? 'ink' : 'plum'} />
            <div className="grow">
              <div className="item-title">{p.author.role === 'admin' ? me.user.school_name : displayName(p.author)}</div>
              <div className="item-sub">{p.audience_label}, {dayLabel(p.created_at).toLowerCase()} a las {fmtTime(p.created_at)}</div>
            </div>
          </div>
          <p className="post-body">{p.body}</p>
          {p.images.length > 0 && (
            <div className="post-images">{p.images.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}</div>
          )}
          <div className="post-foot">
            <button className="like" aria-pressed={p.reacted} onClick={() => react(p)}>
              <Icon name="heart" size={18} fill={p.reacted ? 'currentColor' : 'none'} />
              {p.reacted ? 'Te gusta' : 'Me gusta'}{p.reactions > 0 ? ` · ${p.reactions}` : ''}
            </button>
            {me.isStaff && <span className="small muted row-gap" style={{ gap: 4 }}><Icon name="eye" size={16} />Vista por {plural(p.views, 'familia', 'familias')}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

function Composer({ onPosted }: { onPosted: (p: Post) => void }) {
  const me = useMe();
  const [body, setBody] = useState('');
  const [course, setCourse] = useState<string>(me.isAdmin ? '' : me.courses[0]?.id ?? '');
  const { busy, error, run } = useAction();

  return (
    <form className="card pad stack" onSubmit={async (e) => {
      e.preventDefault();
      const p = await run(() => api.post<Post>('/posts', { body, course_id: course || null }), 'Publicado');
      if (p) { onPosted(p); setBody(''); }
    }}>
      <div className="field">
        <label htmlFor="post-body">Nueva publicación</label>
        <textarea id="post-body" className="textarea" style={{ minHeight: 90 }} placeholder="¿Qué quieres contar a las familias?"
          value={body} onChange={(e) => setBody(e.target.value)} maxLength={3000} />
      </div>
      <div className="row-gap">
        <label htmlFor="post-course" className="sr-only">Para</label>
        <select id="post-course" className="select" style={{ width: 'auto', minWidth: 200 }} value={course} onChange={(e) => setCourse(e.target.value)}>
          {me.isAdmin && <option value="">Todo el colegio</option>}
          {me.courses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <span className="grow" />
        <button className="btn btn-primary" disabled={busy || !body.trim()}>Publicar</button>
      </div>
      <span className="hint">Por ahora solo texto. Las fotos llegan en la siguiente fase, con el consentimiento de los representantes.</span>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}
