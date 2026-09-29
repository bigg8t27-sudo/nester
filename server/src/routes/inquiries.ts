import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'
import { HttpError } from '../utils/errors.js'

const router = Router()
const schema = z.object({ propertyId: z.string().min(1), name: z.string().trim().min(2).max(100), email: z.string().email(), phone: z.string().max(40).optional(), message: z.string().trim().min(5).max(3000) })
router.post('/', async (req, res, next) => {
  try { const data = schema.parse(req.body); if (!await prisma.property.findUnique({ where: { id: data.propertyId } })) throw new HttpError(404, 'Property not found'); const inquiry = await prisma.inquiry.create({ data: { ...data, email: data.email.toLowerCase(), userId: req.user?.id } }); res.status(201).json({ inquiry: { id: inquiry.id, status: inquiry.status, createdAt: inquiry.createdAt } }) }
  catch (error) { next(error) }
})
router.get('/', requireAuth, async (req, res, next) => {
  try { const where = req.user!.role === 'ADMIN' ? {} : ['BUYER','RENTER'].includes(req.user!.role) ? { userId: req.user!.id } : { property: { OR: [{ ownerId: req.user!.id }, { agent: { userId: req.user!.id } }] } }; const inquiries = await prisma.inquiry.findMany({ where, include: { property: { select: { id: true, title: true } } }, orderBy: { createdAt: 'desc' } }); res.json({ inquiries }) }
  catch (error) { next(error) }
})
export default router
