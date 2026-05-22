# Performance Optimization

## Rendering Optimizations

### Server Components by Default
All page layouts and static content use Server Components. Only interactive elements use the `"use client"` directive, minimizing the JavaScript bundle sent to the browser.

### Dynamic Imports
Heavy visualization libraries (Recharts) and animation libraries (Framer Motion) are dynamically imported:

```typescript
const RevenueChart = dynamic(() => import("@/components/charts/revenue-chart"), {
  ssr: false,
  loading: () => <Skeleton className="h-80 w-full" />,
});
```

### Image Optimization
- Next.js Image component with automatic AVIF/WebP conversion
- Device-specific sizes to avoid serving oversized images
- Lazy loading with `loading="lazy"` by default

## Data Fetching

### Parallel Data Fetching
All independent data fetches run in parallel using `Promise.all`:

```typescript
const [kpis, transactions, chartData] = await Promise.all([
  fetchKpis(),
  fetchTransactions(),
  fetchChartData(),
]);
```

### ISR (Incremental Static Regeneration)
Dashboard pages can be configured with ISR for stale-while-revalidate behavior:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

## Bundle Optimization

### Code Splitting
Next.js App Router automatically code-splits by route group. Each route only loads its own JavaScript.

### Tree Shaking
- Unused exports are removed by the build process
- Third-party libraries are imported selectively (e.g., `import { LineChart } from "recharts"`)

### Console Stripping
Console statements are removed in production builds:

```typescript
compiler: {
  removeConsole: process.env.NODE_ENV === "production",
},
```

## Runtime Performance

### Memoization
- `React.memo` for chart components to prevent unnecessary re-renders
- `useMemo` for expensive data transformations
- `useCallback` for event handlers passed to child components

### Virtualization
For large transaction lists, virtualization should be implemented using `react-window` or `@tanstack/virtual`.

### Skeleton Loading
All data-fetching views display skeleton loaders during data fetch, providing instant perceived performance:

```typescript
{isLoading ? <SkeletonCard /> : <KpiCard data={data} />}
```

## Caching

### Browser Cache
- Static assets (images, fonts) cached for 1 year with immutable flag
- API responses cached via Next.js `fetch` cache
- Route segments cached via ISR

### CDN Cache
Vercel Edge Network caches static pages and assets at the edge, serving them from the closest data center to the user.

## Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3.5s |
| Total Bundle Size | < 200KB (gzip) |
| Lighthouse Performance Score | > 90 |
