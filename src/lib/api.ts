const API = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1';
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, { ...init, credentials: 'include', headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) } });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.success) throw new Error(body?.error?.message ?? `Request failed (${response.status})`);
  return body.data as T;
}
