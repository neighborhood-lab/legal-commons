/**
 * Check migration status
 */

import knex from 'knex'
import knexConfig from '../src/knexfile'

const db = knex(knexConfig)

async function checkStatus() {
  try {
    const [completed, pending] = await Promise.all([
      db.migrate.list(),
      db.migrate.list({ includeCompleted: false }),
    ])
    
    console.log('Migration Status:')
    console.log(`  Completed: ${completed[0].length}`)
    console.log(`  Pending: ${pending[1].length}`)
    
    if (completed[0].length > 0) {
      console.log('\nCompleted migrations:')
      completed[0].forEach((migration) => console.log(`  ✓ ${migration}`))
    }
    
    if (pending[1].length > 0) {
      console.log('\nPending migrations:')
      pending[1].forEach((migration) => console.log(`  - ${migration}`))
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Status check failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

checkStatus()
