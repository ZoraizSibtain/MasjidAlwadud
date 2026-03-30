# 🚀 Getting Started — 5 Minute Quick Start

## 1. Clone & Setup (1 minute)

```bash
# Navigate to project
cd masjid-alwadud

# Install dependencies
npm install
```

## 2. Configure (2 minutes)

Create `.env.local` from template:
```bash
cp .env.example .env.local
```

**Minimal Configuration** (test mode):
```
STRIPE_PUBLIC_KEY=pk_test_123456789
STRIPE_SECRET_KEY=sk_test_123456789
```

**Full Configuration** (with email):
```
# Stripe (from stripe.com dashboard)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=contact@alwadud.org
```

## 3. Run Locally (1 minute)

```bash
npm run dev
```

Open **http://localhost:3000** in browser ✓

## 4. Deploy (1 minute)

### Option A: Deploy with Git (automatic)
```bash
git add .
git commit -m "Deploy to Vercel"
git push
```
→ Vercel auto-deploys from your GitHub

### Option B: Deploy directly
```bash
npm install -g vercel
vercel
```
→ Follow prompts, set environment variables

## ✅ You're Live!

Website is now deployed at: `https://yourname.vercel.app`

---

## What's Included?

✅ **Full-featured website**
- Prayer times (real-time from Al Adhan API)
- Events calendar
- Service descriptions
- Donation system
- Newsletter signup

✅ **Production-ready**
- Mobile responsive
- Fast loading
- HTTPS secured
- SEO optimized
- PWA support

✅ **Monetization**
- Stripe donations
- Email integration
- SMTP newsletter

✅ **Developer tools**
- GitHub integration
- Vercel deployment
- CI/CD workflow
- Environment templates

---

## Common Tasks

### Update Prayer Times Iqamah
Edit in `index.html`:
```javascript
const IQAMAH_TIMES = {
  Fajr:    "06:15",
  Dhuhr:   "13:15",
  Asr:     "16:00",
  Maghrib: null,
  Isha:    "20:00",
};
```

### Update Contact Info
Search for "269E 149th Street" in `index.html` and replace

### Add Social Media Links
Find footer section, update:
```html
<a href="https://facebook.com/yourpage">...
<a href="https://instagram.com/yourpage">...
```

### Customize Colors
Modify the Tailwind color palette in index.html `<script id="tailwind-config">`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Prayer times not showing | Check internet / Al Adhan API status |
| Newsletter not working | Add SMTP_* env vars and redeploy |
| Donations not working | Add Stripe keys and redeploy |
| Local server won't start | Delete `node_modules`, run `npm install` again |
| Env vars not working | Redeploy after adding to Vercel |

---

## Next Steps

1. **Configure Email**: Add SMTP credentials for newsletters
2. **Setup Stripe**: Add real keys for donation processing
3. **Custom Domain**: Add domain in Vercel settings
4. **Analytics**: Add Google Analytics to index.html
5. **Maintenance**: Monitor prayer times, update events

---

## Resources

- 📖 Full Guide: [README.md](README.md)
- 🚀 Deploy Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- 💬 Support: contact@alwadud.org
- 📋 Vercel Docs: https://vercel.com/docs

---

**Ready to deploy? Follow [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps.**
