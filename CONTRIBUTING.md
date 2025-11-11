# Contributing to Legal Commons

Thank you for your interest in contributing to Legal Commons! This project is built by the community, for the community.

## Code of Conduct

Legal Commons is committed to providing a welcoming and inclusive environment for all contributors, regardless of background, identity, or experience level. We expect all contributors to:

- Be respectful and considerate
- Focus on constructive feedback
- Prioritize the needs of underserved communities
- Maintain confidentiality when handling sensitive information

## How to Contribute

### For Developers

1. **Fork the repository** and create a feature branch:

   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards:

   - Write tests for new functionality
   - Ensure all tests pass (`npm run test`)
   - Run linters (`npm run lint`)
   - Type check your code (`npm run typecheck`)
   - Follow conventional commit messages

3. **Commit your changes**:

   ```bash
   git commit -m "feat(scope): brief description"
   ```

4. **Push to your fork** and create a pull request:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Wait for review** - automated checks will run, and maintainers will review your PR.

### For Lawyers & Paralegals

- Review legal document templates for accuracy
- Provide jurisdiction-specific guidance
- Help with plain-language explanations
- Moderate community forums

### For Translators

- Localize UI strings for your language
- Translate legal education content
- Review machine translations for accuracy
- Provide cultural context notes

### For Designers

- Improve accessibility (WCAG AAA compliance)
- Design mobile-first interfaces
- Create icons and visual assets
- Conduct user research with underserved communities

## Development Setup

See [README.md](README.md#-quick-start) for detailed setup instructions.

## Coding Standards

- **TypeScript**: All code must be TypeScript with strict mode enabled
- **Testing**: Minimum 80% coverage for new code
- **Accessibility**: All UI components must be keyboard navigable and screen reader compatible
- **Security**: No SQL injection, XSS, or CSRF vulnerabilities
- **Privacy**: No PII in logs, encryption for sensitive data

## Pull Request Process

1. Ensure your PR description clearly explains the changes
2. Link to related issues or tasks
3. Include screenshots for UI changes
4. Update documentation as needed
5. Wait for CI checks to pass (linting, tests, build)
6. Address review feedback promptly

## Questions?

- Open a [GitHub Discussion](https://github.com/neighborhood-lab/legal-commons/discussions)
- Check existing [Issues](https://github.com/neighborhood-lab/legal-commons/issues)

Thank you for helping build legal access for all!
