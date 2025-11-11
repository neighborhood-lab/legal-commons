# Task 0008: Expand LLC Multi-State Support

**Status**: In Progress  
**Branch**: `feature/multi-state-llc-support`  
**Priority**: High  
**Estimated Effort**: 3-4 hours

## Objective

Expand LLC formation support from California-only to include New York, Texas, Florida, and Delaware - the five most popular states for LLC formation.

## Background

Currently, the platform only supports California LLC formation. To serve a broader market, we need to add the four other most popular states:
- **New York**: High population, many small businesses
- **Texas**: Business-friendly, no state income tax
- **Florida**: Business-friendly, no state income tax, high population growth
- **Delaware**: Corporate law expertise, popular for multi-state businesses

## Technical Scope

### 1. Articles of Organization Templates
Create state-specific templates for:
- ✅ California (already implemented)
- ⏳ New York
- ⏳ Texas
- ⏳ Florida
- ⏳ Delaware (called "Certificate of Formation")

### 2. Jurisdiction Data
Update `packages/core/seeds/01_jurisdictions.ts` with:
- State-specific filing fees
- Processing times
- Publication requirements (NY)
- Registered agent requirements
- Annual report requirements

### 3. State-Specific Logic
- Template selection based on state code
- Validation rules per state
- Document naming conventions

### 4. Template Requirements

#### New York Specifics
- Publication requirement (must publish formation in newspapers)
- County of formation required
- Operating in NYC requires additional info
- Biennial reports required

#### Texas Specifics
- Registered agent required (can be individual or entity)
- Organizer information required
- Duration can be perpetual or specific
- Franchise tax requirements

#### Florida Specifics
- Registered agent required
- Principal office address required
- Authorized person signature required
- Annual reports due

#### Delaware Specifics
- Called "Certificate of Formation" not "Articles"
- Registered agent must be Delaware-based
- Very flexible formation requirements
- Annual franchise tax

## Implementation Plan

1. ✅ Create task document
2. ⏳ Add NY template
3. ⏳ Add TX template
4. ⏳ Add FL template
5. ⏳ Add DE template
6. ⏳ Update jurisdiction seeds
7. ⏳ Update template selection logic
8. ⏳ Test all state templates
9. ⏳ Create PR

## Files to Modify

- `packages/core/templates/llc/articles-of-organization/NY.html` (new)
- `packages/core/templates/llc/articles-of-organization/TX.html` (new)
- `packages/core/templates/llc/articles-of-organization/FL.html` (new)
- `packages/core/templates/llc/articles-of-organization/DE.html` (new)
- `packages/core/seeds/01_jurisdictions.ts` (update)
- `packages/core/src/documents/templates.ts` (verify template lookup logic)

## Testing Strategy

1. Generate documents for each state with test data
2. Verify state-specific fields are populated correctly
3. Check PDF output renders properly
4. Validate business logic (e.g., NY publication requirement noted)

## Success Criteria

- [ ] All 5 states have Articles/Certificate templates
- [ ] Jurisdiction seed data updated with accurate information
- [ ] Documents generate successfully for all states
- [ ] State-specific requirements are documented in templates
- [ ] All existing tests pass
- [ ] PR merged to develop

## Future Enhancements (Out of Scope)

- State-specific filing instructions
- Direct e-filing integration with state systems
- Automatic publication services for NY
- Registered agent services
- Compliance calendar/reminders

## Notes

- Using publicly available state formation document templates
- Not providing legal advice - templates are informational
- Users should review with attorney before filing
- Each state has unique requirements and fees
