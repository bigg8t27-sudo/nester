import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.js'
import { Role } from '@prisma/client'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { HttpError } from '../utils/errors.js'

const router = Router()
router.get('/', requireAuth, requireRole(Role.ADMIN), async (_req, res, next) => {
  try { const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }, orderBy: { createdAt: 'desc' } }); res.json({ users }) }
  catch (error) { next(error) }
})
router.put('/:id/role', requireAuth, requireRole(Role.ADMIN), async (req, res, next) => {
  try { const { role } = z.object({ role: z.nativeEnum(Role) }).parse(req.body); if (req.params.id === req.user!.id && role !== Role.ADMIN) throw new HttpError(400, 'You cannot remove your own administrator role'); const user = await prisma.user.update({ where: { id: String(req.params.id) }, data: { role }, select: { id: true, name: true, email: true, phone: true, role: true } }); res.json({ user }) }
  catch (error) { next(error) }
})
router.delete('/:id', requireAuth, requireRole(Role.ADMIN), async (req, res, next) => {
  try { if (req.params.id === req.user!.id) throw new HttpError(400, 'You cannot delete your own account here'); await prisma.user.delete({ where: { id: String(req.params.id) } }); res.json({ success: true }) }
  catch (error) { next(error) }
})
router.use(requireAuth)
router.get('/me', (req, res) => res.json({ user: req.user }))
router.put('/me', async (req, res, next) => {
  try { const data = z.object({ name: z.string().trim().min(2).max(100).optional(), phone: z.string().trim().max(40).nullable().optional() }).parse(req.body); const user = await prisma.user.update({ where: { id: req.user!.id }, data, select: { id: true, name: true, email: true, phone: true, role: true } }); res.json({ user }) }
  catch (error) { next(error) }
})
export default router
