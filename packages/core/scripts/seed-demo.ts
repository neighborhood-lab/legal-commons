/**
 * Seed database with demo/development data
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function seedDemo() {
  try {
    console.log('Seeding demo data...')

    // This will run seed files in alphabetical order
    await db.seed.run({ directory: 'seeds' })

    console.log('Demo data seeding complete.')
    process.exit(0)
  } catch (error) {
    console.error('Demo seeding failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

seedDemo()
