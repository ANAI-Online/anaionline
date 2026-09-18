export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
export const notFound = (what = 'El recurso') => new HttpError(404, `${what} no existe o no tienes acceso.`);
export const forbidden = (msg = 'No tienes permiso para esta acción.') => new HttpError(403, msg);
export const badRequest = (msg: string) => new HttpError(400, msg);
export const conflict = (msg: string) => new HttpError(409, msg);
