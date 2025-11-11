# Task 0015: Fix Lint Warnings and Reduce Technical Debt

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

Medium

## Description

Address 14 accumulated lint warnings across app, core, and web packages. These warnings indicate code quality issues: console.log statements, `any` types, and high cognitive complexity functions. Fixing these improves maintainability and follows best practices.

## Acceptance Criteria

- [ ] Remove console.log statement in `app/src/index.ts:90`
- [ ] Fix 6 `@typescript-eslint/no-explicit-any` warnings in `app/src/routes/documents.ts`
- [ ] Reduce cognitive complexity in `app/src/routes/llc.ts:301` (currently 23, max 15)
- [ ] Fix 4 `@typescript-eslint/no-explicit-any` warnings in `core/src/documents/templates.ts` and `core/src/llc/index.ts`
- [ ] Reduce cognitive complexity in `core/src/llc/index.ts:216` (currently 24, max 15)
- [ ] Reduce cognitive complexity in `web/src/pages/RegisterPage.tsx:39` (currently 16, max 15)
- [ ] All lint checks pass with 0 warnings
- [ ] No functionality broken (all tests still pass)
- [ ] Type safety improved with proper types instead of `any`

## Technical Notes

### console.log Removal

Replace with proper logging (Pino) or remove if not needed.

### `any` Type Fixes

Locations to fix:

- `app/src/routes/documents.ts`: Lines 49, 104, 187 (likely template parameters)
- `core/src/documents/templates.ts`: Lines 11, 12 (template types)
- `core/src/llc/index.ts`: Lines 162, 171 (form data types)

Strategy:

1. Define proper interfaces for template data
2. Use `Record<string, unknown>` if truly dynamic
3. Use generics where appropriate

### Cognitive Complexity Reduction

Functions exceeding complexity limit:

- `app/src/routes/llc.ts:301` (23 → need to reduce by 8)
- `core/src/llc/index.ts:216` (24 → need to reduce by 9)
- `web/src/pages/RegisterPage.tsx:39` (16 → need to reduce by 1)

Refactoring strategies:

1. Extract helper functions
2. Use early returns to reduce nesting
3. Split complex conditions into named variables
4. Extract validation logic into separate functions

### Testing Strategy

- Run full test suite after each fix
- Verify no regressions in LLC formation flow
- Check document generation still works
- Ensure type checking passes

## Related Tasks

- Related to: All tasks (improves overall code quality)
- Unblocks: Future refactoring and feature work

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

## Completion Date

[YYYY-MM-DD]

## Notes

This is a code quality task (Priority 2: Developer Velocity). While not user-facing, it improves maintainability and prevents bugs. Following the principle of "Dedicate every 10th task to refactoring/debt paydown" - this is task #15, making it the perfect time.

### Impact

- Cleaner codebase for future contributors
- Better type safety reduces runtime errors
- Simpler functions are easier to test and debug
- Removes deprecated console.log patterns
