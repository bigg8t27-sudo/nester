import type { Property as DbProperty } from '@prisma/client'

export function serializeProperty(row: DbProperty & { agent?: { id: string; agencyName: string; phone: string | null; photoUrl: string | null; verified: boolean; user: { name: string; email: string } } | null }) {
  const agent = row.agent
  return {
    id: row.id, title: row.title, description: row.description, price: Number(row.price), currency: row.currency,
    transactionType: row.transactionType === 'SALE' ? 'buy' : 'rent', propertyType: row.propertyType.toLowerCase(),
    location: { address: row.address, neighborhood: row.neighborhood, city: row.city, region: row.region, country: row.country,
      ...(row.latitude != null && row.longitude != null ? { coordinates: { lat: row.latitude, lng: row.longitude } } : {}) },
    images: row.images, bedrooms: row.bedrooms, bathrooms: row.bathrooms, parking: row.parking, area: row.area,
    amenities: row.amenities, featured: row.featured, verified: row.verified,
    agent: agent ? { id: agent.id, name: agent.user.name, phone: agent.phone || '', email: agent.user.email, photo: agent.photoUrl || '', agency: agent.agencyName, verified: agent.verified, listings: 0 }
      : { id: 'nesta-team', name: 'NESTA Team', phone: '', email: 'hello@nesta.local', photo: '', agency: 'NESTA', verified: false, listings: 0 },
    createdAt: row.createdAt.toISOString(), ...(row.yearBuilt ? { yearBuilt: row.yearBuilt } : {}), furnished: row.furnished, availability: row.availability || undefined, views: row.views,
  }
}
