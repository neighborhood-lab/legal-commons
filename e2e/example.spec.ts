import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Example E2E Test', () => {
  test('should have accessible homepage', async ({ page }) => {
    await page.goto('/')

    // Run accessibility audit
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
