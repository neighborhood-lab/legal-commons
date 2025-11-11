# Legal Commons

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![CI](https://github.com/neighborhood-lab/legal-commons/actions/workflows/ci.yml/badge.svg)](https://github.com/neighborhood-lab/legal-commons/actions/workflows/ci.yml)
[![E2E Tests](https://github.com/neighborhood-lab/legal-commons/actions/workflows/e2e.yml/badge.svg)](https://github.com/neighborhood-lab/legal-commons/actions/workflows/e2e.yml)

**Open-source legal services platform democratizing access to legal document preparation and filing assistance.**

Legal Commons is a community-owned platform that provides free and accessible legal document preparation, filing assistance, and legal education to underserved communities including immigrants, low-income families, rural communities, and small business owners.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.9.0
- PostgreSQL (via Vercel Postgres recommended)
- Redis (for session management and caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/neighborhood-lab/legal-commons.git
cd legal-commons

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npm run db:migrate

# Seed demo data
npm run db:seed:demo

# Start development servers (web app + API)
npm run dev
```

The web app will be available at http://localhost:5173 and the API server at http://localhost:3000.

## 📦 Project Structure

This is a monorepo managed with npm workspaces and Turbo:

```
legal-commons/
├── packages/
│   ├── core/                 # Core business logic, database, utilities
│   ├── app/                  # Express API server
│   ├── web/                  # React web application
│   ├── shared-components/    # Reusable React components
│   └── verticals/            # Legal domain-specific features
│       ├── business-formation/
│       ├── estate-planning/
│       ├── family-law/
│       ├── immigration/
│       └── ...
├── showcase/                 # Marketing and demo site
├── e2e/                      # End-to-end tests (Playwright)
└── claude/                   # Task management (automated development)
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start all dev servers
npm run dev:web          # Start web app only
npm run dev:app          # Start API server only

# Building
npm run build            # Build all packages
npm run build:web        # Build web app
npm run build:app        # Build API server

# Testing
npm run test             # Run unit tests
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run E2E tests in UI mode

# Code Quality
npm run lint             # Lint all packages
npm run lint:fix         # Fix linting issues
npm run typecheck        # Type check all packages
npm run format           # Format code with Prettier

# Database
npm run db:migrate       # Run migrations
npm run db:seed:demo     # Seed demo data
npm run db:migrate:status # Check migration status
```

## 🎯 Core Features

### Phase 1: Business Formation (Current)
- LLC formation (50 states)
- Corporation formation
- Operating agreements
- State filing integration

### Upcoming Phases
- Estate Planning (wills, trusts, powers of attorney)
- Family Law (divorce, custody, adoption)
- Immigration (I-9, I-485, N-400, DACA)
- Housing Law (eviction defense, landlord-tenant)
- Employment Law (worker misclassification, wage theft)

## 🌍 Accessibility

Legal Commons is built with accessibility as a core principle:

- WCAG AAA compliance target
- Full keyboard navigation
- Screen reader optimized
- High contrast modes
- Multilingual support (10+ languages planned)
- Offline-first architecture for rural communities

## 🤝 Contributing

Legal Commons is community-driven. We welcome contributions from:

- **Developers**: Code, documentation, testing
- **Lawyers & Paralegals**: Template review, legal accuracy
- **Translators**: Localization for underrepresented communities
- **Designers**: UX/UI improvements
- **Community Organizers**: User research, feedback

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

This ensures that:
- The code remains open source forever
- Any modifications must be shared with the community
- The platform cannot be proprietized by commercial entities

See [LICENSE](LICENSE) for full details.

## 💬 Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community support and ideas
- **Security**: security@legal-commons.org (responsible disclosure)

## 🙏 Acknowledgments

Built on the shoulders of giants:
- Inspired by the Care Commons project architecture
- Standing for justice alongside legal aid organizations worldwide
- Dedicated to the underserved communities who deserve equal access to justice

---

**This is our commons. This is Legal Commons.**