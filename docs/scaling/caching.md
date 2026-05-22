# Caching Strategy

## Overview

AEGIS employs a multi-layered caching strategy to ensure fast page loads, reduced server load, and optimal user experience.

## Cache Layers

```
┌─────────────────────────────────────────┐
│         Browser Cache                    │
│  - Static assets (1 year immutable)      │
│  - API responses (varies)                │
├─────────────────────────────────────────┤
│         CDN Cache (Vercel Edge)           │
│  - Static pages                          │
│  - ISR-rendered pages                    │
│  - Public assets                         │
├─────────────────────────────────────────┤
│         ISR Cache (Next.js)              │
│  - Dashboard pages                       │
│  - Revenue charts                        │
├─────────────────────────────────────────┤
│         Data Cache (Next.js fetch)       │
│  - API responses                         │
├─────────────────────────────────────────┤
│         Redis Cache (optional)           │
│  - Session data                          │
│  - Rate limiting counters                │
│  - Computed aggregations                 │
└─────────────────────────────────────────┘
```

## Static Asset Caching

### Image Assets
Images in `/public/` are served with immutable caching headers:

```
Cache-Control: public, max-age=31536000, immutable
```

### Font Files
Font files are also cached immutably. Font URLs include content-based hashes for cache busting.

## ISR Caching

Incremental Static Regeneration allows static pages to be updated without a full rebuild:

```typescript
// Revalidate the dashboard every 60 seconds
export const revalidate = 60;

// Or programmatically revalidate
revalidatePath("/treasury");
revalidateTag("kpi-data");
```

## Data Caching

### Next.js fetch cache
The built-in `fetch` cache deduplicates requests and caches responses:

```typescript
const data = await fetch("/api/kpis", {
  next: { revalidate: 30, tags: ["kpi-data"] },
});
```

### Redis Cache (Production)
For production deployments with Redis:

- **Session Cache**: Store authenticated sessions
- **Rate Limiting**: Track request counts per IP/user
- **Computed Data**: Cache expensive aggregations (dashboard KPIs, forecast calculations)

## Cache Invalidation

| Event | Action |
|-------|--------|
| New deployment | All caches cleared |
| Data mutation (POST/PUT/DELETE) | `revalidateTag()` for affected data |
| Time-based (ISR) | Automatic revalidation |
| Manual | Admin panel cache purge button |
