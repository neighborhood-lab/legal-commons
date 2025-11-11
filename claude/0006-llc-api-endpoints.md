# Task 0006: LLC API Endpoints

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

High

## Description

Implement backend API endpoints for LLC formation workflow CRUD operations. This includes creating, reading, updating, and deleting LLC companies and members, validating business rules, and integrating with the frontend questionnaire from task 0004.

## Acceptance Criteria

- [ ] POST /api/llc/companies - Create new LLC company
- [ ] GET /api/llc/companies/:id - Retrieve LLC company details
- [ ] PATCH /api/llc/companies/:id - Update LLC company
- [ ] DELETE /api/llc/companies/:id - Delete LLC company (soft delete)
- [ ] POST /api/llc/companies/:id/members - Add member to LLC
- [ ] PATCH /api/llc/members/:id - Update member details
- [ ] DELETE /api/llc/members/:id - Remove member from LLC
- [ ] GET /api/llc/companies/:id/preview - Generate preview of company data
- [ ] Business logic: Ownership percentages must total 100%
- [ ] Business logic: At least one member required
- [ ] Business logic: Member-managed LLCs can have manager=true members
- [ ] Integration with auth middleware (users can only access their own LLCs)
- [ ] Input validation using Zod schemas
- [ ] Error handling with proper HTTP status codes
- [ ] Unit tests for all endpoints
- [ ] Integration tests for full workflow

## Technical Notes

- Reuse TypeScript types from `packages/core/src/types.ts` (LLCCompany, LLCMember)
- Implement in `packages/app/src/routes/llc.ts`
- Use Zod for request validation (share schemas with frontend where possible)
- Ensure proper foreign key relationships (user_id, document_id)
- Return appropriate 400/401/403/404/500 status codes
- Consider pagination for future "list all companies" endpoint
- Soft delete: Set deleted_at timestamp instead of removing records

## Related Tasks

- Depends on: #0004 (LLC formation UI and database schema)
- Depends on: #0002 (Auth middleware for protected routes)
- Blocks: #0007 (Document generation needs company data from API)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (if applicable)
- [ ] Accessibility tested (if UI changes - N/A)
- [ ] Documentation updated (API documentation)
- [ ] Migration script written (if database changes - N/A, already done in 0004)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing
- [ ] Deployed to staging (via Vercel preview)
- [ ] Smoke tested in staging

## Completion Date

[YYYY-MM-DD]

## Notes

### API Design

**POST /api/llc/companies**
Request:
```json
{
  "state": "CA",
  "company_name": "Acme Widgets LLC",
  "business_purpose": "Software consulting",
  "management_type": "member_managed",
  "registered_agent_name": "John Doe",
  "registered_agent_address": "123 Main St",
  "registered_agent_city": "Los Angeles",
  "registered_agent_state": "CA",
  "registered_agent_zip": "90001",
  "principal_office_address": "123 Main St",
  "principal_office_city": "Los Angeles",
  "principal_office_state": "CA",
  "principal_office_zip": "90001",
  "members": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90001",
      "ownership_percentage": 60.0,
      "is_manager": true
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "address": "456 Oak Ave",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90002",
      "ownership_percentage": 40.0,
      "is_manager": false
    }
  ]
}
```

Response:
```json
{
  "id": 123,
  "user_id": 1,
  "state": "CA",
  "company_name": "Acme Widgets LLC",
  "status": "draft",
  "created_at": "2025-11-11T12:00:00Z",
  "updated_at": "2025-11-11T12:00:00Z",
  "members": [...]
}
```

### Error Handling Examples

- 400 Bad Request: Ownership percentages don't total 100%
- 401 Unauthorized: No valid JWT token
- 403 Forbidden: User trying to access another user's LLC
- 404 Not Found: LLC company ID doesn't exist
- 409 Conflict: Business name already exists for this user
- 500 Internal Server Error: Database connection failure

[Post-completion reflections, lessons learned, future improvements]
