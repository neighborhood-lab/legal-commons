/**
 * LLC Formation business logic
 */

import { db } from '../db'
import type {
  LLCCompany,
  LLCMember,
  LLCFormData,
  LLCCompanyInsert,
  LLCMemberInsert,
} from '../types'

/**
 * Validate that ownership percentages total 100%
 */
export function validateOwnershipPercentages(
  members: { ownershipPercentage: number }[]
): string | null {
  const total = members.reduce(
    (sum, member) => sum + member.ownershipPercentage,
    0
  )

  // Allow for floating point precision issues (within 0.01%)
  if (Math.abs(total - 100) > 0.01) {
    return `Ownership percentages must total 100%, got ${total.toFixed(2)}%`
  }

  return null
}

/**
 * Create a new LLC company with members
 */
export async function createLLCCompany(
  userId: string,
  data: LLCFormData
): Promise<{ company: LLCCompany; members: LLCMember[] }> {
  // Validate ownership percentages
  const ownershipError = validateOwnershipPercentages(data.members)
  if (ownershipError) {
    throw new Error(ownershipError)
  }

  // Validate at least one member
  if (data.members.length === 0) {
    throw new Error('At least one member is required')
  }

  // Start transaction
  return await db.transaction(async (trx) => {
    // First, create a document record for this LLC
    const [document] = await trx('documents')
      .insert({
        user_id: userId,
        template_id: null, // Will be set when templates are implemented
        jurisdiction_id: null, // Will be linked to jurisdiction later
        type: 'llc_formation',
        status: 'draft',
        content: {},
      })
      .returning('*')

    if (!document) {
      throw new Error('Failed to create document record')
    }

    // Insert company
    const companyData: LLCCompanyInsert = {
      document_id: document.id,
      user_id: userId,
      state: data.state,
      company_name: data.companyName,
      business_purpose: data.businessPurpose,
      formation_date: data.formationDate ? new Date(data.formationDate) : null,
      agent_name: data.agentName,
      agent_street: data.agentStreet,
      agent_city: data.agentCity,
      agent_state: data.agentState,
      agent_zip: data.agentZip,
      office_street: data.officeStreet,
      office_city: data.officeCity,
      office_state: data.officeState,
      office_zip: data.officeZip,
      management_type: data.managementType,
      has_series: data.hasSeries ?? false,
      professional_llc: data.professionalLlc ?? false,
      tax_classification: data.taxClassification,
    }

    const [company] = await trx('llc_companies')
      .insert(companyData)
      .returning('*')

    if (!company) {
      throw new Error('Failed to create LLC company')
    }

    // Insert members
    const memberData: LLCMemberInsert[] = data.members.map((member, index) => ({
      llc_company_id: company.id,
      member_type: member.memberType ?? 'individual',
      name: member.name,
      title: member.title,
      email: member.email,
      phone: member.phone,
      street: member.street,
      city: member.city,
      state: member.state,
      zip: member.zip,
      entity_type: member.entityType,
      entity_state: member.entityState,
      ownership_percentage: member.ownershipPercentage,
      is_manager: member.isManager,
      display_order: index,
      capital_contribution: member.capitalContribution,
    }))

    const members = await trx('llc_members').insert(memberData).returning('*')

    return { company, members }
  })
}

/**
 * List all LLC companies for a user with pagination
 */
