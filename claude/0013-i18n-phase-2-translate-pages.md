# Task 0013: i18n Phase 2 - Translate All Page Components

## Status

- [x] To Do
- [ ] In Progress
- [ ] Completed

## Priority

High

## Description

Complete Spanish translations for all page components. Phase 1 (task #0010) established the i18n infrastructure and translated the header. This phase translates all remaining UI text: LoginPage, RegisterPage, DashboardPage, LLCFormationPage, and future HomePage. Serves 43 million Spanish speakers in the US.

## Acceptance Criteria

- [ ] Translate HomePage component (all sections)
- [ ] Translate LoginPage component (form fields, errors, links)
- [ ] Translate RegisterPage component (form fields, validation messages, role options)
- [ ] Translate DashboardPage component (empty states, card text, filters)
- [ ] Translate LLCFormationPage component (all 5 steps, field labels, help text)
- [ ] Translate Footer component (links, copyright)
- [ ] Replace all hardcoded strings with `t()` function calls
- [ ] Test language switching across all pages
- [ ] Verify translations are contextually appropriate
- [ ] Ensure formal "usted" tone throughout
- [ ] Test with screen reader in Spanish (if possible)
- [ ] Add date/number formatting for Spanish locale

## Technical Notes

### Translation Workflow

For each page component:

1. Read component file
2. Identify all hardcoded strings
3. Add translation keys to appropriate namespace JSON file
4. Replace strings with `useTranslation` hook + `t()` calls
5. Test in both English and Spanish

### Component Translation Map

| Component        | Namespace    | Translation Keys                                           |
| ---------------- | ------------ | ---------------------------------------------------------- |
| HomePage         | home         | hero, features, howItWorks, pricing, faq                   |
| LoginPage        | auth         | login.\*                                                   |
| RegisterPage     | auth         | register.\*                                                |
| DashboardPage    | dashboard    | title, welcome, empty, filters, cards                      |
| LLCFormationPage | llcFormation | steps, stateSelection, companyInfo, agent, members, review |
| Footer           | common       | footer.\*                                                  |

### Example Translation

**Before**:

```tsx
<h1>Welcome to Legal Commons</h1>
<p>Form your LLC in minutes</p>
```

**After**:

```tsx
const { t } = useTranslation('home');

<h1>{t('hero.title')}</h1>
<p>{t('hero.subtitle')}</p>
```

**Translation Files**:

```json
// en/home.json
{
  "hero": {
    "title": "Welcome to Legal Commons",
    "subtitle": "Form your LLC in minutes"
  }
}

// es/home.json
{
  "hero": {
    "title": "Bienvenido a Legal Commons",
    "subtitle": "Forme su LLC en minutos"
  }
}
```

### Date/Number Formatting

Use i18next interpolation for dates and numbers:

```typescript
t('dashboard.created', { date: new Date().toLocaleDateString(i18n.language) })
```

Or use Intl API:

```typescript
new Intl.DateTimeFormat(i18n.language).format(date)
new Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'USD' }).format(amount)
```

### Testing Strategy

1. **Manual Testing**: Click language switcher, navigate through all pages
2. **Visual Regression**: Compare screenshots EN vs ES
3. **Functional Testing**: Ensure all buttons/forms work in Spanish
4. **Accessibility**: Screen reader testing (VoiceOver in Spanish if available)

## Related Tasks

- Depends on: #0010 (i18n Phase 1 infrastructure)
- Blocks: #0014 (i18n Phase 3 - Document templates)
- Related to: #0012 (HomePage needs translations)
- Related to: #0011 (LLC formation flow needs translations)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (test in Spanish)
- [ ] Accessibility tested (screen reader compatibility)
- [ ] Documentation updated (translation guide for contributors)
- [ ] Migration script written (N/A)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
