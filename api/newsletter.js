/**
 * API Route: Newsletter Subscription
 * POST /api/newsletter
 * 
 * Handles newsletter subscription requests
 */

const nodemailer = require('nodemailer');

// Simple in-memory storage (for production, use a database)
const subscribers = new Set();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase());

    // Send confirmation email (if email service is configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'noreply@alwadud.org',
          to: email,
          subject: 'Welcome to Masjid Alwadud Newsletter',
          html: `
            <h2>Barakallahu Feek! 🌙</h2>
            <p>Thank you for subscribing to the Masjid Alwadud newsletter.</p>
            <p>You will now receive updates about:</p>
            <ul>
              <li>Daily prayer times</li>
              <li>Community events and announcements</li>
              <li>Islamic educational content</li>
              <li>Special occasions and Eid celebrations</li>
            </ul>
            <p>May Allah bless you and your family. آمين</p>
            <p><strong>Masjid Alwadud</strong><br>
            269E 149th Street, Bronx, NY 10451</p>
          `,
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
        // Don't fail the subscription if email fails
      }
    }

    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ 
      error: 'Failed to process subscription. Please try again.' 
    });
  }
};
