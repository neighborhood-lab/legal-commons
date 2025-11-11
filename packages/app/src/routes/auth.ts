/**
 * Authentication routes
 */

import { Router } from 'express'
import { z } from 'zod'
import {
  registerUser,
  loginUser,
  getUserById,
  createPasswordResetToken,
  validatePasswordStrength,
  verifyRefreshToken,
  generateTokenPair,
} from '@legal-commons/core'
import { requireAuth } from '../middleware/auth'

const router = Router()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  languagePreference: z.string().default('en'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
})

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const input = registerSchema.parse(req.body)

    // Validate password strength
    const passwordError = validatePasswordStrength(input.password)
    if (passwordError) {
      res.status(400).json({ error: passwordError })
      return
    }

    const result = await registerUser(input)

    res.status(201).json({
      user: result.user,
      tokens: result.tokens,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const input = loginSchema.parse(req.body)
    const result = await loginUser(input)

    res.json({
      user: result.user,
      tokens: result.tokens,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      res.status(401).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req, res) => {
  try {
    const input = refreshSchema.parse(req.body)
    const payload = verifyRefreshToken(input.refreshToken)

    const tokens = generateTokenPair({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    })

    res.json({ tokens })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    res.status(401).json({ error: 'Invalid or expired refresh token' })
  }
})

/**
 * GET /auth/me
 * Get current user
 */
router.get('/me', requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const user = await getUserById(req.user.userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({ user })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /auth/password-reset/request
 * Request password reset
 */
router.post('/password-reset/request', async (req, res) => {
  try {
    const input = passwordResetRequestSchema.parse(req.body)
    await createPasswordResetToken(input.email)

    // Always return success to prevent email enumeration
    res.json({
      message: 'If the email exists, a password reset link will be sent',
    })
  } catch {
    // Always return success to prevent email enumeration (intentionally catching all errors)
    res.json({
      message: 'If the email exists, a password reset link will be sent',
    })
  }
})

export default router
