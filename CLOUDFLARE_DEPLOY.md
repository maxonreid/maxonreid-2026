# Cloudflare Pages Deployment Guide

This project is ready for Cloudflare Pages deployment.

## Changes Made for Cloudflare Compatibility

1. ✅ Disabled Next.js image optimization (`unoptimized: true` in `next.config.ts`)
2. ✅ Added `.node-version` file to specify Node.js 20
3. ✅ Build tested successfully

## ⚠️ Important Note

The `package-lock.json` has been regenerated to ensure clean dependency installation on Cloudflare Pages.

## Deployment Steps

### 1. Push to Git Repository
```bash
git add .
git commit -m "Prepare for Cloudflare Pages deployment"
git push
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Create application** > **Pages**
3. Connect your GitHub/GitLab repository
4. Select `maxonreid-2026` repository

### 3. Configure Build Settings

Use these settings:

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (leave empty)
- **Node version**: 20 (auto-detected from `.node-version`)

### 4. Environment Variables (if needed)

Add any required environment variables in the Cloudflare Pages settings.

### 5. Deploy

Click **Save and Deploy**. Cloudflare will:
- Install dependencies
- Run the build
- Deploy to the edge
- Provide a `*.pages.dev` URL

### 6. Custom Domain (Your Cloudflare DNS)

After successful deployment:

1. Go to **Custom domains** in your Pages project
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `maxonreid.com`)
4. Cloudflare will automatically configure DNS records
5. SSL/TLS will be auto-provisioned

## Features Working on Cloudflare

✅ Server Components
✅ Dynamic routing (`[locale]`, `[slug]`)
✅ Internationalization (next-intl)
✅ Middleware
✅ API routes (if any)
✅ Static assets

## Notes

- First deploy takes 2-5 minutes
- Subsequent deploys are faster (1-2 minutes)
- Every push to your main branch auto-deploys
- Preview deployments for PRs are automatic
- Edge deployment = fast global performance

## Troubleshooting

If build fails:
1. Check build logs in Cloudflare dashboard
2. Verify Node.js version (should be 20)
3. Ensure all dependencies are in `package.json`

## Local Testing

Test the production build locally:
```bash
npm run build
npm start
```
