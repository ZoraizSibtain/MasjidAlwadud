# 🕌 Masjid Alwadud — Al-Nur Sanctuary

A beautiful, fully-functional website for Masjid Alwadud (Al-Nur Sanctuary) in the Bronx, NY. Built with HTML, CSS (Tailwind), and vanilla JavaScript.

## ✨ Features

- **Prayer Times**: Real-time prayer times from Al Adhan API with local iqamah times
- **Responsive Design**: Mobile-first design that works on all devices
- **Event Calendar**: Upcoming events and announcements
- **Newsletter Signup**: Email subscription with SMTP support
- **Donation System**: Secure donations powered by Stripe
- **Contact & Map**: Location, directions, and Google Maps integration
- **SEO Optimized**: Proper meta tags, sitemap, and robots.txt
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Fast-loading, optimized assets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Vercel account (for deployment)
- Stripe account (for donations)
- SMTP email service (Gmail, Mailgun, SendGrid, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/masjid-alwadud.git
cd masjid-alwadud
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- Stripe keys (get from https://stripe.com)
- SMTP credentials (Gmail, Mailgun, etc.)

4. **Run locally**
```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_PUBLIC_KEY` | Stripe public API key | Yes (for donations) |
| `STRIPE_SECRET_KEY` | Stripe secret API key | Yes (for donations) |
| `SMTP_HOST` | SMTP server hostname | No |
| `SMTP_PORT` | SMTP server port | No |
| `SMTP_SECURE` | Use TLS (true/false) | No |
| `SMTP_USER` | SMTP username/email | No |
| `SMTP_PASS` | SMTP password | No |
| `EMAIL_FROM` | Sender email address | No |

## 🌐 Deployment to Vercel

### One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fmasjid-alwadud&env=STRIPE_PUBLIC_KEY,STRIPE_SECRET_KEY,SMTP_HOST,SMTP_PORT,SMTP_SECURE,SMTP_USER,SMTP_PASS,EMAIL_FROM)

### Manual Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/import
   - Select "Import Git Repository"
   - Choose your repository
   - Add environment variables from `.env.example`
   - Click "Deploy"

3. **Add Custom Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add your domain (e.g., alwadud.org)
   - Update DNS records as instructed

## 🔧 Configuration

### Prayer Times
Edit `IQAMAH_TIMES` in `index.html` to set your masjid's iqamah times:

```javascript
const IQAMAH_TIMES = {
  Fajr:    "06:15",
  Dhuhr:   "13:15",
  Asr:     "16:00",
  Maghrib: null,   // follows adhan immediately
  Isha:    "20:00",
};
```

### Contact Information
Update contact details in `index.html`:
- Address: 269E 149th Street, Bronx, NY 10451
- Email: contact@alwadud.org
- Phone: +1 (718) 555-0123

### Social Media
Update social links in footer:
- Facebook: `https://facebook.com/alwadud`
- Instagram: `https://instagram.com/alwadud`
- YouTube: `https://youtube.com/@alwadud`

## 💰 Donations Setup

### With Stripe

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Add to environment variables:
   - `STRIPE_PUBLIC_KEY` (starts with `pk_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_`)
4. Test with Stripe test cards (see Stripe docs)
5. Switch to live keys when ready for production

### Without Payment Processing

If you don't want to accept online donations, the donation button will show a success message but won't charge. You can add information about checks or wire transfers instead.

## 📧 Email Configuration

### Gmail
1. Enable 2-factor authentication
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASS`

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Mailgun (Recommended for production)
1. Sign up at https://mailgun.com
2. Get SMTP credentials from Settings → SMTP Access

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@YOUR_DOMAIN.mailgun.org
SMTP_PASS=YOUR_MAILGUN_PASSWORD
```

### SendGrid
1. Get API key from SendGrid dashboard
2. Use `apikey` as username

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.YOUR_API_KEY
```

## 📁 File Structure

```
├── index.html              # Main website (single-page app)
├── favicon.svg             # Favicon
├── robots.txt              # SEO: Search engine crawling rules
├── sitemap.xml             # SEO: XML sitemap
├── site.webmanifest        # PWA: Web app manifest
├── vercel.json             # Vercel configuration
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .github/
│   └── workflows/          # GitHub Actions (optional)
└── api/
    ├── newsletter.js       # Newsletter subscription API
    └── donate.js           # Donation processing API
```

## 🔒 Security

- API routes validate all inputs
- CORS headers properly configured
- Environment variables for sensitive data
- Content Security Policy headers
- XSS and clickjacking protection
- No sensitive data in client-side code

## 📊 SEO & Analytics

- **Sitemap**: `sitemap.xml` for search engines
- **Robots.txt**: Crawling instructions
- **Meta Tags**: OG tags for social sharing
- **Structured Data**: Schema.org markup (ready)
- **Analytics**: Add Google Analytics ID to `.env`

Edit `index.html` to add your analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
```

## 🐛 Troubleshooting

### Prayer Times Not Loading
- Check your internet connection
- Verify Al Adhan API is accessible
- Check browser console for errors
- Fallback times will be used if API is unavailable

### Newsletter/Donation Not Working
- Check environment variables are set
- Verify email/payment credentials
- Check Vercel function logs: `vercel logs`
- Test SMTP with: `telnet smtp.gmail.com 587`

### Maps Not Showing
- Verify Google Maps embed is accessible
- Check if location is blocked by ad blocker
- Ensure no CORS issues

## 📞 Support

For issues or questions:
- Email: contact@alwadud.org
- Phone: +1 (718) 555-0123
- Address: 269E 149th Street, Bronx, NY 10451

## 📄 License

MIT License - feel free to use and modify for your organization

## 🙏 Acknowledgments

- Prayer times from [Al Adhan API](https://aladhan.com/api)
- Icons from [Google Material Symbols](https://fonts.google.com/icons)
- Fonts from [Google Fonts](https://fonts.google.com)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Payments with [Stripe](https://stripe.com)

---

**May Allah bless this community and this work. آمين**

Last Updated: March 30, 2026
