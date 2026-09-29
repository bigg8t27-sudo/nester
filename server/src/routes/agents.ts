import { Router } from 'express'
import { prisma } from '../config/prisma.js'
import { HttpError } from '../utils/errors.js'

const router = Router()
router.get('/:id', async (req, res, next) => {
  try { const profile = await prisma.agentProfile.findFirst({ where: { OR: [{ id: req.params.id }, { userId: req.params.id }] }, include: { user: { select: { id: true, name: true, email: true } }, _count: { select: { properties: true } } } }); if (!profile) throw new HttpError(404, 'Agent not found'); res.json({ agent: { id: profile.id, userId: profile.userId, name: profile.user.name, email: profile.user.email, phone: profile.phone, agency: profile.agencyName, bio: profile.bio, photo: profile.photoUrl, verified: profile.verified, listings: profile._count.properties } }) }
  catch (error) { next(error) }
})
export default router
