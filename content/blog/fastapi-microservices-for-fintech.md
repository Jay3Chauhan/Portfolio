---
title: "Building Fintech Microservices with FastAPI"
description: "Architecture decisions, real-time data patterns, and lessons from building production trading and mutual fund backends serving thousands of users."
date: "2026-03-20"
category: "Case Study"
tags: ["FastAPI", "Python", "Microservices", "Fintech", "Architecture"]
readTime: "8 min read"
---

## The Challenge

At Arhamshare, we needed a backend architecture that could handle equity trading, mutual fund operations, IPO listings, market screeners, and FII/DII data flows — all with real-time requirements and regulatory compliance. Here's how we built it.

## Why FastAPI?

After evaluating Django REST Framework, Flask, and Express.js, we chose **FastAPI** for:

- **Async-first** — native async/await for WebSocket streams and concurrent I/O
- **Pydantic v2 validation** — request/response schemas with zero boilerplate
- **Auto-generated OpenAPI docs** — every endpoint is self-documenting
- **Type safety** — Python type hints catch bugs at development time

## Service Architecture

Each domain gets its own microservice:

```
├── trading-service/      # Equity orders, positions, P&L
├── mf-service/          # Mutual fund NAV, schemes, portfolios
├── market-data-service/ # Screeners, FII/DII, IPO listings
├── auth-service/        # JWT/OAuth 2.0, user management
├── aa-service/          # Account Aggregator (Finvu SDK)
└── gateway/             # NGINX reverse proxy, SSL, load balancing
```

Each service owns its database schema and communicates via REST APIs. NGINX handles routing, SSL termination, and load balancing across instances.

## Real-Time Data with WebSockets

For live market data (watchlists, price tickers, P&L updates), REST polling is too slow:

```python
from fastapi import WebSocket

@app.websocket("/ws/market/{user_id}")
async def market_stream(websocket: WebSocket, user_id: str):
    await websocket.accept()
    async for tick in market_feed.subscribe(user_id):
        await websocket.send_json({
            "symbol": tick.symbol,
            "ltp": tick.price,
            "change": tick.change_pct,
        })
```

Redis pub/sub distributes ticks across service instances, ensuring every connected client gets updates with minimal latency.

## Database Strategy

Different data patterns demand different databases:

| Data Type | Database | Reason |
|-----------|----------|--------|
| Trades, orders, user data | PostgreSQL | ACID transactions, complex joins |
| Mutual fund NAVs, schemes | MySQL | Structured financial data |
| Market feeds, screener cache | MongoDB | Flexible schema, fast writes |
| Session cache, rate limiting | Redis | Sub-millisecond reads |

## Security: JWT + OAuth 2.0

Every service validates JWT tokens. The auth service issues tokens with role-based claims:

```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

async def verify_token(token = Depends(HTTPBearer())):
    payload = jwt.decode(token.credentials, SECRET_KEY)
    if payload["role"] not in ALLOWED_ROLES:
        raise HTTPException(403, "Insufficient permissions")
    return payload
```

Result: zero auth-related incidents over 12 months in a compliance-regulated environment.

## Data Pipelines

Automated pipelines keep data fresh:

- **Selenium scrapers** pull mutual fund data from external sources on scheduled CronJobs
- **Market data normalizers** process FII/DII activity, IPO feeds, and screener data
- **NAV tracking** syncs daily across 1000+ mutual fund schemes

## Results

- **8+ microservices** running in production
- **1k–10k users** served with NGINX load balancing
- **30% reduction** in production defects via systematic testing
- **Zero auth incidents** over 12 months

## Key Takeaways

1. **Start with a monolith, extract services** — Don't microservice everything on day one
2. **Pydantic v2 is non-negotiable** — Schema validation prevents entire classes of bugs
3. **WebSockets + Redis** is the sweet spot for real-time fintech data
4. **NGINX is your best friend** — SSL termination, load balancing, and rate limiting in one layer

FastAPI has been the perfect fit for our fintech backend. The async performance, type safety, and developer experience make it ideal for high-throughput financial systems.
