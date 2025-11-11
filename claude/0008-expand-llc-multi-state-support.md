# Task 0008: Expand LLC Multi-State Support

## Status

- [x] To Do
- [ ] In Progress
- [ ] Completed

## Priority

High

## Description

Expand LLC formation support beyond California to include New York, Texas, Florida, and Delaware. These states represent the majority of LLC formations in the US and each has unique requirements. This task builds on the existing CA template infrastructure to support multi-state operations.

## Acceptance Criteria

- [ ] Articles of Organization template for New York
- [ ] Articles of Organization template for Texas
- [ ] Articles of Organization template for Florida
- [ ] Articles of Organization template for Delaware
- [ ] State-specific business rules and validations
- [ ] State-specific filing fee information
- [ ] State jurisdiction data seeded in database
- [ ] Filing Instructions documents for each state
- [ ] Template fallback logic tested (uses CA if state missing)
- [ ] API returns correct template based on LLC state
- [ ] Unit tests for each state's unique requirements
- [ ] Documentation of state-specific requirements

## Technical Notes

### State-Specific Requirements

**New York**:
- Requires publication in two newspapers (one daily, one weekly) for 6 consecutive weeks
- Must file Certificate of Publication within 120 days
- Registered agent must be NY resident or authorized business entity
- Higher filing fees (~$200)

**Texas**:
- Series LLC option available (parent LLC with multiple series)
- Professional LLC option for licensed professionals
- Registered agent must have TX street address (no PO boxes)
- Filing fee: $300

**Florida**:
- Requires annual report filed between January 1 and May 1
- Must designate registered agent with FL street address
- Filing fee: $125
- Optional: Name reservation ($35)

**Delaware**:
- Popular for venture-backed startups (corporate law advantages)
- Franchise tax due annually
- Registered agent must be DE resident or authorized entity
- Filing fee: $90
- Very minimal requirements (privacy-friendly)

**Nevada** (Future consideration):
- No corporate income tax
- Strong privacy protections
- Popular for asset protection

### Template Structure

Continue using existing pattern:
```
packages/core/templates/llc/articles-of-organization/
  CA.html (existing)
  NY.html (new)
  TX.html (new)
  FL.html (new)
  DE.html (new)
```

### Database Updates

Update `jurisdictions` table with state-specific data:
- Filing fees
- Processing times
- Publication requirements
- Annual report requirements
- Franchise tax information
- Registered agent requirements

## Related Tasks

- Depends on: #0007 (Document generation system exists)
- Blocks: #0010 (E-filing integration needs multi-state support)
- Related to: #0004 (LLC formation UI may need state-specific fields)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (if applicable)
- [ ] Accessibility tested (if UI changes)
- [ ] Documentation updated (state requirements guide)
- [ ] Migration script written (seed jurisdictions data)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
