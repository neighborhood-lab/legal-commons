/**
 * Token utilities tests
 */

import { describe, it, expect, beforeAll } from 'vitest'
import {
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
} from '../tokens'

describe('Token Utilities', () => {
  const testPayload = {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    role: 'client' as const,
  }

  beforeAll(() => {
    process.env['JWT_ACCESS_SECRET'] = 'test-access-secret'
    process.env['JWT_REFRESH_SECRET'] = 'test-refresh-secret'
  })

  describe('generateTokenPair', () => {
    it('should generate access and refresh tokens', () => {
      const tokens = generateTokenPair(testPayload)

      expect(tokens.accessToken).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
      expect(tokens.accessToken).not.toBe(tokens.refreshToken)
    })
  })

  describe('verifyAccessToken', () => {
    it('should verify valid access token', () => {
      const tokens = generateTokenPair(testPayload)
      const payload = verifyAccessToken(tokens.accessToken)

      expect(payload.userId).toBe(testPayload.userId)
      expect(payload.email).toBe(testPayload.email)
      expect(payload.role).toBe(testPayload.role)
    })

    it('should reject invalid token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow('Invalid or expired access token')
    })
  })

  describe('verifyRefreshToken', () => {
    it('should verify valid refresh token', () => {
      const tokens = generateTokenPair(testPayload)
      const payload = verifyRefreshToken(tokens.refreshToken)

      expect(payload.userId).toBe(testPayload.userId)
      expect(payload.email).toBe(testPayload.email)
      expect(payload.role).toBe(testPayload.role)
    })

    it('should reject invalid token', () => {
      expect(() => verifyRefreshToken('invalid-token')).toThrow(
        'Invalid or expired refresh token'
      )
    })
  })

  describe('decodeToken', () => {
    it('should decode token without verification', () => {
      const tokens = generateTokenPair(testPayload)
      const payload = decodeToken(tokens.accessToken)

      expect(payload).toBeTruthy()
      expect(payload?.userId).toBe(testPayload.userId)
      expect(payload?.email).toBe(testPayload.email)
    })

    it('should return null for invalid token', () => {
      const payload = decodeToken('invalid-token')
      expect(payload).toBeNull()
    })
  })
})
