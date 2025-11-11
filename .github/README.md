# CI/CD Configuration

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Workflows

### CI (`ci.yml`)

Runs on all pull requests and pushes to `develop` and `main`:

- **Lint**: ESLint checks for code quality
- **Type Check**: TypeScript type validation
- **Unit Tests**: Vitest test suite with coverage
- **Build**: Verify all packages build successfully
- **Security**: npm audit for vulnerabilities
- **Code Quality**: Code duplication detection

### E2E Tests (`e2e.yml`)

Runs Playwright end-to-end tests:

- Executes on pushes to `develop` and `main`
- Tests critical user workflows
- Includes accessibility audits with Axe
- Uploads test results and screenshots on failure

### Deploy Preview (`deploy-preview.yml`)

Deploys pull requests to Vercel preview environments:

- Automatic deployment on PR creation/update
- Comments PR with preview URL
- Ephemeral preview environment per PR

### Deploy Production (`deploy-production.yml`)

Deploys to production on merge to `main`:

- Full production build
- Deploys to https://legal-commons.org
- Creates deployment notifications

## Required Secrets

Configure these in GitHub repository settings:

### Vercel Secrets

- `VERCEL_TOKEN`: Vercel CLI authentication token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

### Optional Secrets

- `CODECOV_TOKEN`: For code coverage reporting

## Local Development

Test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run CI workflow
act pull_request -W .github/workflows/ci.yml

# Run specific job
act -j lint
```

## Workflow Status

All workflows must pass before merging to `develop` or `main`. Branch protection rules enforce this.
