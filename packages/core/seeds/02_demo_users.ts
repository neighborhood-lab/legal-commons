import type { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('case_notes').del()
  await knex('consultations').del()
  await knex('attorneys').del()
  await knex('documents').del()
  await knex('users').del()

  // Hash password for demo users (password: "demo123")
  const passwordHash = await bcrypt.hash('demo123', 12)

  // Insert demo users
  const users = [
    {
      email: 'client@demo.legal-commons.org',
      password_hash: passwordHash,
      first_name: 'Jane',
      last_name: 'Doe',
      role: 'client',
      email_verified: true,
      email_verified_at: new Date(),
      phone: '+1-555-0101',
      language_preference: 'en',
      metadata: {
        demo: true,
        onboarding_completed: true,
      },
    },
    {
      email: 'attorney@demo.legal-commons.org',
      password_hash: passwordHash,
      first_name: 'John',
      last_name: 'Smith',
      role: 'attorney',
      email_verified: true,
      email_verified_at: new Date(),
      phone: '+1-555-0102',
      language_preference: 'en',
      metadata: {
        demo: true,
      },
    },
    {
      email: 'admin@demo.legal-commons.org',
      password_hash: passwordHash,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      email_verified: true,
      email_verified_at: new Date(),
      language_preference: 'en',
      metadata: {
        demo: true,
      },
    },
    {
      email: 'coordinator@demo.legal-commons.org',
      password_hash: passwordHash,
      first_name: 'Maria',
      last_name: 'Garcia',
      role: 'legal_aid_coordinator',
      email_verified: true,
      email_verified_at: new Date(),
      phone: '+1-555-0103',
      language_preference: 'es',
      metadata: {
        demo: true,
        organization: 'Legal Aid Society Demo',
      },
    },
  ]

  await knex('users').insert(users)

  console.log('Demo users created:')
  console.log('  - client@demo.legal-commons.org (password: demo123)')
  console.log('  - attorney@demo.legal-commons.org (password: demo123)')
  console.log('  - admin@demo.legal-commons.org (password: demo123)')
  console.log('  - coordinator@demo.legal-commons.org (password: demo123)')
}
