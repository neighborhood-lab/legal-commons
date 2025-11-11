# Task 0007: LLC Document Generation

## Status

- [ ] To Do
- [ ] In Progress
- [ ] Completed

## Priority

High

## Description

Build document generation system for LLC formation, including Operating Agreement and Articles of Organization templates with variable interpolation, PDF export, and state-specific customization. This completes the end-to-end LLC formation workflow.

## Acceptance Criteria

- [ ] Template engine for Markdown/HTML with variable interpolation
- [ ] Operating Agreement template (single-member and multi-member variants)
- [ ] Articles of Organization template (state-specific: CA, NY, TX, FL, DE)
- [ ] PDF generation from templates (Puppeteer or PDFKit)
- [ ] GET /api/llc/companies/:id/documents - List generated documents
- [ ] POST /api/llc/companies/:id/generate - Generate all documents
- [ ] GET /api/llc/documents/:id/preview - Preview document HTML
- [ ] GET /api/llc/documents/:id/download - Download PDF
- [ ] POST /api/llc/companies/:id/download-zip - Download all documents as ZIP
- [ ] Document storage in database with metadata
- [ ] Template versioning (track which template version was used)
- [ ] State-specific filing instructions document
- [ ] Unit tests for template rendering
- [ ] Integration tests for PDF generation

## Technical Notes

### Template Engine Options
1. **Handlebars** - Simple variable interpolation, conditionals, loops
2. **Mustache** - Logic-less templates
3. **EJS** - Embedded JavaScript
4. **Recommendation**: Start with Handlebars for balance of simplicity and power

### PDF Generation Options
1. **Puppeteer** - Renders HTML to PDF (Chrome headless)
   - Pros: Full CSS support, easy styling
   - Cons: Heavy (300MB+ with Chrome), slower
2. **PDFKit** - Programmatic PDF generation
   - Pros: Lightweight, fast, precise control
   - Cons: More complex for formatted documents

**Recommendation**: Use Puppeteer for initial implementation (easier for legal documents with complex formatting)

### Template Storage
- Store templates in `packages/core/templates/llc/`
- Separate directories per state: `templates/llc/operating-agreement/`, `templates/llc/articles-of-organization/{state}/`
- Use Markdown for authoring, convert to HTML for PDF rendering
- Track template version in `documents` table

### State-Specific Requirements
- **California**: Requires specific business purpose language, publication requirement notice
- **New York**: Requires publication in newspapers
- **Delaware**: Minimal requirements, registered agent must be DE resident
- **Texas**: Series LLC option available
- **Florida**: Annual report required

## Related Tasks

- Depends on: #0006 (LLC API endpoints for data retrieval)
- Depends on: #0004 (LLC formation data schema)
- Blocks: #0010 (E-filing integration requires generated documents)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (if applicable)
- [ ] Accessibility tested (if UI changes)
- [ ] Documentation updated (template authoring guide)
- [ ] Migration script written (if database changes)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing
- [ ] Deployed to staging (via Vercel preview)
- [ ] Smoke tested in staging

## Completion Date

[YYYY-MM-DD]

## Notes

### Operating Agreement Sections

1. **Formation**: Company name, state, effective date
2. **Members**: Names, addresses, ownership percentages
3. **Management**: Member-managed vs manager-managed, duties, voting
4. **Capital Contributions**: Initial contributions, future contributions
5. **Distributions**: Profit/loss allocation, distribution timing
6. **Transfer of Interest**: Restrictions, right of first refusal
7. **Dissolution**: Events triggering dissolution, winding up process
8. **Miscellaneous**: Amendments, governing law, signatures

### Articles of Organization Sections

1. **LLC Name**: Full legal name with "LLC" designation
2. **Purpose**: Business purpose (state-specific requirements)
3. **Registered Agent**: Name and address (must be in-state)
4. **Principal Office**: Business address
5. **Management**: Statement of management structure
6. **Duration**: Perpetual or specified term
7. **Organizer**: Person filing the documents
8. **Effective Date**: When LLC becomes active

### File Naming Convention
- `{company_name}_Operating_Agreement_{date}.pdf`
- `{company_name}_Articles_of_Organization_{state}_{date}.pdf`
- `{company_name}_Filing_Instructions_{state}_{date}.pdf`
- ZIP: `{company_name}_LLC_Formation_Package_{date}.zip`

[Post-completion reflections, lessons learned, future improvements]
