/**
 * Rollback the last migration batch
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function rollback() {
  try {
    console.log('Rolling back last migration batch...')
    const [batch, migrations] = await db.migrate.rollback()
    
    if (migrations.length === 0) {
      console.log('No migrations to rollback.')
    } else {
      console.log(`Rolled back batch ${batch}:`)
      migrations.forEach((migration) => console.log(`  - ${migration}`))
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Rollback failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

rollback()
