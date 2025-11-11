# Task 0010: Spanish Language Support (i18n)

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

High

## Description

Implement internationalization (i18n) framework and add complete Spanish translations for the entire application. Many underserved communities in the US are Spanish-speaking, and providing LLC formation in Spanish dramatically increases accessibility for immigrant entrepreneurs. This is a justice priority.

## Acceptance Criteria

### Phase 1 - Infrastructure (✅ Completed - PR #11)

- [x] i18n framework installed and configured (react-i18next)
- [x] Language switcher in header (EN/ES)
- [x] Translation file structure created (common, auth, dashboard, llc-formation)
- [x] English and Spanish translations for header navigation
- [x] Translation keys follow naming convention (namespaced, camelCase)
- [x] Language preference persists in localStorage

### Phase 2 - UI Translations (⏳ Next PR)

- [ ] Translate HomePage component
- [ ] Translate LoginPage component
- [ ] Translate RegisterPage component
- [ ] Translate DashboardPage component
- [ ] Translate LLCFormationPage component (all 5 steps)
- [ ] Spanish translations for error messages
- [ ] Date/number formatting respects locale

### Phase 3 - Document Templates (🔄 Future)

- [ ] Spanish Operating Agreement template (single-member)
- [ ] Spanish Operating Agreement template (multi-member)
- [ ] Spanish Articles of Organization - CA
- [ ] Spanish Articles of Organization - NY
- [ ] Spanish Articles of Organization - TX
- [ ] Spanish Articles of Organization - FL
- [ ] Spanish Articles of Organization - DE

### Phase 4 - Backend Integration (🔄 Future)

- [ ] Add `language` field to users table (migration)
- [ ] Update user profile API to persist language
- [ ] Document generation accepts `lang` parameter
- [ ] Spanish email templates (verification, password reset)

### Phase 5 - Polish (🔄 Future)

- [ ] SEO: Spanish pages have proper lang tags
- [ ] RTL support architecture (for future Arabic)
- [ ] Unit tests for i18n utilities
- [ ] E2E tests in Spanish language
- [ ] Professional translation review by bilingual legal expert

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

### Phase 1 (MVP Infrastructure)

- [x] Code implemented (i18n framework, LanguageSwitcher, Header translations)
- [x] All existing unit tests passing (22 tests)
- [x] TypeCheck passing
- [x] Lint passing
- [x] Build passing
- [x] PR #11 created, 5/7 checks passing
- [x] PR merged to develop (commit d5b1150)
- [x] Post-merge checks passing

### Phases 2-5

- [ ] Remaining implementation (see Acceptance Criteria above)

## Completion Date (Phase 1)

2025-11-11

## Notes

### Phase 1 Implementation Summary (MVP)

Successfully established i18n infrastructure for Spanish language support, enabling future translation work across the application.

**Delivered**:

- i18next ecosystem installed (i18next, react-i18next, i18next-browser-languagedetector)
- LanguageSwitcher component with 🇺🇸/🇪🇸 flag icons
- Complete translation file structure for all namespaces
- Header navigation fully translated (Home, Dashboard, Login, Register, Logout)
- Language preference persists in localStorage
- Automatic browser language detection

**Code Changes**: 701 lines added (16 files changed)

- Dependencies: 3 npm packages
- Translation files: 8 JSON files (4 EN + 4 ES, ~330 lines)
- Components: LanguageSwitcher.tsx (43 lines)
- Configuration: i18n.ts (63 lines)
- Modified: Header.tsx, main.tsx, tsconfig.json

**Quality**: 5/7 CI checks passing (Build ✅, Lint ✅, TypeCheck ✅, Tests ✅, Security ✅)

### Technical Decisions

1. **Namespace Strategy**: Split translations into logical namespaces (common, auth, dashboard, llc Formation) for better organization and code splitting potential.

2. **Formal Spanish**: Used formal "usted" form throughout for professional tone suitable for legal services.

3. **Region-Neutral**: Avoided regionalisms (e.g., no "vosotros" from Spain, no Argentine/Mexican slang) to appeal to all Spanish-speaking users.

4. **Legal Term Translation**:

   - LLC → "LLC" (kept English acronym as it's widely recognized)
   - Operating Agreement → "Acuerdo Operativo"
   - Articles of Organization → "Artículos de Organización"
   - Registered Agent → "Agente Registrado"

5. **Browser Language Detection**: Automatically detects user's browser language on first visit, with manual override via LanguageSwitcher.

6. **LocalStorage Persistence**: Language choice cached in localStorage for returning users (no database integration in Phase 1).

### Lessons Learned

1. **TypeScript JSON Imports**: Required `"resolveJsonModule": true` in tsconfig.json and explicit file extension inclusion pattern.

2. **Translation File Size**: Even with only header translated, translation files are substantial (~50-85 lines each). Full app translation will be significant effort.

3. **Flag Icons**: Emoji flags (🇺🇸/🇪🇸) provide visual clarity without requiring image assets.

4. **Incremental Shipping**: Breaking i18n into phases allows immediate value delivery (framework is ready for anyone to contribute translations) without blocking on complete translation.

### Justice Impact

**Before (Phase 1)**: All UI text in English only
**After (Phase 1)**: Infrastructure ready, header navigation in Spanish
**Potential**: 43 million Spanish speakers in the US can now see language switcher and understand that Spanish support is coming
**Underserved**: Signals to Spanish-speaking immigrant entrepreneurs that this platform is for them

### Future Work (Phases 2-5)

**Phase 2 - UI Translations** (Estimated: 4-6 hours):

- Translate all page components using `useTranslation` hook
- Replace hardcoded strings with translation keys
- Test language switching across all pages

**Phase 3 - Document Templates** (Estimated: 8-10 hours):

- Create Spanish versions of all HTML templates
- Work with bilingual legal expert for accuracy
- Test PDF generation in Spanish

**Phase 4 - Backend Integration** (Estimated: 2-3 hours):

- Add `language` column to `users` table
- Update user profile endpoints
- Modify document generation API to accept `lang` parameter
- Create Spanish email templates

**Phase 5 - Polish** (Estimated: 3-4 hours):

- Add SEO meta tags for language
- Create i18n utility tests
- E2E testing in Spanish
- Professional translation review

**Total Remaining Effort**: 17-23 hours (you: 1-2 hours at 10-100x speed)
