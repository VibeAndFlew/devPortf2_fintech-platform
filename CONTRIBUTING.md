# Contributing to AEGIS Treasury Intelligence

Thank you for considering contributing to AEGIS. This document outlines the process for contributing to the project.

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive environment for everyone. Harassment, discrimination, and toxic behavior are not tolerated.

---

## How to Contribute

### Types of Contributions

- **Bug Reports**: File issues with clear reproduction steps
- **Feature Requests**: Suggest improvements with use case justifications
- **Documentation**: Improve docs, fix typos, add examples
- **Code**: Submit pull requests for bug fixes or features
- **Design**: Propose UI/UX improvements

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-org/aegis-treasury.git
   cd aegis-treasury
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment**
   ```bash
   cp .env.example .env.local
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:4001`.

---

## Code Style

### TypeScript
- **Strict mode**: All types must be explicitly defined
- **Naming**: `camelCase` for variables/functions, `PascalCase` for components/types
- **Imports**: Group by external → internal, sort alphabetically
- **No `any`**: Use `unknown` and type guards instead
- **Prefer `const`**: Use `const` over `let` where possible

### React / Next.js
- Use **Server Components** by default; add `"use client"` only when needed
- Keep client components lean — push logic to hooks or stores
- Use **Zustand** for shared state, not prop drilling
- Use **Zod** for all form/data validation
- Use **Framer Motion** for animations, never CSS transitions for interactive animations

### Tailwind CSS
- Follow utility-first approach
- Use Tailwind classes for layout and spacing
- Extract repeated patterns to component classes via `cn()` utility
- Use CSS variables from the design system for colors

### File Organization
- One component per file
- Colocate tests, types, and stories with components
- Barrel exports from `index.ts` files

---

## Commit Conventions

This project follows **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting, styling |
| `refactor` | Code restructuring |
| `test` | Adding/updating tests |
| `chore` | Build, deps, tooling |
| `perf` | Performance improvement |
| `security` | Security fix |

### Examples
```
feat(treasury): add multi-asset balance chart
fix(dashboard): correct KPI delta calculation
docs(readme): update deployment instructions
refactor(store): migrate from context to zustand
security(headers): add CSP configuration
```

---

## Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes** with clear, descriptive commits

3. **Keep PRs focused** — one feature or fix per PR

4. **Run checks before submitting**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

5. **Write a clear PR description**
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Screenshots for UI changes

6. **Request review** from maintainers

7. **Address feedback** — make requested changes and push

8. **Merge** — a maintainer will merge once approved

---

## Branch Naming

```
feat/description       # New features
fix/description        # Bug fixes
docs/description       # Documentation updates
refactor/description   # Code refactoring
chore/description      # Maintenance tasks
```

---

## Review Criteria

Pull requests are evaluated on:

- **Correctness**: Does it work as expected?
- **Code quality**: Is it well-structured and typed?
- **Performance**: Does it avoid unnecessary re-renders?
- **Accessibility**: Are ARIA labels and keyboard nav present?
- **Testing**: Are there adequate tests?
- **Design**: Does it match the design system?

---

## Getting Help

- Open a [Discussion](https://github.com/your-org/aegis-treasury/discussions)
- Check existing issues and PRs before creating new ones
- Tag maintainers for urgent matters only

---

## Recognition

All contributors will be acknowledged in the project's README and release notes. Thank you for helping make AEGIS better!
