const TZ = 'America/Guayaquil';
const LOCALE = 'es-EC';

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, ...opts });
const dayLong = fmt({ weekday: 'long', day: 'numeric', month: 'long' });
const dayShort = fmt({ weekday: 'short', day: 'numeric', month: 'short' });
const time = fmt({ hour: '2-digit', minute: '2-digit', hour12: false });
const dateKeyF = fmt({ year: 'numeric', month: '2-digit', day: '2-digit' });

const clean = (s: string) => s.replace(/\./g, '').replace(',', '');

export const fmtDayLong = (iso: string) => dayLong.format(new Date(iso)).replace(',', '');
export const fmtDayShort = (iso: string) => clean(dayShort.format(new Date(iso)));
export const fmtTime = (iso: string) => time.format(new Date(iso));
export const fmtRange = (a: string, b: string) => `${fmtTime(a)} a ${fmtTime(b)}`;

/** "2026-09-17" en hora de Ecuador */
export const dateKey = (d: Date | string) => {
  const parts = dateKeyF.formatToParts(new Date(d));
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
};
export const todayKey = () => dateKey(new Date());
export const addDays = (key: string, n: number) => {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
/** Fecha y hora locales de Ecuador → ISO con zona. */
export const localIso = (date: string, hhmm: string) => `${date}T${hhmm}:00-05:00`;

export function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    dow: clean(fmt({ weekday: 'short' }).format(d)),
    day: fmt({ day: 'numeric' }).format(d),
    mon: clean(fmt({ month: 'short' }).format(d)),
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "Hoy", "Mañana", "Ayer" o "Jueves 24 de septiembre" */
export function dayLabel(iso: string) {
  const k = dateKey(iso);
  const t = todayKey();
  if (k === t) return 'Hoy';
  if (k === addDays(t, 1)) return 'Mañana';
  if (k === addDays(t, -1)) return 'Ayer';
  return cap(fmtDayLong(iso));
}

/** Para listas: "10:42", "Ayer", "12 sep" */
export function when(iso: string) {
  const k = dateKey(iso);
  const t = todayKey();
  if (k === t) return fmtTime(iso);
  if (k === addDays(t, -1)) return 'Ayer';
  return clean(fmt({ day: 'numeric', month: 'short' }).format(new Date(iso)));
}

export function deadlineText(iso: string) {
  if (new Date(iso) < new Date()) return `El plazo terminó el ${fmtDayLong(iso)}`;
  const d = dayLabel(iso);
  return d === 'Hoy' ? 'Responde hoy' : d === 'Mañana' ? 'Responde hasta mañana' : `Responde hasta el ${d.toLowerCase()}`;
}

const DAYS = ['', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
export function officeHoursText(oh: { days: number[]; start: string; end: string } | null | undefined) {
  if (!oh) return null;
  const d = [...oh.days].sort();
  const contiguous = d.every((x, i) => i === 0 || x === d[i - 1] + 1);
  const days = contiguous && d.length > 2 ? `${DAYS[d[0]]} a ${DAYS[d[d.length - 1]]}` : d.map((x) => DAYS[x]).join(', ');
  return `${days}, de ${oh.start} a ${oh.end}`;
}

export function withinOfficeHours(oh: { days: number[]; start: string; end: string } | null | undefined, at = new Date()) {
  if (!oh) return true;
  const local = new Date(at.getTime() - 5 * 3600_000);
  const dow = local.getUTCDay() === 0 ? 7 : local.getUTCDay();
  const hm = `${String(local.getUTCHours()).padStart(2, '0')}:${String(local.getUTCMinutes()).padStart(2, '0')}`;
  return oh.days.includes(dow) && hm >= oh.start && hm < oh.end;
}

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const displayName = (p: { full_name: string; title?: string | null }) =>
  p.title ? `${p.title} ${p.full_name}` : p.full_name;

export const firstName = (name: string) => name.split(' ')[0];

export const pct = (x: number | null) => (x === null ? '—' : `${Math.round(x * 100)} %`);
export const hours = (x: number | null) =>
  x === null ? '—' : x < 1 ? `${Math.round(x * 60)} min` : `${x.toFixed(1).replace('.', ',')} h`;

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
