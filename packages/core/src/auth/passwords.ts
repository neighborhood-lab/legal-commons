/**
 * Password hashing and validation
 */

import bcrypt from 'bcrypt'
import zxcvbn from 'zxcvbn'

const SALT_ROUNDS = 12

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Compare password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Validate password strength
 * Returns error message if weak, null if strong
 */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  const result = zxcvbn(password)

  if (result.score < 3) {
    return (
      result.feedback.warning ||
      'Password is too weak. Use a mix of letters, numbers, and symbols.'
    )
  }

  return null
}
