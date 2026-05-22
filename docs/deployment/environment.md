# Environment Configuration

## Overview

AEGIS uses environment variables for configuration. All variables are defined in `.env.example` and must be copied to `.env.local` for local development.

## Variable Reference

### App Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:4001` | Public URL of the application |
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000/api` | Backend API base URL |

### Authentication

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AUTH_SECRET` | Yes* | — | Secret key for JWT/session encryption |
| `AUTH_URL` | Yes | `http://localhost:4001` | Auth provider callback URL |

### Database

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes* | — | PostgreSQL connection string |

### Redis

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REDIS_URL` | No | `redis://localhost:6379` | Redis connection for caching |

### Feature Flags

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | No | `true` | Enable analytics tracking |
| `NEXT_PUBLIC_ENABLE_FORECASTING` | No | `true` | Enable forecasting features |

### Observability

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | No | — | PostHog project API key |
| `NEXT_PUBLIC_SENTRY_DSN` | No | — | Sentry DSN for error tracking |

## Environment Files

| File | Purpose |
|------|---------|
| `.env.example` | Template for required variables |
| `.env.local` | Local development overrides |
| `.env.production` | Production environment |
| `.env.development` | Development environment |

## Security Notes

- Never commit `.env.local` or any `.env` file with real secrets
- Use Vercel's environment variable management for production
- Rotate `AUTH_SECRET` regularly
- Restrict `DATABASE_URL` to trusted IPs in production
