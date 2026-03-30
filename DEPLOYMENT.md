# 🚀 Deployment Guide — Masjid Alwadud Website

This guide will walk you through deploying the website to Vercel with full functionality.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Testing](#local-testing)
3. [GitHub Setup](#github-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Stripe account & API keys
- [ ] Email service account (Gmail, Mailgun, SendGrid, etc.)
- [ ] GitHub account
- [ ] Vercel account
- [ ] Custom domain (optional)

---

## Local Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your test credentials:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@alwadud.org
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 and test:
- ✅ Prayer times load from API
- ✅ Navigation works smoothly
- ✅ Newsletter form validates
- ✅ Donation form displays correctly

### 4. Test Newsletter
1. Go to footer
2. Enter test email
3. Click "Subscribe"
4. Check for success message
5. Check email inbox for confirmation (if SMTP configured)

### 5. Test Donation Form
1. Scroll to donation section
2. Select amount or enter custom
3. Enter test name and email
4. Verify form validation works
5. Click "Donate" button

---

## GitHub Setup

### 1. Create GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Masjid Alwadud website"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/masjid-alwadud.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. GitHub Secrets (Optional, for CI/CD)

If you want automatic deployments via GitHub Actions:

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

```
VERCEL_TOKEN           # From Vercel account settings
VERCEL_ORG_ID          # From Vercel team settings
VERCEL_PROJECT_ID      # Auto-generated during Vercel import
```

---

## Vercel Deployment

### Option 1: One-Click Deploy (Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fmasjid-alwadud&env=STRIPE_PUBLIC_KEY,STRIPE_SECRET_KEY,SMTP_HOST,SMTP_PORT,SMTP_SECURE,SMTP_USER,SMTP_PASS,EMAIL_FROM)

This will:
1. Create a GitHub fork in your account ✓
2. Create a Vercel project ✓
3. Prompt for environment variables ✓
4. Deploy automatically ✓

### Option 2: Manual Deployment (Recommended)

#### Step 1: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authenticate and authorize
4. Find and select your `masjid-alwadud` repository
5. Click "Import"

#### Step 2: Configure Project

In Vercel project settings:

1. **Root Directory**: Leave blank (default: `/`)
2. **Framework Preset**: Other
3. **Build Command**: `npm install`
4. **Output Directory**: None needed (static site)

#### Step 3: Add Environment Variables

1. Click "Environment Variables"
2. Add each variable from `.env.example`:

| Name | Value | Visibility |
|------|-------|-----------|
| `STRIPE_PUBLIC_KEY` | pk_test_... | Plaintext |
| `STRIPE_SECRET_KEY` | sk_test_... | **Encrypted** |
| `SMTP_HOST` | smtp.gmail.com | Plaintext |
| `SMTP_PORT` | 587 | Plaintext |
| `SMTP_SECURE` | false | Plaintext |
| `SMTP_USER` | your-email@gmail.com | **Encrypted** |
| `SMTP_PASS` | app-password | **Encrypted** |
| `EMAIL_FROM` | contact@alwadud.org | Plaintext |

⚠️ **Important**: Mark sensitive values as encrypted!

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. You'll get a unique `*.vercel.app` URL
4. Test the live site

---

## Post-Deployment Configuration

### 1. Add Custom Domain

#### Option A: Buy Domain on Vercel (Easiest)
1. In Vercel → Settings → Domains
2. Click "Add Domain"
3. Buy through Vercel (handles DNS automatically)

#### Option B: Use Existing Domain
1. In Vercel → Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., alwadud.org)
4. Choose your DNS provider
5. Add DNS records (A, CNAME, or TXT):
   - For Namecheap, GoDaddy, etc: Follow Vercel's instructions
   - Typically point to Vercel's nameservers

#### Option C: Mailgun Domain (For Email)
If using Mailgun:
1. Add domain to Mailgun dashboard
2. Configure MX records for email
3. Update `SMTP_USER` to `postmaster@yourdomain.com`

### 2. Enable HTTPS (Automatic)

✓ Vercel automatically provides free SSL certificate
✓ HTTPS enabled at domain and `*.vercel.app`
✓ Auto-renewal included

### 3. Configure Email Service

#### Gmail Setup
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=YOUR_APP_PASSWORD  # NOT your Gmail password
EMAIL_FROM=contact@alwadud.org  # Optional: can be different
```

**Get Gmail App Password**:
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Ensure 2-factor auth is enabled
3. Select app: "Mail", device: "Windows Computer"
4. Copy the 16-character password
5. Use as `SMTP_PASS` in Vercel

#### Mailgun Setup (Production Recommended)
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@mg.alwadud.org
SMTP_PASS=YOUR_MAILGUN_PASSWORD
EMAIL_FROM=noreply@alwadud.org
```

**Get Mailgun Credentials**:
1. Sign up at [mailgun.com](https://mailgun.com)
2. Verify your domain
3. Go to Settings → SMTP access
4. Copy credentials

### 4. Configure Stripe

#### Get Stripe Keys
1. Sign up at [stripe.com](https://stripe.com)
2. Go to Dashboard → Developers → API Keys
3. Toggle "Viewing test data"
4. Copy:
   - **Publishable key** → `STRIPE_PUBLIC_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

#### Update Vercel Environment
1. In Vercel → Settings → Environment Variables
2. Update keys (or replace with live keys)
3. Redeploy project

#### Test Stripe Integration
Use Stripe test cards:
- Visa: `4242 4242 4242 4242`
- Visa (auth fails): `4000 0025 0000 3155`
- Mastercard: `5555 5555 5555 4444`

Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits

### 5. Monitor & Analytics

#### View Logs
```bash
vercel logs
```

#### Function Logs
In Vercel dashboard:
- Functions → Select function → Logs
- Real-time monitoring of API calls

#### Error Tracking
- Check Vercel dashboard for deployment failures
- Verify environment variables are set
- Check GitHub Actions workflow logs

---

## Troubleshooting

### "Environment variables not set" Error

**Solution**:
1. Vercel → Settings → Environment Variables
2. Ensure all required variables are set
3. Variables must be set **before** deployment
4. If already deployed, redeploy after adding variables:
   ```bash
   vercel redeploy
   ```

### Newsletter/Donation API Returns 503

**Cause**: Missing Stripe or SMTP credentials

**Solution**:
1. Check Vercel logs: `vercel logs -p`
2. Verify environment variables in Vercel dashboard
3. Test locally: `npm run dev`
4. Redeploy if you just added variables

### "CORS Error" When Testing

**Cause**: API being called from non-verified origin

**Solution**:
- CORS is set to `*` in `vercel.json` (allows all origins)
- If restricted, update `vercel.json`:
```json
{
  "headers": [{
    "source": "/api/(.*)",
    "headers": [{
      "key": "Access-Control-Allow-Origin",
      "value": "https://yourdomain.com"
    }]
  }]
}
```

### Prayer Times API Unreachable

**Cause**: Al Adhan API might be down or blocked

**Solution**:
- Fallback times are hardcoded and will be used automatically
- Check if api.aladhan.com is accessible
- Monitor at https://uptime.com

### Email Not Sending

**Cause**: Invalid SMTP credentials

**Solution**:
1. Verify credentials in SMTP service
2. Test locally first
3. Check spam/junk folder
4. Gmail: Ensure App Password generated correctly
5. Mailgun: Ensure domain is verified
6. SendGrid: Check rate limits

### Domain Not Resolving

**Cause**: DNS records not propagated

**Solution**:
- DNS changes take 24-48 hours
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify records added correctly to DNS provider
- Point to Vercel nameservers if using their service

### 503 Service Unavailable

**Cause**: Vercel function timeout or crash

**Solution**:
1. Check function logs in Vercel
2. Verify all environment variables
3. Check Node.js dependencies are installed
4. Increase function timeout in `vercel.json`:
```json
{
  "functions": {
    "api/donate.js": {
      "maxDuration": 60
    }
  }
}
```

---

## Performance Optimization

### 1. Enable Edge Caching
In `vercel.json`:
```json
{
  "headers": [{
    "source": "/static/(.*)",
    "headers": [{
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }]
  }]
}
```

### 2. Minify Assets
- Tailwind CSS is already minified
- Consider minifying custom CSS/JS

### 3. Image Optimization
- Replace Google Drive images with Vercel Image Optimization
- Compress images with tools like TinyPNG

### 4. Monitor Performance
Use Vercel Analytics:
1. Vercel → Settings → Analytics
2. Enable Web Analytics
3. Monitor Core Web Vitals

---

## Maintenance

### Regular Updates
- Update dependencies: `npm update`
- Rotate API keys annually
- Review Stripe charges monthly
- Monitor email deliverability

### Backup Configuration
Keep a local backup:
```bash
# Export environment variables (manually)
# Save to secure location like password manager
# Document any custom changes
```

### Version Control Best Practices
```bash
# Always work on branches
git checkout -b feature/new-feature

# Create pull requests for review
git push origin feature/new-feature

# Merge to main only after testing
git checkout main
git merge feature/new-feature
```

---

## Success Checklist

✅ Website loads at custom domain
✅ Prayer times display and update
✅ Newsletter signup works
✅ Confirmation email received
✅ Donation form displays
✅ Mobile responsive on all devices
✅ No console errors
✅ Fast page load (< 3 seconds)
✅ HTTPS enabled
✅ Sitemap accessible
✅ Robots.txt configured

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Mailgun Docs**: https://mailgun.com/docs
- **Email Support**: contact@alwadud.org

---

**Last Updated**: March 30, 2026
**Maintainer**: Masjid Alwadud Team
