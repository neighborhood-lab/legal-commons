import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('email', 255).notNullable().unique()
    table.string('password_hash', 255).notNullable()
    table.string('first_name', 100)
    table.string('last_name', 100)
    table
      .enum('role', ['client', 'attorney', 'admin', 'legal_aid_coordinator'])
      .notNullable()
      .defaultTo('client')
    table.boolean('email_verified').notNullable().defaultTo(false)
    table.timestamp('email_verified_at')
    table.string('phone', 20)
    table.string('language_preference', 10).defaultTo('en')
    table.jsonb('metadata')
    table.timestamps(true, true)
    table.timestamp('deleted_at')

    table.index('email')
    table.index('role')
  })

  // Jurisdictions table
  await knex.schema.createTable('jurisdictions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('state', 2).notNullable()
    table.string('state_name', 100).notNullable()
    table.string('county', 100)
    table.jsonb('filing_fees').notNullable().defaultTo('{}')
    table.jsonb('requirements').notNullable().defaultTo('{}')
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.unique(['state', 'county'])
    table.index('state')
  })

  // Templates table
  await knex.schema.createTable('templates', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('name', 255).notNullable()
    table.text('description')
    table
      .enum('category', [
        'business_formation',
        'estate_planning',
        'family_law',
        'immigration',
        'housing',
        'employment',
        'intellectual_property',
        'dispute_resolution',
      ])
      .notNullable()
    table.uuid('jurisdiction_id').references('id').inTable('jurisdictions').onDelete('CASCADE')
    table.string('version', 20).notNullable().defaultTo('1.0.0')
    table.jsonb('schema').notNullable() // JSON Schema for form fields
    table.text('content') // Markdown template with variable interpolation
    table.boolean('is_active').notNullable().defaultTo(true)
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.index('category')
    table.index('jurisdiction_id')
    table.index('is_active')
  })

  // Documents table
  await knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table
      .uuid('template_id')
      .notNullable()
      .references('id')
      .inTable('templates')
      .onDelete('RESTRICT')
    table
      .uuid('jurisdiction_id')
      .notNullable()
      .references('id')
      .inTable('jurisdictions')
      .onDelete('RESTRICT')
    table
      .enum('status', ['draft', 'completed', 'filed', 'archived'])
      .notNullable()
      .defaultTo('draft')
    table.jsonb('form_data').notNullable().defaultTo('{}') // User's answers to questionnaire
    table.text('generated_content') // Final generated document content
    table.string('pdf_url') // URL to generated PDF in Vercel Blob
    table.decimal('filing_fee', 10, 2)
    table.jsonb('metadata')
    table.timestamps(true, true)
    table.timestamp('completed_at')
    table.timestamp('filed_at')

    table.index('user_id')
    table.index('template_id')
    table.index('status')
    table.index('created_at')
  })

  // Attorneys table
  await knex.schema.createTable('attorneys', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.string('bar_number', 50).notNullable()
    table.string('state', 2).notNullable()
    table.jsonb('practice_areas').notNullable().defaultTo('[]')
    table.text('bio')
    table.string('firm_name', 255)
    table.boolean('pro_bono_available').notNullable().defaultTo(false)
    table.decimal('hourly_rate', 10, 2)
    table.boolean('verified').notNullable().defaultTo(false)
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.unique('bar_number')
    table.index('user_id')
    table.index('state')
    table.index(['pro_bono_available', 'verified'])
  })

  // Consultations table
  await knex.schema.createTable('consultations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('client_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table
      .uuid('attorney_id')
      .notNullable()
      .references('id')
      .inTable('attorneys')
      .onDelete('CASCADE')
    table.timestamp('scheduled_at').notNullable()
    table.integer('duration_minutes').notNullable().defaultTo(30)
    table
      .enum('status', ['scheduled', 'completed', 'cancelled', 'no_show'])
      .notNullable()
      .defaultTo('scheduled')
    table.text('client_notes')
    table.text('attorney_notes')
    table.string('meeting_url')
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.index('client_id')
    table.index('attorney_id')
    table.index('scheduled_at')
    table.index('status')
  })

  // Case Notes table (encrypted sensitive information)
  await knex.schema.createTable('case_notes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.uuid('document_id').references('id').inTable('documents').onDelete('CASCADE')
    table.uuid('consultation_id').references('id').inTable('consultations').onDelete('CASCADE')
    table.text('content').notNullable() // Should be encrypted at application level
    table.string('content_type', 50).defaultTo('text') // text, html, markdown
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.index('user_id')
    table.index('document_id')
    table.index('consultation_id')
  })

  // Filings table (court e-filing tracking)
  await knex.schema.createTable('filings', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table
      .uuid('document_id')
      .notNullable()
      .references('id')
      .inTable('documents')
      .onDelete('CASCADE')
    table
      .uuid('jurisdiction_id')
      .notNullable()
      .references('id')
      .inTable('jurisdictions')
      .onDelete('RESTRICT')
    table.string('court_name', 255)
    table.string('case_number', 100)
    table
      .enum('status', ['pending', 'submitted', 'accepted', 'rejected', 'error'])
      .notNullable()
      .defaultTo('pending')
    table.text('confirmation_number')
    table.jsonb('submission_response')
    table.timestamp('submitted_at')
    table.timestamp('accepted_at')
    table.timestamp('rejected_at')
    table.text('rejection_reason')
    table.jsonb('metadata')
    table.timestamps(true, true)

    table.index('document_id')
    table.index('status')
    table.index('submitted_at')
  })

  // Audit Logs table (comprehensive activity tracking)
  await knex.schema.createTable('audit_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL')
    table.string('action', 100).notNullable() // e.g., 'document.created', 'user.login'
    table.string('resource_type', 50) // e.g., 'document', 'user', 'consultation'
    table.uuid('resource_id')
    table.jsonb('changes') // Before/after state
    table.string('ip_address', 45)
    table.string('user_agent', 500)
    table.jsonb('metadata')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

    table.index('user_id')
    table.index('action')
    table.index('resource_type')
    table.index('created_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  // Drop tables in reverse order (respecting foreign keys)
  await knex.schema.dropTableIfExists('audit_logs')
  await knex.schema.dropTableIfExists('filings')
  await knex.schema.dropTableIfExists('case_notes')
  await knex.schema.dropTableIfExists('consultations')
  await knex.schema.dropTableIfExists('attorneys')
  await knex.schema.dropTableIfExists('documents')
  await knex.schema.dropTableIfExists('templates')
  await knex.schema.dropTableIfExists('jurisdictions')
  await knex.schema.dropTableIfExists('users')
}