export async function listLLCCompanies(
  userId: string,
  options: {
    page?: number
    limit?: number
    state?: string
    search?: string
  } = {}
): Promise<{
  companies: Array<LLCCompany & { memberCount: number }>
  total: number
  page: number
  limit: number
  totalPages: number
}> {
  const page = options.page ?? 1
  const limit = options.limit ?? 10
  const offset = (page - 1) * limit

  let query = db('llc_companies')
    .where({ user_id: userId })
    .select(
      'llc_companies.*',
      db.raw('COUNT(llc_members.id) as member_count')
    )
    .leftJoin('llc_members', 'llc_companies.id', 'llc_members.llc_company_id')
    .groupBy('llc_companies.id')

  // Filter by state if provided
  if (options.state) {
    query = query.where('llc_companies.state', options.state)
  }

  // Search by company name if provided
  if (options.search) {
    query = query.where('llc_companies.company_name', 'ilike', `%${options.search}%`)
  }

  // Get total count (before pagination)
  const countQuery = query.clone().clearSelect().clearGroup().count('* as count')
  const countResult = await countQuery
  const total = Number((countResult[0] as any)?.count || 0)

  // Apply pagination
  const companies = await query
    .orderBy('llc_companies.created_at', 'desc')
    .limit(limit)
    .offset(offset)

  return {
    companies: companies.map((c: any) => ({
      ...c,
      memberCount: Number(c.member_count || 0),
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

/**
 * Get LLC company by ID (with authorization check)
 */
export async function getLLCCompanyById(
  companyId: string,
  userId: string
): Promise<{ company: LLCCompany; members: LLCMember[] } | null> {
  const company = await db('llc_companies')
    .where({ id: companyId, user_id: userId })
    .first()

  if (!company) {
    return null
  }

  const members = await db('llc_members')
    .where({ llc_company_id: companyId })
    .orderBy('display_order', 'asc')

  return { company, members }
}

/**
 * Update LLC company
 */
export async function updateLLCCompany(
  companyId: string,
  userId: string,
  data: Partial<LLCFormData>
): Promise<{ company: LLCCompany; members: LLCMember[] }> {
  // Check authorization
  const existing = await getLLCCompanyById(companyId, userId)
  if (!existing) {
    throw new Error('LLC company not found')
  }

  return await db.transaction(async (trx) => {
    // Build company update object
    const companyUpdate: Partial<LLCCompanyInsert> = {}

    if (data.companyName) companyUpdate.company_name = data.companyName
    if (data.businessPurpose)
      companyUpdate.business_purpose = data.businessPurpose
    if (data.formationDate !== undefined)
      companyUpdate.formation_date = data.formationDate
        ? new Date(data.formationDate)
        : null
    if (data.managementType) companyUpdate.management_type = data.managementType
    if (data.agentName) companyUpdate.agent_name = data.agentName
    if (data.agentStreet) companyUpdate.agent_street = data.agentStreet
    if (data.agentCity) companyUpdate.agent_city = data.agentCity
    if (data.agentState) companyUpdate.agent_state = data.agentState
    if (data.agentZip) companyUpdate.agent_zip = data.agentZip
    if (data.officeStreet) companyUpdate.office_street = data.officeStreet
    if (data.officeCity) companyUpdate.office_city = data.officeCity
    if (data.officeState) companyUpdate.office_state = data.officeState
    if (data.officeZip) companyUpdate.office_zip = data.officeZip
    if (data.hasSeries !== undefined) companyUpdate.has_series = data.hasSeries
    if (data.professionalLlc !== undefined)
      companyUpdate.professional_llc = data.professionalLlc
    if (data.taxClassification !== undefined)
      companyUpdate.tax_classification = data.taxClassification

    // Update company if there are changes
    if (Object.keys(companyUpdate).length > 0) {
      await trx('llc_companies').where({ id: companyId }).update(companyUpdate)
    }

    // Update members if provided
    if (data.members && data.members.length > 0) {
      // Validate ownership percentages
      const ownershipError = validateOwnershipPercentages(data.members)
      if (ownershipError) {
        throw new Error(ownershipError)
      }

      // Delete existing members
      await trx('llc_members').where({ llc_company_id: companyId }).del()

      // Insert new members
      const memberData: LLCMemberInsert[] = data.members.map(
        (member, index) => ({
          llc_company_id: companyId,
          member_type: member.memberType ?? 'individual',
          name: member.name,
          title: member.title,
          email: member.email,
          phone: member.phone,
          street: member.street,
          city: member.city,
          state: member.state,
          zip: member.zip,
          entity_type: member.entityType,
          entity_state: member.entityState,
          ownership_percentage: member.ownershipPercentage,
          is_manager: member.isManager,
          display_order: index,
          capital_contribution: member.capitalContribution,
        })
      )

      await trx('llc_members').insert(memberData)
    }

    // Get updated company and members
    const company = await trx('llc_companies').where({ id: companyId }).first()

    const members = await trx('llc_members')
      .where({ llc_company_id: companyId })
      .orderBy('display_order', 'asc')

    if (!company) {
      throw new Error('Failed to retrieve updated LLC company')
    }

    return { company, members }
  })
}

/**
 * Delete LLC company (hard delete since no deleted_at column)
 */
export async function deleteLLCCompany(
  companyId: string,
  userId: string
): Promise<void> {
  // Check authorization
  const existing = await getLLCCompanyById(companyId, userId)
  if (!existing) {
    throw new Error('LLC company not found')
  }

  await db.transaction(async (trx) => {
    // Delete members (CASCADE will handle this, but explicit for clarity)
    await trx('llc_members').where({ llc_company_id: companyId }).del()

    // Delete company (will cascade to document)
    await trx('llc_companies').where({ id: companyId }).del()
  })
}

/**
 * Add member to LLC
 */
export async function addLLCMember(
  companyId: string,
  userId: string,
  memberData: Omit<LLCMemberInsert, 'llc_company_id' | 'display_order'>
): Promise<LLCMember> {
  // Check authorization
  const existing = await getLLCCompanyById(companyId, userId)
  if (!existing) {
    throw new Error('LLC company not found')
  }

  // Get current members to validate ownership
  const currentMembers = existing.members
  const newTotalOwnership =
    currentMembers.reduce(
      (sum, m) => sum + Number(m.ownershipPercentage),
      0
    ) + Number(memberData.ownership_percentage)

  if (Math.abs(newTotalOwnership - 100) > 0.01 && newTotalOwnership > 100) {
    throw new Error(
      `Adding this member would exceed 100% ownership (total would be ${newTotalOwnership.toFixed(2)}%)`
    )
  }

  const [member] = await db('llc_members')
    .insert({
      llc_company_id: companyId,
      display_order: currentMembers.length,
      ...memberData,
    })
    .returning('*')

  if (!member) {
    throw new Error('Failed to add LLC member')
  }

  return member
}

/**
 * Update LLC member
 */
export async function updateLLCMember(
  memberId: string,
  userId: string,
  memberData: Partial<Omit<LLCMemberInsert, 'llc_company_id' | 'display_order'>>
): Promise<LLCMember> {
  // Get member
  const member = await db('llc_members').where({ id: memberId }).first()

  if (!member) {
    throw new Error('LLC member not found')
  }

  // Check company authorization
  const company = await getLLCCompanyById(member.llc_company_id, userId)
  if (!company) {
    throw new Error('Unauthorized')
  }

  // If updating ownership, validate new total
  if (memberData.ownership_percentage !== undefined) {
    const otherMembers = company.members.filter((m) => m.id !== memberId)
    const newTotal =
      otherMembers.reduce(
        (sum, m) => sum + Number(m.ownershipPercentage),
        0
      ) + Number(memberData.ownership_percentage)

    if (Math.abs(newTotal - 100) > 0.01) {
      throw new Error(
        `Ownership percentages must total 100%, would be ${newTotal.toFixed(2)}%`
      )
    }
  }

  const [updatedMember] = await db('llc_members')
    .where({ id: memberId })
    .update(memberData)
    .returning('*')

  if (!updatedMember) {
    throw new Error('Failed to update LLC member')
  }

  return updatedMember
}

/**
 * Remove LLC member (hard delete)
 */
export async function removeLLCMember(
  memberId: string,
  userId: string
): Promise<void> {
  // Get member
  const member = await db('llc_members').where({ id: memberId }).first()

  if (!member) {
    throw new Error('LLC member not found')
  }

  // Check company authorization
  const company = await getLLCCompanyById(member.llc_company_id, userId)
  if (!company) {
    throw new Error('Unauthorized')
  }

  // Ensure at least one member remains
  if (company.members.length <= 1) {
    throw new Error('Cannot remove the last member from an LLC')
  }

  await db('llc_members').where({ id: memberId }).del()
}
