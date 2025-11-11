/**
 * JWT token generation and validation
 */

import jwt from 'jsonwebtoken'
import type { UserRole } from '../types'

const ACCESS_SECRET = process.env['JWT_ACCESS_SECRET'] ?? 'dev-access-secret'
const REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] ?? 'dev-refresh-secret'
const ACCESS_EXPIRY = process.env['JWT_ACCESS_EXPIRY'] ?? '15m'
const REFRESH_EXPIRY = process.env['JWT_REFRESH_EXPIRY'] ?? '7d'

export interface TokenPayload {
  userId: string
  email: string
  role: UserRole
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

/**
 * Generate access and refresh token pair
 */
export function generateTokenPair(payload: TokenPayload): TokenPair {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRY,
  })

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
  })

  return { accessToken, refreshToken }
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload
  } catch {
    throw new Error('Invalid or expired access token')
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload
  } catch {
    throw new Error('Invalid or expired refresh token')
  }
}

/**
 * Decode token without verification (for inspection)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload
  } catch {
    return null
  }
}
