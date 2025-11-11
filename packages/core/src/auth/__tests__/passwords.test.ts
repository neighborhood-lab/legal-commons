/**
 * Password utilities tests
 */

import { describe, it, expect } from 'vitest'
import { hashPassword, comparePassword, validatePasswordStrength } from '../passwords'

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'test-password-123'
      const hash = await hashPassword(password)

      expect(hash).toBeTruthy()
      expect(hash).not.toBe(password)
      expect(hash.startsWith('$2')).toBe(true) // bcrypt hash prefix
    })

    it('should generate different hashes for same password', async () => {
      const password = 'test-password-123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('comparePassword', () => {
    it('should return true for matching password', async () => {
      const password = 'test-password-123'
      const hash = await hashPassword(password)
      const result = await comparePassword(password, hash)

      expect(result).toBe(true)
    })

    it('should return false for non-matching password', async () => {
      const password = 'test-password-123'
      const hash = await hashPassword(password)
      const result = await comparePassword('wrong-password', hash)

      expect(result).toBe(false)
    })
  })

  describe('validatePasswordStrength', () => {
    it('should reject passwords shorter than 8 characters', () => {
      const error = validatePasswordStrength('short')
      expect(error).toBe('Password must be at least 8 characters long')
    })

    it('should reject weak passwords', () => {
      const error = validatePasswordStrength('password')
      expect(error).toBeTruthy()
    })

    it('should accept strong passwords', () => {
      const error = validatePasswordStrength('MyStr0ng!Pass2024')
      expect(error).toBeNull()
    })

    it('should accept passwords with good entropy', () => {
      const error = validatePasswordStrength('correct-horse-battery-staple')
      expect(error).toBeNull()
    })
  })
})
