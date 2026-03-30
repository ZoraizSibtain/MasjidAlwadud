# 🧪 Local Testing Guide

Your Masjid Alwadud website is now running locally with **mock API endpoints** - no real credentials needed!

## 🚀 Server Status

✅ **Server Running**: http://localhost:3000

The development server provides:
- Static website hosting
- Mock newsletter API (no SMTP required)
- Mock donation API (no Stripe required)
- Full local testing environment

---

## 📋 Quick Testing Checklist

### 1. ✓ Website Loads
- Go to http://localhost:3000
- See the full Masjid Alwadud website
- All sections visible and interactive

### 2. ✓ Prayer Times Work
- Real-time prayer times from Al Adhan API (actual API)
- Updates every minute automatically
- Falls back to default times if API unavailable

### 3. ✓ Newsletter Signup (Mock)
1. Scroll to footer
2. Enter a test email (e.g., `test@example.com`)
3. Click "Subscribe"
4. ✅ Success message appears: "JazakAllahu Khairan! You're subscribed."
5. Console shows: `✓ Newsletter subscription: test@example.com`

### 4. ✓ Donation Form (Mock)
1. Scroll to "Donate" section
2. Select $100 (or enter custom amount)
3. Click "One-Time" or "Monthly" toggle
4. Enter:
   - First Name: `Ahmed`
   - Last Name: `Hassan`
   - Email: `test@example.com`
5. Click "Donate $100"
6. ✅ Success alert appears
7. Console shows donation details

### 5. ✓ Navigation
- Click all nav items (Prayers, Services, Events, etc.)
- Smooth scroll works
- Mobile menu opens/closes
- Bottom mobile nav highlights correctly

### 6. ✓ Mobile Responsive
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on multiple screen sizes
- All features work on mobile

---

## 🔍 Testing Details

### Mock API Responses

#### Newsletter Subscription
```javascript
// Request
POST /api/newsletter
{ "email": "test@example.com" }

// Response
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "email": "test@example.com"
}
```

#### Donation Processing
```javascript
// Request
POST /api/donate
{
  "email": "test@example.com",
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "amount": "100",
  "frequency": "onetime"
}

// Response
{
  "success": true,
  "message": "Thank you for your donation of $100",
  "donor": {
    "email": "test@example.com",
    "firstName": "Ahmed",
    "lastName": "Hassan",
    "amount": "100",
    "frequency": "onetime"
  },
  "isDemoMode": true,
  "note": "This is a test/demo mode. No actual payment was processed."
}
```

### Checking Console Logs
1. Open Browser DevTools (F12)
2. Go to Console tab
3. Perform actions (newsletter, donation)
4. See logs like:
   - `✓ Newsletter subscription: test@example.com`
   - `✓ Donation processed: Ahmed Hassan - $100 (onetime)`

---

## 🧬 Testing Scenarios

### Newsletter Validation
**Valid email**: ✅ Works
```
test@example.com
user.name+tag@example.co.uk
```

**Invalid email**: ❌ Shows error
```
notanemail
@example.com
user@
```

### Donation Validation
**Valid donation**:
```
Amount: $50-$999,999 ✅
First Name: Ahmed ✅
Last Name: Hassan ✅
Frequency: onetime or recurring ✅
```

**Invalid donation** - Shows error:
```
Amount: $0 or < $1 ❌
First Name: "" (empty) ❌
Last Name: "A" (1 char) ❌
Email: "invalid" ❌
```

---

## 📊 Verifying Features

### API Endpoints
Test directly in browser console:
```javascript
// Test newsletter
fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
})
.then(r => r.json())
.then(d => console.log('Response:', d))

// Test donation
fetch('/api/donate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    amount: '100',
    frequency: 'onetime'
  })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
```

### Service Worker
1. Open DevTools → Application tab
2. Look for "Service Workers" section
3. Should show registered service worker (optional)

### Local Storage
No local storage is used - all data is stateless

### Browser Compatibility
Works in all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

---

## 🚨 Troubleshooting Local Testing

| Issue | Solution |
|-------|----------|
| Server won't start | Delete `node_modules`, run `npm install`, try again |
| Port 3000 in use | Kill process: `netstat -ano \| findstr :3000` on Windows |
| CSS/JS not loading | Hard refresh: `Ctrl+Shift+R` |
| Prayer times blank | Check internet connection |
| API not responding | Check console for errors, refresh page |

---

## 🎯 What's Different in Local Vs Production

### Local (Development)
✅ Mock newsletter & donation APIs
✅ No Stripe integration
✅ No SMTP email service
✅ No database
✅ No authentication

### Production (Vercel + Services)
✅ Real Stripe payments
✅ Real SMTP email confirmations
✅ Database (optional)
✅ Environment variables
✅ HTTPS/SSL security

---

## 📝 Notes

- **No data is saved** - This is a test environment
- **No emails sent** - APIs are mocked
- **No charges** - No real payments processed
- **Perfect for testing** - All features work as expected

---

## 🔄 When Ready for Production

1. **Stop dev server**: Ctrl+C
2. **Follow DEPLOYMENT.md**: Complete setup guide
3. **Add credentials**:
   - Stripe API keys
   - Email service (SMTP)
   - Custom domain
4. **Deploy to Vercel**: Full production setup

---

## 📚 Next Steps

✅ Test the website locally
✅ Verify all features work
✅ Check responsive design
✅ Review content accuracy
✅ Test on different devices
➡️ Ready to deploy? Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Happy testing! 🎉**

Test data available anytime - server keeps running until you press Ctrl+C.
