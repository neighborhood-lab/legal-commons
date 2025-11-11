# Task 0011: Connect LLC Formation Frontend to Backend

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

High

## Description

Wire up the LLC formation questionnaire frontend (currently UI-only from task #0004) to the backend API endpoints (from task #0006). Enable users to actually submit LLC formations, save drafts, and generate documents. This completes the end-to-end LLC formation workflow.

## Acceptance Criteria

- [ ] Update LLCFormationPage to call POST /api/llc/companies on form submission
- [ ] Display success message and redirect to dashboard after successful submission
- [ ] Handle API errors gracefully with user-friendly error messages
- [ ] Add loading states during API calls (spinner, disabled submit button)
- [ ] Integrate document generation: "Generate Documents" button on success page
- [ ] Save form data to API as user progresses (auto-save draft functionality)
- [ ] Load existing LLC data for editing (if user navigates back to formation page)
- [ ] Validate ownership percentages client-side before submission (must equal 100%)
- [ ] Display filing fees from API based on selected state
- [ ] Test full workflow: form → submit → dashboard → download documents

## Technical Notes

### API Integration Points

**Create LLC**:
```typescript
POST /api/llc/companies
Body: {
  state, company_name, business_purpose, management_type,
  registered_agent_*, principal_office_*,
  members: Array<Member>
}
Response: { id, ...llcData }
```

**Generate Documents**:
```typescript
GET /api/llc/companies/:id/documents
Response: Array<{ type, name }>

POST /api/llc/companies/:id/documents/:type/download
Response: PDF file
```

### Form State Management

- Use React state for form data during questionnaire
- On each step completion, optionally save to backend (draft mode)
- On final submission, POST complete data
- Store returned LLC ID in localStorage or React state for document generation

### Error Handling

- Network errors: "Unable to connect. Please check your internet connection."
- Validation errors (400): Display specific field errors
- Auth errors (401): Redirect to login
- Server errors (500): "Something went wrong. Please try again."

### UX Considerations

- Show loading spinner during API calls
- Disable submit button while submitting
- Display success toast notification
- Redirect to dashboard with success message
- Add "View My LLCs" button on success page

## Related Tasks

- Depends on: #0004 (LLC formation UI exists)
- Depends on: #0006 (LLC API endpoints exist)
- Depends on: #0007 (Document generation endpoints exist)
- Blocks: None (completes core workflow)
- Related to: #0009 (Dashboard displays submitted LLCs)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (full form submission flow)
- [ ] Accessibility tested (error messages, loading states)
- [ ] Documentation updated (API integration docs)
- [ ] Migration script written (N/A - no schema changes)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
