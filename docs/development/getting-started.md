# Getting Started

## Prerequisites

- **Node.js** 20.x or later
- **npm** 10.x or later
- **Git** for version control
- **Code editor** (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/aegis-treasury.git
cd aegis-treasury
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required due to Next.js 16's peer dependency requirements.

### 3. Environment Variables

```bash
cp .env.example .env.local
```

The app works out of the box with mock data — no database or API needed.

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:4001](http://localhost:4001).

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 4001 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |

## Project Structure Quick Reference

```
src/
├── app/              # Route pages
├── components/       # React components
│   ├── ui/          # shadcn/ui primitives
│   ├── charts/      # Recharts wrappers
│   ├── dashboard/   # Dashboard components
│   └── layout/      # Navigation shell
├── lib/             # Utilities and mock data
├── providers/       # React context providers
└── store/           # Zustand state stores
```

## Troubleshooting

### Port 4001 in use
```bash
# Kill the process on port 4001
npx kill-port 4001
```

### Module not found
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
npm run typecheck
```
