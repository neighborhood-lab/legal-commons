# Task 0001: Setup Vercel Postgres Database

## Status
- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority
High

## Description
Configure Vercel Postgres database integration with Knex ORM, including initial schema design for users, documents, templates, jurisdictions, and audit logs. Set up migration system and seed scripts for development/demo data.

## Acceptance Criteria
- [ ] Vercel Postgres integration configured
- [ ] Knex configuration with connection pooling
- [ ] Initial database schema migration (users, documents, templates, jurisdictions, filings, attorneys, consultations, case_notes, audit_logs)
- [ ] Migration runner scripts (up, down, status)
- [ ] Seed script for demo data
- [ ] Environment variables documented in .env.example
- [ ] Database connection health check endpoint

## Technical Notes
- Use Knex 3.1.0 (not Prisma) per tech stack
- Connection pooling: min 2, max 10
- All timestamps should be UTC
- Sensitive fields (case_notes) require encryption strategy (document for future implementation)
- Follow PostgreSQL naming conventions (snake_case)

## Related Tasks
- Depends on: #0000 (Core package must exist)
- Blocks: #0003 (Auth requires users table)

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
