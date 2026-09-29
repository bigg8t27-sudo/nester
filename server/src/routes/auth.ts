import { Router } from 'express'
import { createHash, randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import type { Response } from 'express'
import { prisma } from '../config/prisma.js'
import { env } from '../config/env.js'
import { HttpError } from '../utils/errors.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const registerSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), phone: z.string().trim().max(40).optional(), password: z.string().min(8).max(128), role: z.enum(['BUYER', 'RENTER', 'AGENT', 'OWNER']).default('BUYER') })
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1).max(128), remember: z.boolean().optional() })
const safeUser = (user: { id: string; name: string; email: string; phone: string | null; role: string }) => ({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role })

async function createSession(userId: string, res: Response, remember = true) {
  const token = randomBytes(32).toString('hex')
  const days = remember ? env.SESSION_DAYS : 1
  const expiresAt = new Date(Date.now() + days * 86400000)
  await prisma.session.create({ data: { tokenHash: createHash('sha256').update(token).digest('hex'), userId, expiresAt } })
  res.cookie('nesta_session', token, { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: 'lax', path: '/', expires: expiresAt })
}

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)
    const email = data.email.toLowerCase()
    if (await prisma.user.findUnique({ where: { email } })) throw new HttpError(409, 'An account with this email already exists')
    const user = await prisma.user.create({ data: { name: data.name, email, phone: data.phone, passwordHash: await bcrypt.hash(data.password, 12), role: data.role } })
    if (user.role === 'AGENT') await prisma.agentProfile.create({ data: { userId: user.id, agencyName: 'Independent Agent', phone: user.phone } })
    await createSession(user.id, res)
    res.status(201).json({ user: safeUser(user) })
  } catch (error) { next(error) }
})

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)
    const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } })
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new HttpError(401, 'Email or password is incorrect')
    await createSession(user.id, res, data.remember !== false)
    res.json({ user: safeUser(user) })
  } catch (error) { next(error) }
})

router.post('/logout', async (req, res, next) => {
  try {
    const token = req.cookies?.nesta_session
    if (token) await prisma.session.deleteMany({ where: { tokenHash: createHash('sha256').update(token).digest('hex') } })
    res.clearCookie('nesta_session', { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: 'lax', path: '/' })
    res.json({ success: true })
  } catch (error) { next(error) }
})

router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }))
export default router
