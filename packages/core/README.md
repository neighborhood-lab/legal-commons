# @legal-commons/core

Core business logic, database, and shared utilities for Legal Commons.

## Database Setup

This package manages the Vercel Postgres database using Knex migrations.

### Environment Variables

Add to your `.env.local`:

```bash
# Vercel Postgres (preferred for serverless)
DATABASE_URL="postgres://default:xxx@xxx.vercel-storage.com:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:xxx@xxx.vercel-storage.com:5432/verceldb"

# OR for local development
DATABASE_URL="postgresql://user:password@localhost:5432/legal_commons_dev"
```

### Migration Commands

```bash
# Run pending migrations
npm run db:migrate

# Create a new migration
npm run db:migrate:make -- create_my_table

# Rollback last migration batch
npm run db:migrate:rollback

# Check migration status
npm run db:migrate:status

# Seed demo data
npm run db:seed:demo

# DANGER: Drop all tables (development only)
npm run db:nuke -- --confirm
```

### Database Schema

#### Users

- Authentication and profile information
- Roles: client, attorney, admin, legal_aid_coordinator
- Email verification tracking

#### Jurisdictions

- State and county-specific requirements
- Filing fees by entity type
- Legal requirements and regulations

#### Templates

- Legal document templates
- Category-specific (business formation, estate planning, etc.)
- JSON Schema for form validation
- Markdown content with variable interpolation

#### Documents

- User-generated documents from templates
- Form data (answers to questionnaires)
- Status tracking (draft → completed → filed)
- PDF generation URLs

#### Attorneys

- Bar number and state registration
- Practice areas
- Pro bono availability
- Verification status

#### Consultations

- Scheduled attorney-client consultations
- Meeting URLs and notes
- Status tracking

#### Case Notes

- Sensitive information storage (encrypted at application level)
- Linked to documents and consultations

#### Filings

- Court e-filing tracking
- Submission status and confirmations
- Rejection handling

#### Audit Logs

- Comprehensive activity tracking
- User actions and data changes
- Security and compliance

## Development

```bash
# Build
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Test
npm run test
```
