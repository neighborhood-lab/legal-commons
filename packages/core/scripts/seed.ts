/**
 * Seed database with production-safe data
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function seed() {
  try {
    console.log('Seeding database...')
    await db.seed.run()
    console.log('Seeding complete.')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

seed()
