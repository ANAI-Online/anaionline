import { useState } from 'react';
import { api } from '../../api/client';
import type { ImportResult } from '../../api/types';
import { Icon } from '../../components/icons';
import { useAction, useToast } from '../../components/ui';
import { plural } from '../../lib/format';

const COLUMNS = ['Estudiante', 'Curso', 'Paralelo', 'Representante', 'Correo', 'Parentesco', 'Teléfono'];
const EXAMPLE = [
  ['Mateo Andrade Pérez', '5.º EGB', 'B', 'Carmen Pérez', 'carmen.perez@gmail.com', 'Madre', '0991234567'],
  ['Mateo Andrade Pérez', '5.º EGB', 'B', 'Luis Andrade', 'luis.andrade@hotmail.com', 'Padre', ''],
  ['Lucía Andrade Pérez', '2.º EGB', 'A', 'Carmen Pérez', 'carmen.perez@gmail.com', 'Madre', '0991234567'],
];

type Table = string[][];

/** CSV o texto copiado de Excel (tabulaciones). Detecta el separador y respeta comillas. */
function parseDelimited(text: string): Table {
  const first = text.split(/\r?\n/, 1)[0] ?? '';
  const sep = ['\t', ';', ','].map((s) => [s, first.split(s).length] as const).sort((a, b) => b[1] - a[1])[0][0];
  const rows: Table = [];
  let row: string[] = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === '') quoted = true;
    else if (ch === sep) { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

const toObjects = (t: Table) => {
  const [head, ...body] = t;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [String(h).trim(), String(r[i] ?? '').trim()])));
};

