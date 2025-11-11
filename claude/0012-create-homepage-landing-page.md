# Task 0012: Create Homepage/Landing Page

## Status

- [ ] To Do
- [x] In Progress
- [ ] Completed

## Priority

High

## Description

Build a compelling homepage/landing page that introduces Legal Commons, explains the value proposition, and guides visitors to key actions (register, start LLC formation). Currently the app has no proper entry point for new users. This is critical for user acquisition and serves underserved communities by clearly communicating accessibility.

## Acceptance Criteria

- [ ] Hero section with clear value proposition ("Affordable LLC formation for everyone")
- [ ] Highlight serving underserved communities (Spanish language, low cost, accessible)
- [ ] Feature highlights (5-state support, instant documents, no lawyer needed)
- [ ] Pricing information (free or low-cost, vs. LegalZoom $500+)
- [ ] Clear CTAs (Get Started, Start LLC Formation, View Pricing)
- [ ] Social proof section (testimonials placeholder, trust indicators)
- [ ] How it works section (3-step process: Fill Form → Generate Documents → File with State)
- [ ] State coverage map or list (CA, NY, TX, FL, DE)
- [ ] FAQ section (common questions about LLC formation)
- [ ] Mobile-responsive design
- [ ] Accessibility: WCAG AAA compliant, semantic HTML
- [ ] SEO: proper meta tags, structured data, sitemap entry

## Technical Notes

### Design Inspiration

- **Stripe**: Clean, modern, developer-friendly
- **Airbnb**: Trust indicators, clear value prop
- **LegalZoom**: Direct competitor reference (but simpler, cheaper, more accessible)

### Content Strategy

**Hero Headline**: "Form Your LLC in Minutes, Not Months"
**Subheadline**: "Affordable, accessible legal document preparation for entrepreneurs. No lawyer required."

**Value Props**:

1. **Fast**: Complete in 10 minutes
2. **Affordable**: Free or low-cost (vs. $500-2000 with lawyers)
3. **Accessible**: Spanish language support, plain English explanations
4. **Trustworthy**: Professional legal documents, state-compliant

### Components to Build

1. **HeroSection.tsx**: Large headline, CTA buttons, hero image/illustration
2. **FeaturesSection.tsx**: 3-column grid of features with icons
3. **HowItWorksSection.tsx**: 3-step process with visual flow
4. **PricingSection.tsx**: Pricing table (free tier, premium features)
5. **StatesSection.tsx**: Visual representation of supported states
6. **FAQSection.tsx**: Accordion-style FAQ items
7. **CTASection.tsx**: Final call-to-action before footer

### Routing

- Route: `/` (homepage)
- Logged-out users see full landing page
- Logged-in users may see personalized dashboard link or redirect to dashboard

### Translations

- Add homepage translations to i18n files (en/home.json, es/home.json)
- Ensure Spanish version is equally compelling

### SEO

```html
<title>Legal Commons - Affordable LLC Formation | Form Your Business Today</title>
<meta
  name="description"
  content="Form your LLC in minutes with Legal Commons. Affordable, accessible legal document preparation for entrepreneurs. Support for CA, NY, TX, FL, and DE. Spanish language available."
/>
<meta property="og:type" content="website" />
<meta property="og:title" content="Legal Commons - Affordable LLC Formation" />
<meta
  property="og:description"
  content="Form your LLC in minutes. Affordable and accessible for everyone."
/>
```

## Related Tasks

- Depends on: #0003 (Web app foundation)
- Blocks: None (but improves user acquisition)
- Related to: #0010 (Spanish translations needed for homepage)
- Related to: #0011 (CTA buttons link to LLC formation flow)

## Completion Checklist

- [ ] Code implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (if applicable)
- [ ] E2E tests written and passing (navigation from homepage)
- [ ] Accessibility tested (Lighthouse score 100/100)
- [ ] Documentation updated (component docs)
- [ ] Migration script written (N/A)
- [ ] PR created, checks passing
- [ ] PR merged to develop
- [ ] Post-merge checks passing

## Completion Date

[YYYY-MM-DD]

## Notes

[Post-completion reflections, lessons learned, future improvements]
