/**
 * Create a new migration file
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)
const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Please provide a migration name:')
  console.error('  npm run migrate:make -- <migration_name>')
  process.exit(1)
}

async function makeMigration() {
  try {
    const name = await db.migrate.make(migrationName)
    console.log(`Created migration: ${name}`)
    process.exit(0)
  } catch (error) {
    console.error('Failed to create migration:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

makeMigration()
