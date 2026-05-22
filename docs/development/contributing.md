# Development Guide

## Setting Up for Development

Follow the [Getting Started](getting-started.md) guide to set up your local environment.

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Follow the existing code patterns
- Use TypeScript strict mode
- Keep components focused and single-responsibility
- Add comments for complex logic only

### 3. Run Checks

```bash
npm run typecheck
npm run lint
npm run build
```

### 4. Test Manually

- Verify the UI in both light and dark mode
- Test responsive layouts (desktop, tablet, mobile)
- Check for console errors
- Verify loading states and error boundaries

## Code Patterns

### Server Component (default)

```typescript
// No "use client" directive
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}
```

### Client Component (for interactivity)

```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState();
  // ...
}
```

### State Management (Zustand)

```typescript
import { create } from "zustand";

export const useStore = create<StoreType>()((set) => ({
  data: [],
  fetchData: async () => {
    const result = await getData();
    set({ data: result });
  },
}));
```

## Component Conventions

- **File naming**: `component-name.tsx` for shared components
- **Page naming**: `page.tsx` for route pages
- **Layout naming**: `layout.tsx` for route layouts
- **Props**: Define interfaces/types for all component props
- **Default exports**: Only for page components

## Styling

- Use Tailwind utility classes
- Reference design system tokens (`bg-[--bg-primary]`)
- Use the `cn()` utility for conditional classes
- Component-focused styles are preferred over global CSS

## Data Mocking

Mock data lives in `@/lib/mock-data.ts`. When adding new features:

1. Add mock data generators following the existing pattern
2. Add simulated latency (200-800ms) for realistic behavior
3. Export async functions matching the real API interface

## Building for Production

```bash
npm run build
```

The build output is in `.next/`. Test the production build:

```bash
npm run start
```

## Deployment

See the [Deployment Guide](../deployment/vercel.md) for production deployment instructions.
