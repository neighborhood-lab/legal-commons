/**
 * Run database migrations
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function runMigrations() {
  try {
    console.log('Running database migrations...')
    const [batch, migrations] = await db.migrate.latest()

    if (migrations.length === 0) {
      console.log('No new migrations to run.')
    } else {
      console.log(`Batch ${batch} ran ${migrations.length} migrations:`)
      migrations.forEach((migration) => console.log(`  - ${migration}`))
    }

    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runMigrations()
