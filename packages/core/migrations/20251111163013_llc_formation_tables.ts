/**
 * Migration: LLC Formation Tables
 * Adds tables for LLC formation workflow including members and company details
 */

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // LLC Companies table - stores LLC-specific information
  await knex.schema.createTable('llc_companies', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table
      .uuid('document_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('documents')
      .onDelete('CASCADE')
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

    // Company Information
    table.string('company_name', 255).notNullable()
    table.string('state', 2).notNullable() // Two-letter state code
    table.text('business_purpose').notNullable()
    table.date('formation_date')

    // Registered Agent Information
    table.string('agent_name', 255).notNullable()
    table.string('agent_street', 255).notNullable()
    table.string('agent_city', 100).notNullable()
    table.string('agent_state', 2).notNullable()
    table.string('agent_zip', 10).notNullable()

    // Principal Office Address
    table.string('office_street', 255).notNullable()
    table.string('office_city', 100).notNullable()
    table.string('office_state', 2).notNullable()
    table.string('office_zip', 10).notNullable()

    // LLC Management Structure
    table
      .enum('management_type', ['member-managed', 'manager-managed'])
      .notNullable()
      .defaultTo('member-managed')

    // Additional Options
    table.boolean('has_series').notNullable().defaultTo(false) // Series LLC (DE, IL, etc.)
    table.boolean('professional_llc').notNullable().defaultTo(false) // PLLC
    table.string('tax_classification', 50) // 'disregarded', 'partnership', 'c-corp', 's-corp'

    // Metadata
    table.jsonb('metadata') // State-specific additional fields
    table.timestamps(true, true)

    table.index('user_id')
    table.index('state')
    table.index('created_at')
  })

  // LLC Members table - stores member/owner information
  await knex.schema.createTable('llc_members', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table
      .uuid('llc_company_id')
      .notNullable()
      .references('id')
      .inTable('llc_companies')
      .onDelete('CASCADE')

    // Member Information
    table.enum('member_type', ['individual', 'entity']).notNullable().defaultTo('individual')
    table.string('name', 255).notNullable()
    table.string('title', 100) // CEO, President, etc.

    // Contact Information
    table.string('email', 255)
    table.string('phone', 20)
    table.string('street', 255).notNullable()
    table.string('city', 100).notNullable()
    table.string('state', 2).notNullable()
    table.string('zip', 10).notNullable()

    // Entity-specific fields
    table.string('entity_type', 50) // 'corporation', 'llc', 'partnership', 'trust'
    table.string('entity_state', 2) // State of formation

    // Ownership and Management
    table.decimal('ownership_percentage', 5, 2).notNullable()
    table.boolean('is_manager').notNullable().defaultTo(false)
    table.integer('display_order').notNullable().defaultTo(0)

    // Capital Contribution
    table.decimal('capital_contribution', 12, 2)

    table.jsonb('metadata')
    table.timestamps(true, true)

    table.index('llc_company_id')
    table.index(['llc_company_id', 'display_order'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('llc_members')
  await knex.schema.dropTableIfExists('llc_companies')
}
