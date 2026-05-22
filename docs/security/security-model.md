# Security Model

## Threat Model

### Assets Protected
- Financial data (balances, transactions, revenue)
- User authentication credentials
- API tokens and secrets
- Audit log integrity

### Threat Vectors Mitigated

| Threat | Mitigation |
|--------|-----------|
| XSS (Cross-Site Scripting) | React's built-in XSS protection, CSP headers |
| CSRF (Cross-Site Request Forgery) | SameSite cookies, CSRF tokens (future) |
| Clickjacking | X-Frame-Options: DENY |
| MIME-type sniffing | X-Content-Type-Options: nosniff |
| Information leakage | Referrer-Policy, console stripping |
| Injection attacks | Zod input validation, parameterized queries |
| Session hijacking | HttpOnly cookies, secure flag |
| Man-in-the-middle | HTTPS enforced by Vercel |

## Authentication

Authentication is in demo mode but designed for:

### Session Management
- JWT-based sessions with configurable expiry
- Session tokens stored in HttpOnly cookies
- Refresh token rotation
- Session invalidation on logout

### Password Policy (Future)
- Minimum 12 characters
- Password complexity requirements
- Rate-limited login attempts
- No password storage — hash only (bcrypt/argon2)

## Authorization

Role-based access control (RBAC) is ready for implementation:

| Role | Permissions |
|------|------------|
| Admin | Full access, user management, settings |
| Treasury Manager | Treasury, transactions, forecasting |
| Analyst | Revenue, insights, read-only access |
| Auditor | Audit log access, read-only |
| Viewer | Dashboard, read-only reports |

## Data Encryption

### In Transit
- TLS 1.3 for all HTTPS connections
- HSTS preload ready
- API traffic encrypted end-to-end

### At Rest
- Database encryption at rest (PostgreSQL TDE)
- Secrets encrypted via environment variables
- No sensitive data stored client-side

## API Security

- All API routes require authentication
- Rate limiting per IP/user
- Request validation via Zod schemas
- Input sanitization for all user-provided data
- CORS configured for allowed origins only
