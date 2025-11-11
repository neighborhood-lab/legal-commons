/**
 * Database connection and utilities
 */

import knex from 'knex'
import knexConfig from './knexfile'

/**
 * Database connection instance
 */
export const db = knex(knexConfig)

/**
 * Check database connection health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.raw('SELECT 1')
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}

/**
 * Close database connection
 */
export async function closeDatabaseConnection(): Promise<void> {
  await db.destroy()
}