function downloadTemplate() {
  const csv = [COLUMNS, ...EXAMPLE].map((r) => r.map((c) => (/[;"\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(';')).join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'plantilla-estudiantes-representantes.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function Importar({ onDone }: { onDone: () => void }) {
  const toast = useToast();
  const [table, setTable] = useState<Table | null>(null);
  const [fileName, setFileName] = useState('');
  const [paste, setPaste] = useState('');
  const [preview, setPreview] = useState<ImportResult | null>(null);
  const [done, setDone] = useState<ImportResult | null>(null);
  const { busy, error, setError, run } = useAction();

  async function load(t: Table, name: string) {
    setTable(t); setFileName(name); setPreview(null); setDone(null); setError(null);
    if (t.length < 2) return setError('El archivo no tiene filas debajo de los encabezados.');
    const r = await run(() => api.post<ImportResult>('/admin/import', { rows: toObjects(t), dry_run: true }));
    if (r) setPreview(r);
  }

  async function onFile(f: File) {
    try {
      if (/\.xlsx$/i.test(f.name)) {
        const { readSheet } = await import('read-excel-file/browser');
        const data = await readSheet(f);
        await load(data.map((r) => r.map((c) => (c === null || c === undefined ? '' : String(c)))), f.name);
      } else {
        await load(parseDelimited(await f.text()), f.name);
      }
    } catch {
      setError('No pude leer el archivo. Guárdalo como Excel (.xlsx) o CSV e intenta de nuevo.');
    }
  }

  const reset = () => { setTable(null); setPreview(null); setDone(null); setPaste(''); setFileName(''); };

  if (done) {
    return (
      <section className="card pad stack">
        <div className="all-clear"><Icon name="check" size={26} />Importación lista</div>
        <p>
          Se crearon {plural(done.students_new, 'estudiante', 'estudiantes')}, {plural(done.guardians_new, 'cuenta de representante', 'cuentas de representantes')}
          {done.courses_new ? ` y ${plural(done.courses_new, 'curso', 'cursos')}` : ''}.
          {done.students_existing ? ` ${plural(done.students_existing, 'estudiante ya existía', 'estudiantes ya existían')} y no se duplicaron.` : ''}
        </p>
        <p className="muted small">Las cuentas nuevas aún no reciben su invitación. Revisa la lista en «Estudiantes y familias» y, cuando estés lista o listo, envía las invitaciones.</p>
        <div className="row-gap">
          <button className="btn btn-primary" disabled={busy} onClick={async () => {
            const r = await run(() => api.post<{ queued: number }>('/admin/invite-pending'));
            if (r) { toast(`Enviando ${plural(r.queued, 'invitación', 'invitaciones')}`); onDone(); }
          }}>Enviar invitaciones ahora</button>
          <button className="btn btn-outline" onClick={reset}>Importar otro archivo</button>
        </div>
        {error && <div className="form-error">{error}</div>}
      </section>
    );
  }

  return (
    <section className="stack" style={{ gap: 18 }}>
      <div className="card pad stack">
        <h2 style={{ fontSize: 17 }}>Carga a todas las familias de una vez</h2>
        <p className="small" style={{ color: 'var(--ink-2)' }}>
          Usa una hoja de Excel con una fila por cada representante de cada estudiante. Si un estudiante tiene dos representantes, repite al estudiante en dos filas. Si una madre tiene dos hijos, repite su correo: se crea una sola cuenta.
        </p>
        <div className="table-wrap">
          <table className="nowrap-table" style={{ minWidth: 640, fontSize: 13.5 }}>
            <thead><tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{EXAMPLE.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c || '—'}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="hint">«Curso» acepta 5.º EGB, 5, Quinto, 1.º BGU, Primero de bachillerato o Inicial 2. Parentesco y teléfono son opcionales. Los cursos que no existan se crean solos.</p>
        <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} onClick={downloadTemplate}>Descargar plantilla</button>
      </div>

      <div className="card pad stack">
        <div className="field">
          <label htmlFor="imp-file">Sube el archivo (.xlsx o .csv)</label>
          <input id="imp-file" type="file" className="input" accept=".xlsx,.csv,.txt"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }} />
        </div>
        <div className="field">
          <label htmlFor="imp-paste">O pega aquí las celdas copiadas de Excel (con la fila de encabezados)</label>
          <textarea id="imp-paste" className="textarea" style={{ minHeight: 90, fontSize: 14 }} value={paste} onChange={(e) => setPaste(e.target.value)} />
          <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} disabled={!paste.trim() || busy}
            onClick={() => load(parseDelimited(paste), 'Texto pegado')}>Revisar lo pegado</button>
        </div>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}
      {busy && !preview && <p className="muted small">Revisando…</p>}

      {preview && table && (
        <div className="card pad stack">
          <h2 style={{ fontSize: 17 }}>Revisión de «{fileName}»</h2>
          <div className="legend">
            <span><strong>{preview.rows}</strong> filas válidas</span>
            <span><strong>{preview.students_new}</strong> estudiantes nuevos</span>
            <span><strong>{preview.guardians_new}</strong> representantes nuevos</span>
            {preview.courses_new > 0 && <span><strong>{preview.courses_new}</strong> cursos nuevos</span>}
            {preview.students_existing > 0 && <span><strong>{preview.students_existing}</strong> ya existían</span>}
          </div>
          {preview.errors.length > 0 ? (
            <>
              <div className="form-error">
                {plural(preview.errors.length, 'fila tiene un problema', 'filas tienen problemas')}. Corrígelas en tu Excel y vuelve a subirlo; nada se ha guardado todavía.
              </div>
              <div className="list error-list">
                {preview.errors.map((e, i) => (
                  <div key={i} className="item small"><span className="badge b-red">Fila {e.row}</span><span className="grow">{e.message}</span></div>
                ))}
              </div>
            </>
          ) : (
            <div className="row-gap">
              <button className="btn btn-primary" disabled={busy || preview.rows === 0} onClick={async () => {
                const r = await run(() => api.post<ImportResult>('/admin/import', { rows: toObjects(table), dry_run: false }), 'Importación lista');
                if (r) { setDone(r); onDone(); }
              }}>Importar {plural(preview.rows, 'fila', 'filas')}</button>
              <button className="btn btn-quiet" onClick={reset}>Cancelar</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
