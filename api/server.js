/**
 * Development Server for Masjid Alwadud
 * Serves static files and mock API endpoints for testing
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from project root
app.use(express.static(path.join(__dirname, '..')));

// ============================================================
// API ROUTES - Mock implementations for testing
// ============================================================

/**
 * POST /api/newsletter
 * Mock newsletter subscription - works without SMTP
 */
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  console.log(`✓ Newsletter subscription: ${email}`);

  return res.status(200).json({
    success: true,
    message: 'Successfully subscribed to newsletter',
    email: email
  });
});

/**
 * POST /api/donate
 * Mock donation - works without Stripe
 */
app.post('/api/donate', (req, res) => {
  const { email, firstName, lastName, amount, frequency } = req.body;

  // Validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!firstName || firstName.trim().length < 2) {
    return res.status(400).json({ error: 'First name is required' });
  }

  if (!lastName || lastName.trim().length < 2) {
    return res.status(400).json({ error: 'Last name is required' });
  }

  const parsedAmount = parseFloat(amount);
  if (!parsedAmount || parsedAmount < 1 || parsedAmount > 999999) {
    return res.status(400).json({ error: 'Donation amount must be between $1 and $999,999' });
  }

  if (!['onetime', 'recurring'].includes(frequency)) {
    return res.status(400).json({ error: 'Invalid donation frequency' });
  }

  console.log(`✓ Donation processed: ${firstName} ${lastName} - $${amount} (${frequency})`);

  return res.status(200).json({
    success: true,
    message: `Thank you for your donation of $${amount}`,
    donor: {
      email,
      firstName,
      lastName,
      amount,
      frequency
    },
    isDemoMode: true,
    note: 'This is a test/demo mode. No actual payment was processed.'
  });
});

// ============================================================
// FALLBACK - Serve index.html for SPA routing
// ============================================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ============================================================
// ERROR HANDLING
// ============================================================
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   🕌 Masjid Alwadud - Development Server                  ║
║                                                            ║
║   ✓ Server running on http://localhost:${PORT}      ║
║   ✓ Static files served from project root                ║
║   ✓ API endpoints mocked for testing (no credentials)    ║
║                                                            ║
║   Available endpoints:                                    ║
║   - GET  /                     (Main website)             ║
║   - POST /api/newsletter       (Mock newsletter)          ║
║   - POST /api/donate           (Mock donation)            ║
║                                                            ║
║   For production, configure:                              ║
║   - .env with STRIPE_SECRET_KEY and SMTP credentials      ║
║                                                            ║
║   Press Ctrl+C to stop                                    ║
╚════════════════════════════════════════════════════════════╝
  `);
});
