/**
 * PDF generation service using Puppeteer
 */

import puppeteer, { type Browser, type Page } from 'puppeteer'

let browser: Browser | null = null

/**
 * Get or create a Puppeteer browser instance
 */
async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.connected) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    })
  }
  return browser
}

/**
 * Generate PDF from HTML content
 */
export async function generatePDF(
  html: string,
  options: {
    filename?: string
    format?: 'Letter' | 'Legal' | 'A4'
    margin?: { top?: string; right?: string; bottom?: string; left?: string }
  } = {}
): Promise<Buffer> {
  const browserInstance = await getBrowser()
  const page: Page = await browserInstance.newPage()

  try {
    // Set content with a base URL for relative resources
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: options.format || 'Letter',
      margin: options.margin || {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in',
      },
      printBackground: true,
    })

    return Buffer.from(pdfBuffer)
  } finally {
    await page.close()
  }
}

/**
 * Close the browser instance (call on app shutdown)
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close()
    browser = null
  }
}

/**
 * Generate filename for a document
 */
export function generateFilename(
  companyName: string,
  documentType: string,
  extension: string = 'pdf'
): string {
  // Sanitize company name for filename
  const sanitized = companyName
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '_')
    .substring(0, 50)
  
  const date = new Date().toISOString().split('T')[0]
  
  const typeMap: Record<string, string> = {
    'operating-agreement': 'Operating_Agreement',
    'articles-of-organization': 'Articles_of_Organization',
  }
  
  const typeName = typeMap[documentType] || documentType
  
  return `${sanitized}_${typeName}_${date}.${extension}`
}
