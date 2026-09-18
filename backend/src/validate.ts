import { z } from 'zod';
import { badRequest } from './errors.js';

export function parse<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  const r = schema.safeParse(data);
  if (!r.success) {
    const i = r.error.issues[0];
    const field = i.path.join('.');
    throw badRequest(field ? `Revisa el campo «${field}»: ${i.message}` : i.message);
  }
  return r.data;
}

export const uuid = z.string().regex(/^[0-9a-f-]{36}$/i, 'identificador inválido');
export const isoDate = z
  .string()
  .refine((s) => !Number.isNaN(Date.parse(s)), 'fecha inválida')
  .transform((s) => new Date(s));
export const localDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'usa el formato AAAA-MM-DD');
export const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'usa el formato HH:MM');
export const attachment = z.object({ name: z.string().min(1).max(200), url: z.string().url() });
