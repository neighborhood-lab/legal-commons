/**
 * DANGER: Drop all tables (for development only)
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function nukeDatabase() {
  if (process.env['NODE_ENV'] === 'production') {
    console.error('DANGER: Cannot nuke database in production!')
    process.exit(1)
  }

  const confirmation = process.argv[2]
  if (confirmation !== '--confirm') {
    console.error('This will DROP ALL TABLES!')
    console.error('To confirm, run: npm run db:nuke -- --confirm')
    process.exit(1)
  }

  try {
    console.log('Dropping all tables...')
    await db.migrate.rollback(undefined, true) // Rollback all
    console.log('All tables dropped.')
    process.exit(0)
  } catch (error) {
    console.error('Failed to drop tables:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

nukeDatabase()
