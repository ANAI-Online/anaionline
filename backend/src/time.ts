// Ecuador continental: UTC−5 todo el año (sin horario de verano).
const OFFSET_H = -5;

export interface OfficeHours {
  days: number[]; // 1 = lunes … 7 = domingo
  start: string; // "08:00"
  end: string; // "16:00"
}

/** Convierte fecha y hora locales de Ecuador a Date (UTC). */
export function localToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh - OFFSET_H, mm));
}

/** Día (1–7) y minutos del día en hora de Ecuador. */
function localParts(at: Date) {
  const local = new Date(at.getTime() + OFFSET_H * 3600_000);
  const dow = local.getUTCDay() === 0 ? 7 : local.getUTCDay();
  return { dow, minutes: local.getUTCHours() * 60 + local.getUTCMinutes(), local };
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const dayFmt = new Intl.DateTimeFormat('es-EC', { timeZone: 'America/Guayaquil', weekday: 'long', day: 'numeric', month: 'long' });
const timeFmt = new Intl.DateTimeFormat('es-EC', { timeZone: 'America/Guayaquil', hour: '2-digit', minute: '2-digit', hour12: false });
/** "lunes 21 de septiembre" */
export const fmtDay = (d: Date | string) => dayFmt.format(new Date(d)).replace(',', '');
/** "18:00" */
export const fmtTime = (d: Date | string) => timeFmt.format(new Date(d));

export function withinOfficeHours(oh: OfficeHours | null | undefined, at = new Date()) {
  if (!oh) return true;
  const { dow, minutes } = localParts(at);
  return oh.days.includes(dow) && minutes >= toMin(oh.start) && minutes < toMin(oh.end);
}

/** Fecha local "YYYY-MM-DD" desplazada n días desde hoy. */
export function localDate(daysFromToday = 0) {
  const { local } = localParts(new Date());
  local.setUTCDate(local.getUTCDate() + daysFromToday);
  return local.toISOString().slice(0, 10);
}

/** Siguiente día hábil (lun–vie) a partir de hoy + n. */
export function nextWeekday(daysFromToday: number) {
  for (let i = daysFromToday; ; i++) {
    const d = localDate(i);
    const dow = new Date(`${d}T12:00:00Z`).getUTCDay();
    if (dow !== 0 && dow !== 6) return d;
  }
}
