# Analytics

## Overview

AEGIS includes built-in analytics instrumentation for tracking user behavior, feature adoption, and business metrics.

## Analytics Events

### Page Views
Every route change is tracked with:
- Page path and title
- Referrer information
- User role (when authenticated)
- Session duration

### User Actions

| Event | Triggered When |
|-------|---------------|
| `dashboard_viewed` | Dashboard page loaded |
| `kpi_clicked` | User clicks on a KPI card |
| `transaction_filtered` | Transactions table filtered |
| `forecast_generated` | New forecast requested |
| `insight_viewed` | AI insight expanded |
| `risk_assessment_run` | Risk assessment triggered |
| `audit_log_exported` | Audit log export initiated |

### Feature Adoption

Track usage of:
- Each dashboard route
- Chart interactions (zoom, filter, export)
- Search functionality
- Settings changes
- Theme customization

## Implementation

Analytics events are sent via the analytics provider:

```typescript
import { useAnalytics } from "@/providers/analytics-provider";

function DashboardPage() {
  const { track } = useAnalytics();

  useEffect(() => {
    track("dashboard_viewed", { tab: "overview" });
  }, []);
}
```

## Privacy

- All analytics are **opt-in** via `NEXT_PUBLIC_ENABLE_ANALYTICS`
- No personally identifiable information (PII) is collected
- IP addresses are anonymized
- Users can opt out via settings
- GDPR-compliant data retention policies
