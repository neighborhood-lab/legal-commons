/**
 * User authentication service
 */

import { db } from '../db'
import { hashPassword, comparePassword } from './passwords'
import { generateTokenPair, type TokenPair } from './tokens'
import { generateRandomString } from '../utils'
import type { UserRole } from '../types'

export interface CreateUserInput {
  email: string
  password: string
  firstName?: string
  lastName?: string
  role?: UserRole
  languagePreference?: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: UserRole
  emailVerified: boolean
  languagePreference: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Register a new user
 */
export async function registerUser(
  input: CreateUserInput
): Promise<{ user: UserResponse; tokens: TokenPair }> {
  // Check if user already exists
  const existingUser = await db('users').where({ email: input.email.toLowerCase() }).first()

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  // Hash password
  const passwordHash = await hashPassword(input.password)

  // Create user
  const [user] = await db('users')
    .insert({
      email: input.email.toLowerCase(),
      password_hash: passwordHash,
      first_name: input.firstName,
      last_name: input.lastName,
      role: input.role ?? 'client',
      language_preference: input.languagePreference ?? 'en',
      email_verified: false,
    })
    .returning([
      'id',
      'email',
      'first_name',
      'last_name',
      'role',
      'email_verified',
      'language_preference',
      'created_at',
      'updated_at',
    ])

  // Generate tokens
  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      emailVerified: user.email_verified,
      languagePreference: user.language_preference,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
    tokens,
  }
}

/**
 * Login user
 */
export async function loginUser(
  input: LoginInput
): Promise<{ user: UserResponse; tokens: TokenPair }> {
  // Find user
  const user = await db('users')
    .where({ email: input.email.toLowerCase() })
    .whereNull('deleted_at')
    .first()

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Verify password
  const isValid = await comparePassword(input.password, user.password_hash)

  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  // Generate tokens
  const tokens = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      emailVerified: user.email_verified,
      languagePreference: user.language_preference,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
    tokens,
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<UserResponse | null> {
  const user = await db('users').where({ id: userId }).whereNull('deleted_at').first()

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    emailVerified: user.email_verified,
    languagePreference: user.language_preference,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }
}

/**
 * Create password reset token
 */
export async function createPasswordResetToken(email: string): Promise<string> {
  const user = await db('users')
    .where({ email: email.toLowerCase() })
    .whereNull('deleted_at')
    .first()

  if (!user) {
    // Don't reveal if user exists
    throw new Error('If the email exists, a reset link will be sent')
  }

  // Generate reset token (in real implementation, store in Redis with expiry)
  const resetToken = generateRandomString(32)

  // TODO: Store token in Redis with 1-hour expiry
  // await redis.setex(`password-reset:${resetToken}`, 3600, user.id)

  return resetToken
}
