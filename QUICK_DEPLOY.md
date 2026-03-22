# 🎯 Quick Reference: Deploy in 5 Minutes

## One-Command Deploy

### For Vercel (Recommended)
```bash
npm run build && vercel --prod
```

### For GitHub/Git Push
```bash
git add . && git commit -m "Deploy: Production release" && git push origin main
```

---

## Pre-Deploy Checklist (2 min)
```bash
npm run lint          # Check for errors
npm run build         # Verify build succeeds
npm start             # Test locally - visit http://localhost:3000
```

**✅ All checks pass?** → Ready to deploy!

---

## Deployment Commands

### 1️⃣ Vercel (Fastest)
```bash
vercel --prod
```

### 2️⃣ GitHub Pages
```bash
git push origin main
# Auto-deploys if configured
```

### 3️⃣ Custom Server
```bash
npm install --production
npm run build
npm start
```

---

## Post-Deploy (1 min)
1. Visit: https://jaychauhan.tech
2. Check if loads fully
3. Submit sitemap to Google Search Console:
   - Visit: https://search.google.com/search-console
   - Add sitemap: https://jaychauhan.tech/sitemap.xml

---

## Environment Variables
None required! All hardcoded with defaults.
(Google Analytics ID is built-in)

---

## File Locations
- **Blog Posts**: `content/` folder
- **Config**: `next.config.js`
- **Metadata**: `src/app/layout.tsx`
- **SEO Files**: `src/app/robots.ts`, `src/app/sitemap.ts`

---

## If Something Breaks

**Site won't load?**
```bash
rm -rf .next && npm install && npm run build
```

**Build fails?**
Check `npm run lint` for errors first

**Pages not indexing?**
Wait 24 hours, then resubmit in Google Search Console

---

## Key Metrics Post-Deploy

| Metric | Target | Check |
|--------|--------|-------|
| Lighthouse | 90+ | https://pagespeed.web.dev |
| Mobile Score | 90+ | Same URL |
| First Load | <3s | Check browser Dev Tools |
| SEO Score | 95+ | Done ✅ |

---

**Status**: ✅ READY TO DEPLOY

See: DEPLOYMENT.md for detailed guide
See: SEO_AUDIT.md for complete SEO report
