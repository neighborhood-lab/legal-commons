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
