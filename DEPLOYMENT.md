# 🚀 Deployment & Push Guide

## Project Overview
- **Project Name**: Jay Chauhan Portfolio
- **Framework**: Next.js 15.1.0
- **Type**: Portfolio Website
- **Domain**: jaychauhan.tech

---

## Pre-Deployment Checklist

### 1. Local Testing
- [ ] Run `npm run build` - Ensure no build errors
- [ ] Run `npm run dev` - Test locally on localhost:3000
- [ ] Check all pages load correctly
- [ ] Verify all links work (navigation, external URLs)
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Check console for any JavaScript errors
- [ ] Verify images load correctly
- [ ] Test form submissions (Contact section)

### 2. Code Quality
- [ ] Run `npm run lint` - Fix any linting errors
- [ ] Check for console warnings
- [ ] Verify no sensitive data in code/env files
- [ ] Check .gitignore includes sensitive files (`.env`, `.env.local`)

### 3. Performance
- [ ] Run Lighthouse audit (build & serve)
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Check bundle size with `npm run build`

### 4. SEO Verification
- [ ] Confirm metadata in layout.tsx
- [ ] Verify robots.txt and sitemap.xml are generated
- [ ] Check OpenGraph and Twitter tags
- [ ] Verify structured data (JSON-LD)

---

## Build & Deployment Steps

### Phase 1: Build
```bash
# Install dependencies (if needed)
npm install

# Run linting
npm run lint

# Build the project
npm run build
```

### Phase 2: Test Build Locally
```bash
# Start production server locally
npm start

# Visit http://localhost:3000 and verify everything works
```

### Phase 3: Push to Repository
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Deploy: Update portfolio with improvements"

# Push to main/master branch
git push origin main
# OR
git push origin master
```

### Phase 4: Deploy to Hosting

#### Option A: Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: GitHub Pages
1. Update `next.config.js` to include output: 'export'
2. Run `npm run build`
3. Push to `gh-pages` branch
4. Enable GitHub Pages in repository settings

#### Option C: Standard Node.js Hosting
```bash
# On your server/hosting provider
git clone <repository-url>
cd Portfolio-3.0
npm install --production
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start "npm start" --name "portfolio"
pm2 save
pm2 startup
```

---

## Deployment Environments

### Development
- `npm run dev` - Local development server

### Staging
- Deploy to a staging URL for testing
- Run full QA tests

### Production
- Deploy to jaychauhan.tech
- Monitor for errors and performance

---

## Post-Deployment Verification

### Immediate Checks (5 minutes)
- [ ] Website loads without errors
- [ ] All pages accessible
- [ ] Links work correctly
- [ ] Contact form functional
- [ ] Images display properly

### SEO Verification (1 hour)
- [ ] Run Google Search Console test
- [ ] Check Google PageSpeed Insights
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt is accessible
- [ ] Verify OpenGraph tags in page source

### Browser Testing (1-2 hours)
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Mobile testing (iOS & Android)

### Monitoring (Ongoing)
- [ ] Monitor Google Analytics
- [ ] Check error logs
- [ ] Monitor page load times
- [ ] Check for 404 errors

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

### Pages Not Loading
- Check `next.config.js` for misconfiguration
- Verify environment variables (.env.local)
- Check server logs for errors

### SEO Not Updating
- Submit sitemap to Google Search Console
- Request URL indexing for main page
- Wait 24-48 hours for updates

### Images Not Loading
- Verify image paths are correct
- Check `next.config.js` remote pattern configuration
- Use Next.js Image component for optimization

---

## Environment Variables

Create `.env.local` if needed:
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-1QEB2QFT9X

# Domain
NEXT_PUBLIC_DOMAIN=jaychauhan.tech
```

---

## Key Files
- `next.config.js` - Next.js configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `src/app/layout.tsx` - Global metadata and layout
- `src/app/robots.ts` - robots.txt configuration
- `src/app/sitemap.ts` - Sitemap configuration

---

## Rollback Procedure

If deployment goes wrong:
```bash
# On Vercel: Automatic via dashboard
# On GitHub Pages: Revert commit and push

git revert <commit-hash>
git push origin main

# On standard hosting:
# Either:
# 1. Restore from backup
# 2. Or re-deploy stable version
git checkout <previous-stable-tag>
npm install
npm run build
# Restart application
```

---

## Performance Tips
1. Monitor Core Web Vitals
2. Compress images before deployment
3. Enable caching headers
4. Use CDN for static assets
5. Regular database optimization (if applicable)

---

## Support & Monitoring
- **Google Search Console**: Submit sitemaps and monitor indexing
- **Google Analytics**: Track user behavior and performance
- **Vercel Analytics**: Monitor Core Web Vitals (if using Vercel)
- **Uptime Monitoring**: Setup uptime alerts

---

**Last Updated**: 2024-03-22
**Deployment Status**: Ready for Production
