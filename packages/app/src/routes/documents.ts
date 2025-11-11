/**
 * Document generation routes
 */

import { Router } from 'express'
import { z } from 'zod'
import {
  getLLCCompanyById,
  prepareTemplateData,
  renderDocument,
  getAvailableDocuments,
} from '@legal-commons/core'
import { requireAuth } from '../middleware/auth'
import { generatePDF, generateFilename } from '../services/pdf'

const router = Router()

// All document routes require authentication
router.use(requireAuth)

// Validation schemas
const generateDocumentsSchema = z.object({
  documentTypes: z.array(z.string()).optional(),
})

/**
 * GET /api/llc/companies/:id/documents
 * List available document types for an LLC
 */
router.get('/llc/companies/:id/documents', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const llc = await getLLCCompanyById(id, req.user.userId)

    if (!llc) {
      res.status(404).json({ error: 'LLC company not found' })
      return
    }

    const availableDocuments = getAvailableDocuments()

    res.json({
      companyId: id,
      companyName: (llc.company as any).company_name || (llc.company as any).companyName,
      availableDocuments: availableDocuments.map((type) => ({
        type,
        name: type
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      })),
    })
  } catch (error) {
    console.error('Error listing documents:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /api/llc/companies/:id/documents/generate
 * Generate documents for an LLC (returns PDF)
 */
router.post('/llc/companies/:id/documents/generate', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id } = req.params
    const { documentTypes } = generateDocumentsSchema.parse(req.body)
    const types = documentTypes || getAvailableDocuments()

    const llc = await getLLCCompanyById(id, req.user.userId)

    if (!llc) {
      res.status(404).json({ error: 'LLC company not found' })
      return
    }

    // Prepare template data
    const templateData = prepareTemplateData(llc.company, llc.members)

    // Generate the first document type (for simplicity)
    const documentType = types[0]

    if (!documentType) {
      res.status(400).json({ error: 'No document type specified' })
      return
    }

    // Render HTML
    const html = await renderDocument(documentType, templateData)

    // Generate PDF
    const pdfBuffer = await generatePDF(html)

    // Set response headers
    const companyName = (llc.company as any).company_name || (llc.company as any).companyName
    const filename = generateFilename(companyName, documentType)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Length', pdfBuffer.length)

    // Send PDF
    res.send(pdfBuffer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      res.status(400).json({ error: firstError?.message ?? 'Validation error' })
      return
    }

    console.error('Error generating documents:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/llc/companies/:id/documents/:type/preview
 * Preview document as HTML (for debugging/preview)
 */
router.get('/llc/companies/:id/documents/:type/preview', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id, type } = req.params
    const llc = await getLLCCompanyById(id, req.user.userId)

    if (!llc) {
      res.status(404).json({ error: 'LLC company not found' })
      return
    }

    // Prepare template data
    const templateData = prepareTemplateData(llc.company, llc.members)

    // Render HTML
    const html = await renderDocument(type, templateData)

    // Send HTML for preview
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  } catch (error) {
    console.error('Error previewing document:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/llc/companies/:id/documents/:type/download
 * Download a specific document type as PDF
 */
router.get('/llc/companies/:id/documents/:type/download', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    const { id, type } = req.params
    const llc = await getLLCCompanyById(id, req.user.userId)

    if (!llc) {
      res.status(404).json({ error: 'LLC company not found' })
      return
    }

    // Prepare template data
    const templateData = prepareTemplateData(llc.company, llc.members)

    // Render HTML
    const html = await renderDocument(type, templateData)

    // Generate PDF
    const pdfBuffer = await generatePDF(html)

    // Set response headers
    const companyName = (llc.company as any).company_name || (llc.company as any).companyName
    const filename = generateFilename(companyName, type)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Length', pdfBuffer.length)

    // Send PDF
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error downloading document:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
