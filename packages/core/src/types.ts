/**
 * Core type definitions for Legal Commons
 */

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  // eslint-disable-next-line no-unused-vars
  CLIENT = 'client',
  // eslint-disable-next-line no-unused-vars
  ATTORNEY = 'attorney',
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin',
  // eslint-disable-next-line no-unused-vars
  LEGAL_AID_COORDINATOR = 'legal_aid_coordinator',
}

export interface Document {
  id: string
  userId: string
  templateId: string
  jurisdictionId: string
  status: DocumentStatus
  content: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export enum DocumentStatus {
  // eslint-disable-next-line no-unused-vars
  DRAFT = 'draft',
  // eslint-disable-next-line no-unused-vars
  COMPLETED = 'completed',
  // eslint-disable-next-line no-unused-vars
  FILED = 'filed',
  // eslint-disable-next-line no-unused-vars
  ARCHIVED = 'archived',
}

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  jurisdictionId: string | null
  version: string
  schema: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export enum TemplateCategory {
  // eslint-disable-next-line no-unused-vars
  BUSINESS_FORMATION = 'business_formation',
  // eslint-disable-next-line no-unused-vars
  ESTATE_PLANNING = 'estate_planning',
  // eslint-disable-next-line no-unused-vars
  FAMILY_LAW = 'family_law',
  // eslint-disable-next-line no-unused-vars
  IMMIGRATION = 'immigration',
  // eslint-disable-next-line no-unused-vars
  HOUSING = 'housing',
  // eslint-disable-next-line no-unused-vars
  EMPLOYMENT = 'employment',
  // eslint-disable-next-line no-unused-vars
  INTELLECTUAL_PROPERTY = 'intellectual_property',
  // eslint-disable-next-line no-unused-vars
  DISPUTE_RESOLUTION = 'dispute_resolution',
}

export interface Jurisdiction {
  id: string
  state: string
  county: string | null
  filingFees: Record<string, number>
  requirements: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

// LLC Formation Types
export interface LLCCompany {
  id: string
  documentId: string
  userId: string
  companyName: string
  state: string
  businessPurpose: string
  formationDate: Date | null
  agentName: string
  agentStreet: string
  agentCity: string
  agentState: string
  agentZip: string
  officeStreet: string
  officeCity: string
  officeState: string
  officeZip: string
  managementType: 'member-managed' | 'manager-managed'
  hasSeries: boolean
  professionalLlc: boolean
  taxClassification: string | null
  metadata: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
}

export interface LLCMember {
  id: string
  llcCompanyId: string
  memberType: 'individual' | 'entity'
  name: string
  title: string | null
  email: string | null
  phone: string | null
  street: string
  city: string
  state: string
  zip: string
  entityType: string | null
  entityState: string | null
  ownershipPercentage: number
  isManager: boolean
  displayOrder: number
  capitalContribution: number | null
  metadata: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
}

export interface LLCFormData {
  // Step 1: State Selection
  state: string

  // Step 2: Company Information
  companyName: string
  businessPurpose: string
  formationDate?: string | null

  // Step 3: Registered Agent
  agentName: string
  agentStreet: string
  agentCity: string
  agentState: string
  agentZip: string

  // Step 4: Principal Office
  officeStreet: string
  officeCity: string
  officeState: string
  officeZip: string
  sameAsAgent?: boolean

  // Step 5: Management Structure
  managementType: 'member-managed' | 'manager-managed'
  hasSeries?: boolean
  professionalLlc?: boolean
  taxClassification?: string | null

  // Step 6: Members
  members: Array<{
    memberType?: 'individual' | 'entity'
    name: string
    title?: string | null
    email?: string | null
    phone?: string | null
    street: string
    city: string
    state: string
    zip: string
    entityType?: string | null
    entityState?: string | null
    ownershipPercentage: number
    isManager: boolean
    capitalContribution?: number | null
  }>
}

// Database Insert Types
export interface LLCCompanyInsert {
  document_id: string
  user_id: string
  company_name: string
  state: string
  business_purpose: string
  formation_date?: Date | null
  agent_name: string
  agent_street: string
  agent_city: string
  agent_state: string
  agent_zip: string
  office_street: string
  office_city: string
  office_state: string
  office_zip: string
  management_type: 'member-managed' | 'manager-managed'
  has_series?: boolean
  professional_llc?: boolean
  tax_classification?: string | null
  metadata?: Record<string, unknown> | null
}

export interface LLCMemberInsert {
  llc_company_id: string
  member_type?: 'individual' | 'entity'
  name: string
  title?: string | null
  email?: string | null
  phone?: string | null
  street: string
  city: string
  state: string
  zip: string
  entity_type?: string | null
  entity_state?: string | null
  ownership_percentage: number
  is_manager: boolean
  display_order?: number
  capital_contribution?: number | null
  metadata?: Record<string, unknown> | null
}
