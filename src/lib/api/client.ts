export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); this.name = 'ApiError' }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`/api${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...init.headers },
    })
  } catch {
    throw new ApiError('Cannot reach the NESTA API. Start the backend and ensure the database is configured.', 0)
  }
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new ApiError(payload.error || 'The request failed.', response.status)
  return payload as T
}
