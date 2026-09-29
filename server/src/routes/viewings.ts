import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'
import { HttpError } from '../utils/errors.js'

const router = Router()
const schema = z.object({ propertyId: z.string().min(1), name: z.string().trim().min(2).max(100), email: z.string().email(), phone: z.string().max(40).optional(), preferredDate: z.coerce.date(), preferredTime: z.string().min(3).max(40), message: z.string().max(3000).default('') })
router.post('/', async (req, res, next) => {
  try { const data = schema.parse(req.body); if (data.preferredDate <= new Date()) throw new HttpError(400, 'Choose a future viewing date'); if (!await prisma.property.findUnique({ where: { id: data.propertyId } })) throw new HttpError(404, 'Property not found'); const viewing = await prisma.viewingRequest.create({ data: { ...data, email: data.email.toLowerCase(), userId: req.user?.id } }); res.status(201).json({ viewing: { id: viewing.id, status: viewing.status, createdAt: viewing.createdAt } }) }
  catch (error) { next(error) }
})
router.get('/', requireAuth, async (req, res, next) => {
  try { const where = req.user!.role === 'ADMIN' ? {} : ['BUYER','RENTER'].includes(req.user!.role) ? { userId: req.user!.id } : { property: { OR: [{ ownerId: req.user!.id }, { agent: { userId: req.user!.id } }] } }; const viewings = await prisma.viewingRequest.findMany({ where, include: { property: { select: { id: true, title: true } } }, orderBy: { createdAt: 'desc' } }); res.json({ viewings }) }
  catch (error) { next(error) }
})
export default router
