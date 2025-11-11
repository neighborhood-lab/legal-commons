# Task 0014: Complete Remaining Page Translations (i18n Phase 2B)

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

Medium

## Description

Complete Spanish translations for remaining page components: LoginPage, RegisterPage, DashboardPage, LLCFormationPage, and Footer. Translation JSON files already exist from task #0010 - this task only requires wiring up components to use them. Completes the i18n Phase 2 work started in task #0013.

## Acceptance Criteria

- [ ] Update LoginPage to use `auth` namespace translations
- [ ] Update RegisterPage to use `auth` namespace translations
- [ ] Update DashboardPage to use `dashboard` namespace translations
- [ ] Update LLCFormationPage (all 5 steps) to use `llc-formation` namespace translations
- [ ] Update Footer to use `common` namespace translations
- [ ] Replace all hardcoded strings with `t()` function calls
- [ ] Test language switching across all translated pages
- [ ] Verify layouts work with longer Spanish text (no overflow issues)
- [ ] Verify all form validation messages appear in correct language
- [ ] Test error messages in both languages

## Technical Notes

### Pre-Existing Translation Files

All translation JSON files already exist and are complete:

- ✅ `locales/en/auth.json` (58 lines) - Login, Register, Password Reset
- ✅ `locales/es/auth.json` (58 lines) - Fully translated
- ✅ `locales/en/dashboard.json` (35 lines) - Dashboard UI
- ✅ `locales/es/dashboard.json` (35 lines) - Fully translated
- ✅ `locales/en/llc-formation.json` (84 lines) - All 5 steps
- ✅ `locales/es/llc-formation.json` (84 lines) - Fully translated
- ✅ `locales/en/common.json` (56 lines) - Footer, actions, status
- ✅ `locales/es/common.json` (56 lines) - Fully translated

### Implementation Pattern

For each component, follow this pattern:

```typescript
import { useTranslation } from 'react-i18next'

export function ComponentName() {
  const { t } = useTranslation('namespace')

  // Replace hardcoded strings
  return <div>{t('key.path')}</div>
}
```

### Components to Update

1. **LoginPage.tsx**

   - Import `useTranslation('auth')`
   - Replace: "Welcome back", "Sign in", form labels, error messages
   - Update Zod validation messages to use `t()`

2. **RegisterPage.tsx**

   - Import `useTranslation('auth')`
   - Replace: "Create Account", form labels, role options, terms text
   - Update Zod validation to use translated error messages

3. **DashboardPage.tsx**

   - Import `useTranslation('dashboard')`
   - Replace: Page title, welcome message, empty states, filters, card text

4. **LLCFormationPage.tsx + Steps**

   - Import `useTranslation('llc-formation')` in each step component
   - StateSelectionStep: State names, descriptions, "Select State" button
   - CompanyInfoStep: Form labels, help text, validation messages
   - RegisteredAgentStep: Form labels, help text for registered agent requirements
   - MembersStep: Add/remove member buttons, member form labels
   - ReviewStep: Section headers, "Submit" button, review instructions

5. **Footer.tsx** (in `components/layout/`)
   - Import `useTranslation('common')`
   - Replace: Footer links, copyright text

### Testing Strategy

1. **Manual Testing**:

   - Toggle language switcher on each page
   - Verify all text changes to Spanish
   - Check for layout issues (Spanish text is ~20% longer)
   - Test form validation in both languages
   - Trigger error states, verify error messages are translated

2. **Visual Checks**:

   - No text overflow
   - Buttons remain properly sized
   - Form fields align correctly
   - Modals and tooltips work in Spanish

3. **Functional Checks**:
   - Forms submit successfully in Spanish mode
   - Navigation works across all pages
   - Language preference persists across page changes

### Special Considerations

**Zod Schema Translations**:
Zod schemas need to be defined with translation functions. Two approaches:

```typescript
// Approach 1: Define schema inside component (has access to t())
export function LoginPage() {
  const { t } = useTranslation('auth')

  const loginSchema = z.object({
    email: z.string().email(t('errors.email_invalid')),
    password: z.string().min(1, t('errors.password_required')),
  })

  const form = useForm({ resolver: zodResolver(loginSchema) })
}
```

**Date/Time Formatting**:
Use browser's Intl API for locale-aware formatting:

```typescript
const { i18n } = useTranslation()
const formattedDate = new Intl.DateTimeFormat(i18n.language).format(date)
const formattedCurrency = new Intl.NumberFormat(i18n.language, {
  style: 'currency',
  currency: 'USD',
}).format(amount)
```

## Related Tasks

- Depends on: #0010 (i18n Phase 1 infrastructure + translation files)
- Depends on: #0013 (i18n Phase 2A - HomePage translation demonstrates pattern)
- Blocks: #0015 (Future: i18n Phase 3 - Document template translations)

## Completion Checklist

- [ ] Code implemented (all 5 pages + Footer)
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed (language switching works)
- [ ] Visual regression check (no layout breaks)
- [ ] Documentation updated (if needed)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

This task is purely mechanical - all translations already exist, just need to wire them up. Estimated completion time: 1-2 hours.

Key insight from task #0013: HomePage pattern works well, just replicate across remaining pages.

### Files to Modify

- `packages/web/src/pages/LoginPage.tsx`
- `packages/web/src/pages/RegisterPage.tsx`
- `packages/web/src/pages/DashboardPage.tsx`
- `packages/web/src/pages/llc-formation/LLCFormationPage.tsx`
- `packages/web/src/pages/llc-formation/steps/StateSelectionStep.tsx`
- `packages/web/src/pages/llc-formation/steps/CompanyInfoStep.tsx`
- `packages/web/src/pages/llc-formation/steps/RegisteredAgentStep.tsx`
- `packages/web/src/pages/llc-formation/steps/MembersStep.tsx`
- `packages/web/src/pages/llc-formation/steps/ReviewStep.tsx`
- `packages/web/src/components/layout/Footer.tsx`

Total: 10 files to update
