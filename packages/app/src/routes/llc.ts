/**
 * LLC Formation routes
 */

import { Router } from 'express'
import { z } from 'zod'
import {
  createLLCCompany,
  getLLCCompanyById,
  listLLCCompanies,
  updateLLCCompany,
  deleteLLCCompany,
  addLLCMember,
  updateLLCMember,
  removeLLCMember,
} from '@legal-commons/core'
import { requireAuth } from '../middleware/auth'

const router = Router()

// All LLC routes require authentication
router.use(requireAuth)

// Validation schemas
const memberSchema = z.object({
  memberType: z.enum(['individual', 'entity']).optional().default('individual'),
  name: z.string().min(1, 'Member name is required'),
  title: z.string().optional().nullable(),
  email: z.string().email('Invalid email').optional().nullable(),
  phone: z.string().optional().nullable(),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2-letter code'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  entityType: z.string().optional().nullable(),
  entityState: z.string().length(2, 'Entity state must be 2-letter code').optional().nullable(),
  ownershipPercentage: z
    .number()
    .min(0, 'Ownership percentage must be at least 0')
    .max(100, 'Ownership percentage cannot exceed 100'),
  isManager: z.boolean(),
  capitalContribution: z.number().optional().nullable(),
})

const createLLCSchema = z.object({
  // State selection
  state: z.string().length(2, 'State must be 2-letter code'),

  // Company information
  companyName: z.string().min(1, 'Company name is required'),
  businessPurpose: z.string().min(1, 'Business purpose is required'),
  formationDate: z.string().optional().nullable(),

  // Registered agent
  agentName: z.string().min(1, 'Registered agent name is required'),
  agentStreet: z.string().min(1, 'Agent street address is required'),
  agentCity: z.string().min(1, 'Agent city is required'),
  agentState: z.string().length(2, 'Agent state must be 2-letter code'),
  agentZip: z.string().min(5, 'Agent ZIP code must be at least 5 characters'),

  // Principal office
  officeStreet: z.string().min(1, 'Office street address is required'),
  officeCity: z.string().min(1, 'Office city is required'),
  officeState: z.string().length(2, 'Office state must be 2-letter code'),
  officeZip: z.string().min(5, 'Office ZIP code must be at least 5 characters'),
  sameAsAgent: z.boolean().optional(),

  // Management structure
  managementType: z.enum(['member-managed', 'manager-managed']),
  hasSeries: z.boolean().optional().default(false),
  professionalLlc: z.boolean().optional().default(false),
  taxClassification: z.string().optional().nullable(),

  // Members
  members: z.array(memberSchema).min(1, 'At least one member is required'),
})

const updateLLCSchema = createLLCSchema.partial()

const updateMemberSchema = memberSchema.partial()

/**
 * GET /api/llc/companies
 * List all LLC companies for the authenticated user
 */
router.get('/companies', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const state = req.query.state as string | undefined
    const search = req.query.search as string | undefined

    const result = await listLLCCompanies(req.user.userId, {
      page,
      limit,
      state,
      search,
    })

    res.json(result)
  } catch (error) {
    console.error('Error listing companies:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /api/llc/companies
 * Create a new LLC company
 */
router.post('/companies', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const input = createLLCSchema.parse(req.body)
    const result = await createLLCCompany(req.user.userId, input)

    res.status(201).json({
      company: result.company,
      members: result.members,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/llc/companies/:id
 * Get LLC company by ID
 */
router.get('/companies/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const result = await getLLCCompanyById(id, req.user.userId)

    if (!result) {
      res.status(404).json({ error: 'LLC company not found' })
      return
    }

    res.json({
      company: result.company,
      members: result.members,
    })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * PATCH /api/llc/companies/:id
 * Update LLC company
 */
router.patch('/companies/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const input = updateLLCSchema.parse(req.body)
    const result = await updateLLCCompany(id, req.user.userId, input)

    res.json({
      company: result.company,
      members: result.members,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      if (error.message === 'LLC company not found') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * DELETE /api/llc/companies/:id
 * Delete LLC company
 */
router.delete('/companies/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    await deleteLLCCompany(id, req.user.userId)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'LLC company not found') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /api/llc/companies/:id/members
 * Add member to LLC company
 */
router.post('/companies/:id/members', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const input = memberSchema.parse(req.body)

    // Convert camelCase to snake_case for database
    const memberData = {
      member_type: input.memberType,
      name: input.name,
      title: input.title,
      email: input.email,
      phone: input.phone,
      street: input.street,
      city: input.city,
      state: input.state,
      zip: input.zip,
      entity_type: input.entityType,
      entity_state: input.entityState,
      ownership_percentage: input.ownershipPercentage,
      is_manager: input.isManager,
      capital_contribution: input.capitalContribution,
    }

    const member = await addLLCMember(id, req.user.userId, memberData)

    res.status(201).json({ member })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      if (error.message === 'LLC company not found') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * PATCH /api/llc/members/:id
 * Update LLC member
 */
router.patch('/members/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const input = updateMemberSchema.parse(req.body)

    // Convert camelCase to snake_case for database
    const memberData: Record<string, unknown> = {}
    if (input.memberType !== undefined) memberData.member_type = input.memberType
    if (input.name !== undefined) memberData.name = input.name
    if (input.title !== undefined) memberData.title = input.title
    if (input.email !== undefined) memberData.email = input.email
    if (input.phone !== undefined) memberData.phone = input.phone
    if (input.street !== undefined) memberData.street = input.street
    if (input.city !== undefined) memberData.city = input.city
    if (input.state !== undefined) memberData.state = input.state
    if (input.zip !== undefined) memberData.zip = input.zip
    if (input.entityType !== undefined) memberData.entity_type = input.entityType
    if (input.entityState !== undefined) memberData.entity_state = input.entityState
    if (input.ownershipPercentage !== undefined)
      memberData.ownership_percentage = input.ownershipPercentage
    if (input.isManager !== undefined) memberData.is_manager = input.isManager
    if (input.capitalContribution !== undefined)
      memberData.capital_contribution = input.capitalContribution

    const member = await updateLLCMember(id, req.user.userId, memberData)

    res.json({ member })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    if (error instanceof Error) {
      if (error.message === 'LLC member not found' || error.message === 'Unauthorized') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * DELETE /api/llc/members/:id
 * Remove LLC member
 */
router.delete('/members/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    await removeLLCMember(id, req.user.userId)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'LLC member not found' || error.message === 'Unauthorized') {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
