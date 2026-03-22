---
title: "Deploying Next.js to AWS: A Production-Ready Guide"
description: "Step-by-step tutorial on deploying a Next.js app to AWS with SSR, CDN, CI/CD, and monitoring — the complete production setup."
date: "2024-10-10"
category: "Tutorial"
tags: ["Next.js", "AWS", "DevOps", "CI/CD"]
readTime: "12 min read"
---

## Beyond Vercel: Why AWS?

While Vercel provides an excellent deployment experience for Next.js, there are scenarios where AWS gives you more control:

- **Cost optimization** at scale
- **Custom infrastructure** requirements
- **Compliance** and data residency
- **Integration** with existing AWS services

## Architecture Overview

Our production setup includes:

1. **AWS Amplify** or **ECS Fargate** for the Next.js application
2. **CloudFront** CDN for static assets and edge caching
3. **Route 53** for DNS management
4. **ACM** for SSL certificates
5. **CloudWatch** for monitoring and logging
6. **GitHub Actions** for CI/CD

## Step 1: Containerize Your Next.js App

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Step 2: Set Up ECS Fargate

Create a task definition with appropriate CPU and memory allocation. For most portfolio and blog sites, 0.25 vCPU and 512MB RAM is sufficient.

## Step 3: Configure CloudFront

CloudFront serves as your CDN, caching static assets at edge locations worldwide:

- Cache `/_next/static/` with long TTL (1 year)
- Pass through API routes and SSR pages
- Enable Gzip and Brotli compression

## Step 4: CI/CD with GitHub Actions

```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm test
      # Deploy to ECS...
```

## Step 5: Monitoring

Set up CloudWatch alarms for:
- **Response time** > 3 seconds
- **Error rate** > 1%
- **CPU utilization** > 80%
- **Memory utilization** > 85%

## Cost Breakdown

For a typical portfolio/blog with moderate traffic:

| Service | Monthly Cost |
|---------|-------------|
| ECS Fargate | ~$15 |
| CloudFront | ~$5 |
| Route 53 | ~$1 |
| CloudWatch | ~$3 |
| **Total** | **~$24/month** |

This is comparable to Vercel's Pro plan but with significantly more control and scalability options.

## Conclusion

AWS deployment requires more initial setup than Vercel, but the flexibility and cost efficiency at scale make it worthwhile for production applications. Start simple with Amplify for smaller projects, and graduate to ECS + CloudFront as your needs grow.
