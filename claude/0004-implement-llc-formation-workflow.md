# Task 0004: Implement LLC Formation Workflow

## Status

- [x] To Do
- [ ] In Progress
- [ ] Completed

## Priority

High

## Description

Build the complete LLC formation workflow: multi-step questionnaire, state-specific form generation, PDF creation, and filing fee calculation. This is the FIRST user-facing legal vertical and validates the entire document assembly pipeline.

## Acceptance Criteria

- [ ] Multi-step questionnaire component (React Hook Form)
- [ ] State selection with jurisdiction-specific questions
- [ ] Business name availability check (mock for now)
- [ ] Member management UI (single-member vs multi-member)
- [ ] Operating agreement template (Markdown with variable interpolation)
- [ ] Articles of Organization template (state-specific)
- [ ] PDF generation (Puppeteer or PDFKit)
- [ ] Filing fee calculation by state
- [ ] Document preview before download
- [ ] Save draft functionality (WatermelonDB for offline)
- [ ] Download generated documents as ZIP

## Technical Notes

- Start with 5 states: CA, NY, TX, FL, DE (most common)
- Template storage: JSON schema in database, Markdown content in files
- PDF generation should handle multi-page documents with headers/footers
- Estimate 50-100 state-specific questions per state
- Include plain-language explanations for legal terms

## Related Tasks

- Depends on: #0003 (Web app foundation)
- Depends on: #0001 (Documents table)
- Blocks: #0010 (E-filing integration)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (if applicable)
- [ ] Accessibility tested (if UI changes)
- [ ] Documentation updated (if new API/component)
- [ ] Migration script written (if database changes)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing
- [ ] Deployed to staging (via Vercel preview)
- [ ] Smoke tested in staging

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
