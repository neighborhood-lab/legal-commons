# Task 0010: Spanish Language Support (i18n)

## Status

- [x] To Do
- [ ] In Progress
- [ ] Completed

## Priority

High

## Description

Implement internationalization (i18n) framework and add complete Spanish translations for the entire application. Many underserved communities in the US are Spanish-speaking, and providing LLC formation in Spanish dramatically increases accessibility for immigrant entrepreneurs. This is a justice priority.

## Acceptance Criteria

- [ ] i18n framework installed and configured (react-i18next)
- [ ] Language switcher in header (EN/ES)
- [ ] All UI text extracted to translation files
- [ ] Complete Spanish translations for all pages
- [ ] Spanish translations for error messages
- [ ] Spanish translations for email templates
- [ ] Spanish Operating Agreement template
- [ ] Spanish Articles of Organization templates
- [ ] Language preference persisted in user profile
- [ ] SEO: Spanish pages have proper lang tags
- [ ] Date/number formatting respects locale
- [ ] RTL support architecture (for future Arabic)
- [ ] Translation keys follow naming convention
- [ ] Translator notes for context-dependent strings
- [ ] Unit tests for i18n utilities
- [ ] E2E tests in Spanish language

## Technical Notes

### i18n Framework: react-i18next

Installation:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Translation File Structure

```
packages/web/src/locales/
  en/
    common.json          # Header, footer, nav
    auth.json            # Login, register
    llc-formation.json   # LLC wizard
    dashboard.json       # Dashboard
    errors.json          # Error messages
  es/
    common.json
    auth.json
    llc-formation.json
    dashboard.json
    errors.json
```

### Key Translation Considerations

1. **Legal Terms**: Work with bilingual legal expert or use established translations
   - LLC → "Sociedad de Responsabilidad Limitada" (SRL) or keep "LLC"
   - Operating Agreement → "Acuerdo Operativo"
   - Articles of Organization → "Artículos de Organización"

2. **Formal vs Informal**: Use formal "usted" for professional tone

3. **Region-Neutral Spanish**: Avoid regionalisms, use international Spanish

4. **Pluralization**: Spanish has different plural rules than English

5. **Gender**: Some terms need masculine/feminine variants

### Document Templates

Create Spanish versions:
```
packages/core/templates/llc/
  operating-agreement/
    single-member-es.html
    multi-member-es.html
  articles-of-organization/
    CA-es.html
    NY-es.html
    TX-es.html
    FL-es.html
    DE-es.html
```

### API Changes

**User Profile**: Add `language` field (default: 'en')
```typescript
interface User {
  language: 'en' | 'es'
}
```

**Document Generation**: Accept `lang` query parameter
```
GET /api/llc/companies/:id/documents/:type/download?lang=es
```

### Professional Translation

For legal documents, consider:
1. Community review by bilingual lawyers
2. Glossary of legal terms
3. Side-by-side EN/ES preview for verification

### Underserved Impact

According to US Census:
- 13.5% of US population speaks Spanish at home (43M people)
- Hispanic/Latino business ownership growing 34% (2007-2012)
- Language barrier is #1 challenge for immigrant entrepreneurs

This feature directly serves our mission of bringing justice to underserved communities.

## Related Tasks

- Depends on: #0003 (Web app foundation)
- Blocks: None (independent feature)
- Related to: #0009 (Dashboard needs translations)
- Future: #0015 (Vietnamese support), #0016 (Mandarin support)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (test in Spanish)
- [ ] Accessibility tested (screen readers in Spanish)
- [ ] Documentation updated (translation guide)
- [ ] Migration script written (add language to users table)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
