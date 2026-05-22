# API Reference

## Overview

AEGIS provides a RESTful API for integrating with external systems. The API is designed to be consumed by the frontend application and external services.

## Base URL

```
Production: https://api.your-domain.com/api/v1
Development: http://localhost:8000/api/v1
```

## Authentication

All API requests require authentication via Bearer token:

```
Authorization: Bearer <your-api-token>
```

## Endpoints

### KPIs

```http
GET /api/v1/kpis
```

Returns dashboard KPI data.

**Response:**
```json
{
  "totalTreasury": 847200000,
  "activeTransactions": 2847,
  "riskScore": 23,
  "revenueMtd": 14200000,
  "forecastAccuracy": 94.2,
  "pendingSettlements": 3200000
}
```

### Transactions

```http
GET /api/v1/transactions
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `status` | string | Filter by status (pending, completed, failed) |
| `type` | string | Filter by type (wire, ach, transfer) |
| `startDate` | string | ISO date filter start |
| `endDate` | string | ISO date filter end |

**Response:**
```json
{
  "data": [
    {
      "id": "tx_123",
      "type": "wire",
      "amount": 24500,
      "currency": "USD",
      "status": "completed",
      "timestamp": "2026-05-22T12:34:22Z",
      "description": "Wire Transfer"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2847
  }
}
```

### Revenue

```http
GET /api/v1/revenue
```

**Response:**
```json
{
  "mrr": 1420000,
  "arr": 17100000,
  "ltv": 28450,
  "chartData": [
    { "month": "Jan", "mrr": 1200000, "arr": 14400000 }
  ]
}
```

### Risk

```http
GET /api/v1/risk
```

**Response:**
```json
{
  "score": 23,
  "level": "low",
  "flags": [
    { "type": "high_value", "severity": "info", "message": "..." }
  ]
}
```

### Forecast

```http
GET /api/v1/forecast
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `horizon` | number | Days: 7, 14, or 30 (default: 30) |

## Error Handling

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      { "field": "amount", "message": "Must be a positive number" }
    ]
  }
}
```

## Rate Limiting

| Tier | Limit |
|------|-------|
| Free | 100 req/min |
| Pro | 1000 req/min |
| Enterprise | Custom |

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1621680000
```
