import type { Property } from '@/types'
import { api } from './client'

export interface PropertyQuery { page?: number; limit?: number; location?: string; transactionType?: string; propertyType?: string; minPrice?: number | null; maxPrice?: number | null; bedrooms?: number | null; bathrooms?: number | null; amenity?: string; query?: string; sort?: string }
export const propertiesApi = {
  list: (query: PropertyQuery = {}) => {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => { if (value !== undefined && value !== null && value !== '') params.set(key, String(value)) })
    return api<{ properties: Property[]; total: number; page: number; limit: number; totalPages: number }>(`/properties?${params}`)
  },
  get: async (id: string) => (await api<{ property: Property }>(`/properties/${encodeURIComponent(id)}`)).property,
  create: async (data: Record<string, unknown>) => (await api<{ property: Property }>('/properties', { method: 'POST', body: JSON.stringify(data) })).property,
  update: async (id: string, data: Record<string, unknown>) => (await api<{ property: Property }>(`/properties/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) })).property,
  mine: async () => (await api<{ properties: Property[] }>('/properties/mine')).properties,
  delete: (id: string) => api(`/properties/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
