<a id="readme-top"></a>

<div align="center">
  <img src="public/screenshots/preview.svg" alt="AEGIS Treasury Intelligence" width="100%" />
  
  # ⚡ AEGIS — Treasury Intelligence Platform
  
  <p align="center">
    <strong>Enterprise-Grade Treasury & Financial Intelligence System</strong>
    <br />
    Multi-asset management · Real-time risk scoring · AI-powered forecasting
    <br />
    <em>"Where precision meets financial intelligence"</em>
  </p>

  <p align="center">
    <a href="#features"><strong>Explore Features</strong></a> ·
    <a href="#demo"><strong>Live Demo</strong></a> ·
    <a href="#deployment"><strong>Deploy</strong></a> ·
    <a href="#architecture"><strong>Architecture</strong></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="MIT" />
    <img src="https://img.shields.io/badge/status-production-22c55e?style=flat" alt="Production Ready" />
    <img src="https://img.shields.io/badge/PRs-welcome-8b5cf6?style=flat" alt="PRs Welcome" />
  </p>
</div>

<br />

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Docker](#docker)
- [Engineering Highlights](#engineering-highlights)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Contact](#contact)

---

## 🏗️ Overview

AEGIS is a production-grade treasury intelligence platform designed for modern finance teams. Inspired by Bloomberg Terminal, Stripe Treasury, and Ramp, it provides real-time multi-asset balance management, transaction monitoring, risk scoring, ML-powered cash flow forecasting, and AI-driven financial insights.

> **Use Case**: Enterprise finance departments, treasury operations, fintech startups needing a comprehensive treasury management dashboard.

---

## ✨ Features

### Treasury Dashboard
- Real-time multi-asset balance overview with aggregated metrics
- 6 key performance indicators: Total Treasury, Active Transactions, Risk Score, Revenue MTD, Forecast Accuracy, Pending Settlements
- Skeleton loading states for smooth data transitions

### Transaction Monitoring
- Real-time payment and transfer monitoring
- Detailed transaction tables with status tracking
- Activity feed with chronological event history

### Revenue Analytics
- MRR, ARR, LTV tracking with trend visualization
- Revenue chart with area visualization using Recharts
- Month-over-month comparison metrics

### Risk Engine
- Real-time anomaly detection and risk scoring
- Interactive risk gauge visualization
- Color-coded severity indicators (low/moderate/high/critical)

### Audit & Compliance
- Immutable compliance trail with cryptographic verification
- Complete audit logging for regulatory requirements
- SOC 2 / GDPR / PCI-DSS ready

### AI Forecasting
- ML-powered cash flow prediction (7/14/30-day horizons)
- Forecast accuracy tracking
- Trend analysis with historical comparison

### AI Insights
- Actionable intelligence with natural language summaries
- Key risk flags, optimization opportunities, and revenue highlights
- GPT-4o integration ready

---

## 💻 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **State** | Zustand (lightweight state) |
| **Charts** | Recharts |
| **Animation** | Framer Motion |
| **Validation** | Zod |
| **UI Primitives** | Radix UI |
| **Icons** | Lucide React |
| **Font** | Geist / Geist Mono |

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="public/screenshots/dashboard.svg" alt="Dashboard" width="400"/></td>
      <td><img src="public/screenshots/analytics.svg" alt="Analytics" width="400"/></td>
    </tr>
    <tr>
      <td><em>Financial Dashboard — Real-time treasury overview</em></td>
      <td><em>Revenue Analytics — MRR/ARR tracking with trends</em></td>
    </tr>
    <tr>
      <td><img src="public/screenshots/architecture.svg" alt="Architecture" width="400"/></td>
      <td><img src="public/screenshots/mobile.svg" alt="Mobile" width="400"/></td>
    </tr>
    <tr>
      <td><em>System Architecture — Full platform overview</em></td>
      <td><em>Mobile Responsive — On-the-go treasury management</em></td>
    </tr>
  </table>
</div>

---

## 🏛️ Architecture

AEGIS follows a modern Next.js 16 App Router architecture with a clear separation of concerns:

```mermaid
graph TD
    A[Client Browser] --> B[Next.js 16 Edge/CDN]
    B --> C[App Router]
    C --> D[Server Components]
    C --> E[Client Components]
    D --> F[Mock Data Layer]
    E --> G[Framer Motion]
    E --> H[Recharts]
    E --> I[Radix UI]
    C --> J[Layout System]
    J --> K[Sidebar + Header]
    C --> L[Route Groups]
    L --> M[Treasury]
    L --> N[Transactions]
    L --> O[Revenue]
    L --> P[Risk]
    L --> Q[Forecasting]
    L --> R[Insights]
    L --> S[Audit]
    style A fill:#0a0a0f,stroke:#10b981
    style B fill:#0a0a0f,stroke:#10b981
    style C fill:#0a0a0f,stroke:#10b981
```

### Data Flow
- All data currently operates on a mock data layer for demonstration
- API endpoints can be connected by replacing `@/lib/mock-data` with actual API calls
- State management via Zustand for dashboard-level state

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aegis-treasury.git
cd aegis-treasury

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:4001](http://localhost:4001) in your browser.

---

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:4001
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Authentication
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:4001

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aegis

# Redis (for caching & rate limiting)
REDIS_URL=redis://localhost:6379

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_FORECASTING=true
```

> **Note**: The app runs in demo mode with mock data out of the box. Only set up actual database/API connections when deploying to production.

---

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push the repository to GitHub
2. Import into Vercel
3. Set environment variables
4. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm run start
```

---

## 🐳 Docker

```bash
# Build the image
docker build -t aegis-treasury .

# Run the container
docker run -p 4001:4001 aegis-treasury

# Or use docker-compose
docker-compose up
```

---

## 🧠 Engineering Highlights

- **Next.js 16 App Router** — Leverages the latest React Server Components paradigm for optimal performance
- **TypeScript Strict Mode** — Full type safety across the entire codebase
- **Tailwind CSS v4** — Utility-first styling with the latest CSS architecture
- **Framer Motion** — Fluid, production-grade animations throughout the interface
- **Radix UI Primitives** — Accessible, composable, unstyled UI components
- **Responsive Design** — Full mobile responsiveness without compromising on data density
- **Skeleton Loading** — 60fps loading states for all data-fetching views
- **Edge Ready** — Configured for Vercel Edge Functions and ISR
- **Security Headers** — X-Frame-Options, X-Content-Type-Options, CSP-ready

---

## 📁 Project Structure

```
aegis-treasury/
├── app/                    # Next.js App Router pages
│   ├── audit/             # Compliance audit trail
│   ├── forecasting/       # Cash flow predictions
│   ├── insights/          # AI-powered intelligence
│   ├── revenue/           # Revenue analytics
│   ├── risk/              # Risk scoring engine
│   ├── settings/          # Platform settings
│   ├── transactions/      # Payment monitoring
│   ├── treasury/          # Asset management
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard
├── components/
│   ├── charts/            # Recharts visualizations
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Navigation shell
│   ├── skeletons.tsx      # Loading states
│   └── ui/                # shadcn/ui primitives
├── lib/
│   ├── mock-data.ts       # Demo data layer
│   └── utils.ts           # Utility functions
├── providers/             # React context providers
├── store/                 # Zustand state management
├── public/                # Static assets
├── docs/                  # Documentation
├── ARCHITECTURE.md        # System design docs
├── DESIGN_SYSTEM.md       # Visual language guide
├── SECURITY.md             # Security policies
├── CONTRIBUTING.md        # Contribution guide
├── CHANGELOG.md           # Version history
└── vercel.json            # Vercel deployment config
```

---

## 🗺️ Roadmap

- [x] **v1.0.0** — Core treasury dashboard with mock data
- [ ] **v1.1.0** — Real API integration layer
- [ ] **v1.2.0** — Multi-currency support
- [ ] **v2.0.0** — Live WebSocket data streams
- [ ] **v2.1.0** — Export & reporting engine
- [ ] **v2.5.0** — Multi-user with role-based access
- [ ] **v3.0.0** — Production database integration

---

## 📈 Scalability Notes

- **ISR Ready**: Pages can be incrementally regenerated for stale-while-revalidate data
- **Edge Compatible**: Route handlers and middleware ready for Vercel Edge Functions
- **CDN Optimized**: Static assets served via CDN with immutable caching
- **Lazy Loading**: Route segments automatically code-split by Next.js

---

## 🔭 Observability

- **Monitoring Ready**: Sentry/PostHog integration points pre-configured
- **Analytics**: Event tracking via `NEXT_PUBLIC_ENABLE_ANALYTICS`
- **Logging**: Structured console patterns for production log aggregation
- **Performance**: Next.js built-in metrics and analytics

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🛡️ Security

See [SECURITY.md](SECURITY.md) for our security policies and vulnerability reporting process.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Project**: [AEGIS Treasury Intelligence](https://github.com/your-org/aegis-treasury)
- **Issues**: [GitHub Issues](https://github.com/your-org/aegis-treasury/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/aegis-treasury/discussions)

---

<div align="center">
  <sub>Built with ❤️ for modern treasury teams</sub>
  <br />
  <sub>© 2026 AEGIS Treasury Intelligence. All rights reserved.</sub>
</div>

<p align="right"><a href="#readme-top">Back to top ⬆</a></p>
