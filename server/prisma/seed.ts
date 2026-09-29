import { PrismaClient, PropertyType, TransactionType } from '@prisma/client'
import { randomBytes } from 'node:crypto'
import { ALL_PROPERTIES } from '../../src/data/properties.ts'

const prisma = new PrismaClient()
const agentEmails = new Map<string, string>()
const slug = (email: string) => email.split('@')[0].replace(/[^a-z0-9]+/g, '.')

async function main() {
  for (const property of ALL_PROPERTIES) {
    const email = `${slug(property.agent.email)}@nesta.local`
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) user = await prisma.user.create({ data: { name: property.agent.name, email, phone: property.agent.phone, role: 'AGENT', passwordHash: randomBytes(64).toString('hex') } })
    let profile = await prisma.agentProfile.findUnique({ where: { userId: user.id } })
    if (!profile) profile = await prisma.agentProfile.create({ data: { userId: user.id, agencyName: property.agent.agency, phone: property.agent.phone, photoUrl: property.agent.photo, verified: property.agent.verified, bio: `Fictional NESTA agent serving ${property.location.city}, Ghana.` } })
    agentEmails.set(property.agent.email.toLowerCase(), profile.id)
  }

  for (const p of ALL_PROPERTIES) {
    await prisma.property.upsert({
      where: { id: p.id },
      create: {
        id: p.id, title: p.title, description: p.description, price: p.price, currency: p.currency,
        transactionType: p.transactionType === 'buy' ? TransactionType.SALE : TransactionType.RENT,
        propertyType: p.propertyType.toUpperCase() as PropertyType,
        address: p.location.address, neighborhood: p.location.neighborhood, city: p.location.city,
        region: p.location.region, country: p.location.country, latitude: p.location.coordinates?.lat,
        longitude: p.location.coordinates?.lng, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
        parking: p.parking, area: p.area, images: p.images, amenities: p.amenities, featured: p.featured,
        verified: p.verified, furnished: p.furnished ?? false, availability: p.availability,
        yearBuilt: p.yearBuilt, views: p.views ?? 0, agentId: agentEmails.get(p.agent.email.toLowerCase()),
      },
      // Keep normal seed runs non-destructive, but apply requested demo image updates.
      update: p.id === 'prop-001' ? { images: p.images } : {},
    })
  }
  console.log(`Seeded ${ALL_PROPERTIES.length} properties and ${agentEmails.size} fictional agent profiles.`)
}

main().finally(() => prisma.$disconnect())
