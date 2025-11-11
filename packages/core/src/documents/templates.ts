/**
 * Template rendering service using Handlebars
 */

import Handlebars from 'handlebars'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// Database returns snake_case, but types are defined as camelCase
// Until we add knex postProcessResponse, we need to handle both
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LLCCompanyDB = Record<string, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LLCMemberDB = Record<string, any>

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Template base directory
const TEMPLATES_DIR = join(__dirname, '../../templates')

export interface TemplateData {
  // Company info
  companyName: string
  state: string
  businessPurpose: string
  formationDate: string

  // Registered agent
  agentName: string
  agentAddress: string
  agentCity: string
  agentState: string
  agentZip: string

  // Principal office
  officeAddress: string
  officeCity: string
  officeState: string
  officeZip: string

  // Management
  isMemberManaged: boolean

  // Members (for multi-member docs)
  members?: Array<{
    name: string
    street: string
    city: string
    state: string
    zip: string
    email?: string | null
    phone?: string | null
    ownershipPercentage: number
    isManager: boolean
    capitalContribution?: number | null
  }>

  // Single member info (for single-member docs)
  memberName?: string
  memberAddress?: string
  memberCity?: string
  memberState?: string
  memberZip?: string
  memberEmail?: string | null
  memberPhone?: string | null
  capitalContribution?: number | null

  // Organizer (typically first member/manager)
  organizerName: string
  organizerAddress?: string

  // State-specific fields
  county?: string // Required for NY and DE
}

/**
 * Convert LLC company and members to template data
 * Database returns snake_case, so we handle both camelCase (types) and snake_case (runtime)
 */
export function prepareTemplateData(company: LLCCompanyDB, members: LLCMemberDB[]): TemplateData {
  const managementType = company.management_type || company.managementType
  const isMemberManaged = managementType === 'member-managed'
  const firstMember = members[0]

  if (!firstMember) {
    throw new Error('At least one member is required to generate documents')
  }

  // Format formation date
  const formationDateRaw = company.formation_date || company.formationDate
  const formationDate = formationDateRaw
    ? new Date(formationDateRaw).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

  // Extract metadata if available
  const metadata = company.metadata || {}

  const data: TemplateData = {
    companyName: company.company_name || company.companyName,
    state: company.state,
    businessPurpose: company.business_purpose || company.businessPurpose,
    formationDate,
    agentName: company.agent_name || company.agentName,
    agentAddress: company.agent_street || company.agentStreet,
    agentCity: company.agent_city || company.agentCity,
    agentState: company.agent_state || company.agentState,
    agentZip: company.agent_zip || company.agentZip,
    officeAddress: company.office_street || company.officeStreet,
    officeCity: company.office_city || company.officeCity,
    officeState: company.office_state || company.officeState,
    officeZip: company.office_zip || company.officeZip,
    isMemberManaged,
    organizerName: firstMember.name,
    organizerAddress: `${firstMember.street}, ${firstMember.city}, ${firstMember.state} ${firstMember.zip}`,
    county: metadata.county, // Optional field for states that require it (NY, DE)
  }

  // For single-member LLCs
  if (members.length === 1) {
    data.memberName = firstMember.name
    data.memberAddress = firstMember.street
    data.memberCity = firstMember.city
    data.memberState = firstMember.state
    data.memberZip = firstMember.zip
    data.memberEmail = firstMember.email
    data.memberPhone = firstMember.phone
    data.capitalContribution = firstMember.capital_contribution || firstMember.capitalContribution
  } else {
    // For multi-member LLCs
    data.members = members.map((member) => ({
      name: member.name,
      street: member.street,
      city: member.city,
      state: member.state,
      zip: member.zip,
      email: member.email,
      phone: member.phone,
      ownershipPercentage: Number(member.ownership_percentage || member.ownershipPercentage),
      isManager: member.is_manager !== undefined ? member.is_manager : member.isManager,
      capitalContribution: member.capital_contribution || member.capitalContribution,
    }))
  }

  return data
}

/**
 * Load and compile a Handlebars template
 */
async function loadTemplate(templatePath: string): Promise<Handlebars.TemplateDelegate> {
  const fullPath = join(TEMPLATES_DIR, templatePath)
  const templateContent = await readFile(fullPath, 'utf-8')
  return Handlebars.compile(templateContent)
}

/**
 * Render Operating Agreement template
 */
export async function renderOperatingAgreement(data: TemplateData): Promise<string> {
  const isSingleMember = !data.members || data.members.length === 0
  const templatePath = isSingleMember
    ? 'llc/operating-agreement/single-member.html'
    : 'llc/operating-agreement/multi-member.html'

  const template = await loadTemplate(templatePath)
  return template(data)
}

/**
 * Render Articles of Organization template
 */
export async function renderArticlesOfOrganization(data: TemplateData): Promise<string> {
  // Currently only supporting CA, but structure allows for expansion
  const templatePath = `llc/articles-of-organization/${data.state}.html`

  try {
    const template = await loadTemplate(templatePath)
    return template(data)
  } catch (error) {
    // Fallback to CA template if state-specific template doesn't exist
    if (data.state !== 'CA') {
      console.warn(`Template for state ${data.state} not found, using CA template as fallback`)
      const template = await loadTemplate('llc/articles-of-organization/CA.html')
      return template(data)
    }
    throw error
  }
}

/**
 * Get list of available document types
 */
export function getAvailableDocuments(): string[] {
  return ['operating-agreement', 'articles-of-organization']
}

/**
 * Render a specific document type
 */
export async function renderDocument(documentType: string, data: TemplateData): Promise<string> {
  switch (documentType) {
    case 'operating-agreement':
      return await renderOperatingAgreement(data)
    case 'articles-of-organization':
      return await renderArticlesOfOrganization(data)
    default:
      throw new Error(`Unknown document type: ${documentType}`)
  }
}
