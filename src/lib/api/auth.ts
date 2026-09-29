import { api } from './client'

export interface ApiUser { id: string; name: string; email: string; phone: string | null; role: 'BUYER'|'RENTER'|'AGENT'|'OWNER'|'ADMIN' }
export const authApi = {
  register: (data: { name: string; email: string; phone?: string; password: string; role: ApiUser['role'] }) => api<{ user: ApiUser }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string; remember: boolean }) => api<{ user: ApiUser }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => api<{ success: boolean }>('/auth/logout', { method: 'POST' }),
  me: () => api<{ user: ApiUser }>('/auth/me'),
}
