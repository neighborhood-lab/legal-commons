/**
 * Legal Commons API Server
 * Express-based REST API for legal document preparation and filing
 */

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import rateLimit from 'express-rate-limit'
import { checkDatabaseHealth } from '@legal-commons/core'
import authRoutes from './routes/auth'
import llcRoutes from './routes/llc'
import documentRoutes from './routes/documents'

// Load environment variables
config()

const app = express()
const port = process.env['PORT'] ?? 3000

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env['ALLOWED_ORIGINS']?.split(',') ?? ['http://localhost:5173'],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

// Apply general rate limiting to all routes
app.use('/api', generalLimiter)

// Health check endpoint
app.get('/health', async (_req, res) => {
  const dbHealthy = await checkDatabaseHealth()

  res.json({
    status: dbHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      database: dbHealthy ? 'healthy' : 'unhealthy',
    },
  })
})

// API routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/llc', llcRoutes)
app.use('/api', documentRoutes)

// API documentation placeholder
app.get('/api-docs', (_req, res) => {
  res.json({ message: 'API documentation will be available here' })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Legal Commons API server listening on port ${port}`)
})
