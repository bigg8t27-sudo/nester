import { Router } from 'express'
import { prisma } from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'
import { HttpError } from '../utils/errors.js'
import { serializeProperty } from '../services/serializers.js'

const router = Router()
router.use(requireAuth)
router.get('/', async (req, res, next) => {
  try { const rows = await prisma.favorite.findMany({ where: { userId: req.user!.id }, include: { property: { include: { agent: { include: { user: true } } } } }, orderBy: { createdAt: 'desc' } }); res.json({ favorites: rows.map((row) => serializeProperty(row.property)) }) }
  catch (error) { next(error) }
})
router.post('/:propertyId', async (req, res, next) => {
  try { if (!await prisma.property.findUnique({ where: { id: req.params.propertyId } })) throw new HttpError(404, 'Property not found'); await prisma.favorite.upsert({ where: { userId_propertyId: { userId: req.user!.id, propertyId: req.params.propertyId } }, create: { userId: req.user!.id, propertyId: req.params.propertyId }, update: {} }); res.status(201).json({ success: true }) }
  catch (error) { next(error) }
})
router.delete('/:propertyId', async (req, res, next) => {
  try { await prisma.favorite.deleteMany({ where: { userId: req.user!.id, propertyId: req.params.propertyId } }); res.json({ success: true }) }
  catch (error) { next(error) }
})
export default router
