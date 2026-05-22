# Webhooks

## Overview

AEGIS supports outgoing webhooks for real-time event notifications. Webhooks allow external systems to receive updates when specific events occur in the platform.

## Webhook Events

| Event | Triggered When |
|-------|---------------|
| `transaction.created` | A new transaction is initiated |
| `transaction.updated` | Transaction status changes |
| `transaction.completed` | Transaction settles |
| `transaction.failed` | Transaction fails |
| `risk.alert` | Risk threshold breached |
| `forecast.generated` | New forecast completed |
| `revenue.milestone` | Revenue target achieved |
| `audit.event` | Significant audit event |

## Payload Format

All webhooks send a POST request with the following JSON structure:

```json
{
  "event": "transaction.created",
  "timestamp": "2026-05-22T12:34:22Z",
  "data": {
    "id": "tx_123",
    "type": "wire",
    "amount": 24500,
    "currency": "USD",
    "status": "pending",
    "initiator": "user_456"
  }
}
```

## Signature Verification

Webhook payloads are signed with HMAC-SHA256 using your secret key:

```
X-Webhook-Signature: sha256=abc123...
```

Verify signatures:

```typescript
import { createHmac, timingSafeEqual } from "crypto";

function verifyWebhook(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  
  return timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

## Retry Policy

| Attempt | Delay |
|---------|-------|
| 1 | 0s |
| 2 | 10s |
| 3 | 60s |
| 4 | 300s |
| 5 | 1800s |

After 5 failed attempts, the webhook is disabled and an alert is sent.

## Best Practices

1. **Respond quickly**: Return 200 OK within 5 seconds
2. **Idempotency**: Handle duplicate deliveries gracefully (use `idempotency_key`)
3. **Verify signatures**: Always verify webhook signatures
4. **HTTPS only**: Webhook URLs must use HTTPS
5. **Timeout**: Set a reasonable timeout (10s recommended)
