export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type Transport = (method: Method, path: string, body: unknown, token: string | null) => Promise<unknown>;

export const IS_DEMO = import.meta.env.VITE_DEMO === '1';
const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

const http: Transport = async (method, path, body, token) => {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'No hay conexión con el servidor. Revisa tu internet.');
  }
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new ApiError(res.status, data?.error ?? 'Algo falló. Intenta de nuevo.');
  return data;
};

let transport: Transport = http;
export const setTransport = (t: Transport) => { transport = t; };

let token: string | null = null;
let onUnauthorized: () => void = () => {};
export const setToken = (t: string | null) => { token = t; };
export const setUnauthorizedHandler = (fn: () => void) => { onUnauthorized = fn; };

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  try {
    return (await transport(method, path, body, token)) as T;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401 && token) onUnauthorized();
    throw e;
  }
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {}),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body ?? {}),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body ?? {}),
  del: <T = void>(path: string) => request<T>('DELETE', path),
};
