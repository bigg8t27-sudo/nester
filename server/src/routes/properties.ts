import { Router } from 'express'
import { PropertyType, TransactionType, Role } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { HttpError } from '../utils/errors.js'
import { serializeProperty } from '../services/serializers.js'

const router = Router()
const imageUrlSchema = z.string().refine((value) => {
  try { new URL(value); return true } catch { return value.startsWith('/') && !value.startsWith('//') }
}, 'Image must be an absolute URL or a root-relative app path')
const inputSchema = z.object({ title: z.string().trim().min(5).max(180), description: z.string().trim().min(20), price: z.coerce.number().positive(), currency: z.enum(['GHS','USD','EUR','GBP']).default('GHS'), transactionType: z.enum(['SALE','RENT','LEASE']), propertyType: z.nativeEnum(PropertyType), address: z.string().max(250).default(''), neighborhood: z.string().min(2), city: z.string().min(2), region: z.string().min(2), country: z.string().default('Ghana'), bedrooms: z.coerce.number().int().min(0).default(0), bathrooms: z.coerce.number().int().min(0).default(0), parking: z.coerce.number().int().min(0).default(0), area: z.coerce.number().min(0).default(0), images: z.array(imageUrlSchema).default([]), amenities: z.array(z.string().max(80)).default([]), furnished: z.boolean().default(false), availability: z.string().max(100).optional(), yearBuilt: z.coerce.number().int().min(1800).max(2200).optional(), latitude: z.coerce.number().optional(), longitude: z.coerce.number().optional() })
const includes = { agent: { include: { user: true } } } as const

router.get('/', async (req, res, next) => {
  try {
    const search = z.object({
      page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(12),
      location: z.string().optional(), transactionType: z.enum(['SALE','RENT','LEASE']).optional(),
      propertyType: z.nativeEnum(PropertyType).optional(), minPrice: z.coerce.number().nonnegative().optional(),
      maxPrice: z.coerce.number().nonnegative().optional(), bedrooms: z.coerce.number().int().nonnegative().optional(),
      bathrooms: z.coerce.number().int().nonnegative().optional(), amenity: z.string().optional(), query: z.string().optional(),
      sort: z.enum(['newest','price-asc','price-desc','area-asc','area-desc']).default('newest'),
    }).parse(req.query)
    const { page, limit } = search
    const where: any = {}
    if (search.location) where.OR = ['city','neighborhood','region','address'].map((key) => ({ [key]: { contains: search.location, mode: 'insensitive' } }))
    if (search.transactionType) where.transactionType = search.transactionType
    if (search.propertyType) where.propertyType = search.propertyType
    if (search.minPrice !== undefined || search.maxPrice !== undefined) where.price = { ...(search.minPrice !== undefined ? { gte: search.minPrice } : {}), ...(search.maxPrice !== undefined ? { lte: search.maxPrice } : {}) }
    if (search.bedrooms !== undefined) where.bedrooms = { gte: search.bedrooms }
    if (search.bathrooms !== undefined) where.bathrooms = { gte: search.bathrooms }
    if (search.amenity) where.amenities = { hasEvery: search.amenity.split(',').filter(Boolean) }
    if (search.query) where.AND = [...(where.AND || []), { OR: [{ title: { contains: search.query, mode: 'insensitive' } }, { description: { contains: search.query, mode: 'insensitive' } }] }]
    const sort = search.sort
    const orderBy = sort === 'price-asc' ? { price: 'asc' as const } : sort === 'price-desc' ? { price: 'desc' as const } : sort === 'area-asc' ? { area: 'asc' as const } : sort === 'area-desc' ? { area: 'desc' as const } : { createdAt: 'desc' as const }
    const [rows, total] = await Promise.all([prisma.property.findMany({ where, include: includes, orderBy, skip: (page - 1) * limit, take: limit }), prisma.property.count({ where })])
    res.json({ properties: rows.map(serializeProperty), total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) { next(error) }
})

router.get('/mine', requireAuth, requireRole(Role.AGENT, Role.OWNER, Role.ADMIN), async (req, res, next) => {
  try {
    const profile = req.user!.role === Role.AGENT ? await prisma.agentProfile.findUnique({ where: { userId: req.user!.id } }) : null
    const where = req.user!.role === Role.ADMIN ? {} : { OR: [{ ownerId: req.user!.id }, ...(profile ? [{ agentId: profile.id }] : [])] }
    const properties = await prisma.property.findMany({ where, include: includes, orderBy: { createdAt: 'desc' } })
    res.json({ properties: properties.map(serializeProperty) })
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try { const property = await prisma.property.findUnique({ where: { id: String(req.params.id) }, include: includes }); if (!property) throw new HttpError(404, 'Property not found'); res.json({ property: serializeProperty(property) }) }
  catch (error) { next(error) }
})

router.post('/', requireAuth, requireRole(Role.AGENT, Role.OWNER, Role.ADMIN), async (req, res, next) => {
  try {
    const data = inputSchema.parse(req.body)
    const profile = req.user!.role === 'AGENT' ? await prisma.agentProfile.findUnique({ where: { userId: req.user!.id } }) : null
    const property = await prisma.property.create({ data: { ...data, price: data.price, featured: false, ownerId: req.user!.role === 'OWNER' ? req.user!.id : null, agentId: profile?.id }, include: includes })
    res.status(201).json({ property: serializeProperty(property) })
  } catch (error) { next(error) }
})

router.put('/:id', requireAuth, requireRole(Role.AGENT, Role.OWNER, Role.ADMIN), async (req, res, next) => {
  try {
    const data = inputSchema.partial().parse(req.body)
    const existing = await prisma.property.findUnique({ where: { id: String(req.params.id) } })
    if (!existing) throw new HttpError(404, 'Property not found')
    const profile = req.user!.role === 'AGENT' ? await prisma.agentProfile.findUnique({ where: { userId: req.user!.id } }) : null
    if (req.user!.role !== 'ADMIN' && existing.ownerId !== req.user!.id && existing.agentId !== profile?.id) throw new HttpError(403, 'You cannot edit this property')
    const property = await prisma.property.update({ where: { id: existing.id }, data, include: includes })
    res.json({ property: serializeProperty(property) })
  } catch (error) { next(error) }
})

router.delete('/:id', requireAuth, requireRole(Role.AGENT, Role.OWNER, Role.ADMIN), async (req, res, next) => {
  try {
    const existing = await prisma.property.findUnique({ where: { id: String(req.params.id) } })
    if (!existing) throw new HttpError(404, 'Property not found')
    const profile = req.user!.role === 'AGENT' ? await prisma.agentProfile.findUnique({ where: { userId: req.user!.id } }) : null
    if (req.user!.role !== 'ADMIN' && existing.ownerId !== req.user!.id && existing.agentId !== profile?.id) throw new HttpError(403, 'You cannot delete this property')
    await prisma.property.delete({ where: { id: existing.id } }); res.json({ success: true })
  } catch (error) { next(error) }
})
export default router
