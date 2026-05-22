# System Architecture Overview

## Architecture Philosophy

AEGIS follows a **hybrid rendering architecture** leveraging Next.js 16 App Router's dual Server/Client Component model. This approach maximizes performance while maintaining rich interactivity where needed.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client Browser                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │          Next.js 16 App (Edge/CDN)              │ │
│  │  ┌──────────────┐  ┌──────────────────────────┐ │ │
│  │  │   Middleware  │  │      App Router          │ │ │
│  │  │  - Auth check │  │  - Route matching        │ │ │
│  │  │  - Redirects  │  │  - Layout composition    │ │ │
│  │  └──────────────┘  │  - Data fetching          │ │ │
│  │                     │  - Streaming              │ │ │
│  │                     └──────────────────────────┘ │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Rendering Strategy

| Component Type | Rendering | Use Case |
|---------------|-----------|----------|
| **Server Components** | Rendered on server, streamed to client | Static layout, initial data fetch |
| **Client Components** | Hydrated in browser | Interactivity, animations, charts |
| **Dynamic Routes** | Server-rendered per request | Transaction detail pages |
| **Static Routes** | Built at compile time | Marketing, landing pages |

## Module Separation

The platform is divided into independent route groups, each representing a treasury domain module:

- **Dashboard** (`/`) — Aggregated KPIs and overview charts
- **Treasury** (`/treasury`) — Multi-asset balance management
- **Transactions** (`/transactions`) — Payment monitoring and history
- **Revenue** (`/revenue`) — MRR/ARR/LTV analytics
- **Risk** (`/risk`) — Anomaly detection and scoring
- **Forecasting** (`/forecasting`) — Cash flow prediction
- **Insights** (`/insights`) — AI-powered intelligence
- **Audit** (`/audit`) — Compliance and audit trail

Each module is self-contained with its own components, types, and data fetching logic.

## Data Service Layer

The data service layer abstracts data access behind a consistent interface:

```
Component → useData() hook → DataService → MockDataProvider (dev)
                                         → APIProvider (prod)
```

This allows seamless switching between mock and real data without component changes.
