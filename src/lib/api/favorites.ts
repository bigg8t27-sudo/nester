import type { Property } from '@/types'
import { api } from './client'
export const favoritesApi = {
  list: async () => (await api<{ favorites: Property[] }>('/favorites')).favorites,
  add: (id: string) => api(`/favorites/${encodeURIComponent(id)}`, { method: 'POST' }),
  remove: (id: string) => api(`/favorites/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
