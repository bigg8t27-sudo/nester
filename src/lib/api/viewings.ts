import { api } from './client'
export const viewingsApi = {
  create: (data: { propertyId: string; name: string; email: string; phone?: string; preferredDate: string; preferredTime: string; message: string }) => api('/viewings', { method: 'POST', body: JSON.stringify(data) }),
  list: async () => (await api<{ viewings: Array<{ id: string; name: string; email: string; preferredDate: string; preferredTime: string; message: string; status: string; createdAt: string; property: { id: string; title: string } }> }>('/viewings')).viewings,
}
