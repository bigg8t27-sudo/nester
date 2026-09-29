import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import path from 'node:path'
import { env } from './config/env.js'
import { optionalAuth } from './middleware/auth.js'
import { errorHandler } from './utils/errors.js'
import authRoutes from './routes/auth.js'
import propertyRoutes from './routes/properties.js'
import favoriteRoutes from './routes/favorites.js'
import inquiryRoutes from './routes/inquiries.js'
import viewingRoutes from './routes/viewings.js'
import userRoutes from './routes/users.js'
import agentRoutes from './routes/agents.js'

const app = express()
app.set('trust proxy', 1)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'data:', 'blob:', 'https:'],
      'font-src': ["'self'", 'https:', 'data:'],
      'style-src': ["'self'", "'unsafe-inline'", 'https:'],
    },
  },
}))
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(optionalAuth)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/viewings', viewingRoutes)
app.use('/api/users', userRoutes)
app.use('/api/agents', agentRoutes)
const frontendDist = path.resolve(process.cwd(), '../dist')
app.use(express.static(frontendDist))
app.get('*', (_req, res, next) => {
  res.sendFile(path.join(frontendDist, 'index.html'), (error) => {
    if (error) next()
  })
})
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))
app.use(errorHandler)

export default app
