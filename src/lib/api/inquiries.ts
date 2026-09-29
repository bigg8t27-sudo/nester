import { api } from './client'
export const inquiriesApi = {
  create: (data: { propertyId: string; name: string; email: string; phone?: string; message: string }) => api('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  list: async () => (await api<{ inquiries: Array<{ id: string; name: string; email: string; message: string; status: string; createdAt: string; property: { id: string; title: string } }> }>('/inquiries')).inquiries,
}
