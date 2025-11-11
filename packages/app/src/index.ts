/**
 * Legal Commons API Server
 * Express-based REST API for legal document preparation and filing
 */

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'

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

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API documentation placeholder
app.get('/api-docs', (_req, res) => {
  res.json({ message: 'API documentation will be available here' })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use(
  (err: Error, _req: express.Request, res: express.Response) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
)

app.listen(port, () => {
  console.log(`Legal Commons API server listening on port ${port}`)
})
