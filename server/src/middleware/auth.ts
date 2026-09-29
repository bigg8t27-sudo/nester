import { createHash } from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'
import type { Role } from '@prisma/client'
import { prisma } from '../config/prisma.js'
import { HttpError } from '../utils/errors.js'

declare global { namespace Express { interface Request { user?: { id: string; name: string; email: string; phone: string | null; role: Role } } } }

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.nesta_session
    if (token) {
      const session = await prisma.session.findUnique({ where: { tokenHash: createHash('sha256').update(token).digest('hex') }, include: { user: true } })
      if (session && session.expiresAt > new Date()) req.user = { id: session.user.id, name: session.user.name, email: session.user.email, phone: session.user.phone, role: session.user.role }
      else if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined)
    }
    next()
  } catch (error) { next(error) }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(new HttpError(401, 'Authentication required'))
  next()
}

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new HttpError(401, 'Authentication required'))
    if (!roles.includes(req.user.role)) return next(new HttpError(403, 'You do not have permission to do that'))
    next()
  }
}
