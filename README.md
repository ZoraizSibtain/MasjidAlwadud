# Masjid Alwadud

Official website for Masjid Alwadud, 269E 149th Street, Bronx, NY 10451.

Built with HTML, Tailwind CSS (via CDN), and vanilla JavaScript. Deployed on Vercel with serverless API functions.

## Stack

- **Frontend** — Single-page HTML + Tailwind CSS + vanilla JS
- **Prayer times** — [Al Adhan API](https://aladhan.com/api)
- **Donations** — Stripe (optional)
- **Newsletter** — Nodemailer/SMTP (optional)
- **Deployment** — Vercel

## Project Structure

```
├── index.html                  # Entire website
├── sw.js                       # Service worker (PWA/offline)
├── favicon.svg                 # Site icon
├── robots.txt                  # SEO crawling rules
├── sitemap.xml                 # SEO sitemap
├── site.webmanifest            # PWA manifest
├── vercel.json                 # Vercel config
├── package.json                # Dependencies
└── api/
    ├── donate.js               # Stripe donation endpoint
    └── newsletter.js           # Newsletter signup endpoint
```

## Local Development

```bash
npm install
npm run dev        # starts Express dev server
```

## Deployment

Push to GitHub and connect to Vercel. No environment variables are required for a basic deploy — the donation and newsletter features gracefully degrade when unconfigured.

## Environment Variables (optional)

| Variable | Purpose |
|---|---|
| `STRIPE_PUBLIC_KEY` | Stripe public key (donations) |
| `STRIPE_SECRET_KEY` | Stripe secret key (donations) |
| `SMTP_HOST` | SMTP server (newsletter emails) |
| `SMTP_PORT` | SMTP port |
| `SMTP_SECURE` | TLS — `true` or `false` |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | Sender address |

Set these in your Vercel project dashboard under Settings → Environment Variables.

## Configuration

**Prayer iqamah times** — edit `IQAMAH_TIMES` in `index.html`:

```js
const IQAMAH_TIMES = {
  Fajr:    "06:15",
  Dhuhr:   "13:15",
  Asr:     "16:00",
  Maghrib: null,   // follows adhan immediately
  Isha:    "20:00",
};
```

**Contact info** — search `index.html` for `contact@alwadud.org` and `269E 149th Street` to update address, email, and phone.
