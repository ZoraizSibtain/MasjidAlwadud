/**
 * API Route: Donation Processing
 * POST /api/donate
 * 
 * Handles donation requests and processes payments via Stripe
 */

const nodemailer = require('nodemailer');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Donation validation helper
function validateDonation(data) {
  const errors = [];

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  }

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name is required and must be at least 2 characters');
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Last name is required and must be at least 2 characters');
  }

  const amount = parseFloat(data.amount);
  if (!amount || amount < 1 || amount > 999999) {
    errors.push('Donation amount must be between $1 and $999,999');
  }

  if (!['onetime', 'recurring'].includes(data.frequency)) {
    errors.push('Invalid donation frequency');
  }

  return errors;
}

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
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(503).json({
        error: 'Payment processing is not configured. Please contact support.'
      });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const { 
      email, 
      firstName, 
      lastName, 
      amount, 
      frequency,
      paymentMethodId 
    } = req.body;

    // Validate input
    const validationErrors = validateDonation({
      email,
      firstName,
      lastName,
      amount,
      frequency
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: validationErrors.join('; ') 
      });
    }

    const amountCents = Math.round(parseFloat(amount) * 100);

    // Create or retrieve Stripe customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
        metadata: {
          firstName,
          lastName,
          donationDate: new Date().toISOString()
        }
      });
      customerId = customer.id;
    }

    let paymentIntentData = {
      customer: customerId,
      amount: amountCents,
      currency: 'usd',
      description: `Donation to Masjid Alwadud from ${firstName} ${lastName}`,
      metadata: {
        firstName,
        lastName,
        email,
        frequency
      }
    };

    // Handle recurring donations
    if (frequency === 'recurring') {
      // Create a subscription (requires payment method)
      if (!paymentMethodId) {
        return res.status(400).json({
          error: 'Payment method required for recurring donations'
        });
      }

      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });

      // Set as default
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });

      // Create price for the product
      const price = await stripe.prices.create({
        unit_amount: amountCents,
        currency: 'usd',
        recurring: {
          interval: 'month'
        },
        product_data: {
          name: 'Monthly Donation to Masjid Alwadud'
        }
      });

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: price.id }],
        metadata: {
          firstName,
          lastName,
          email
        }
      });

      // Log successful donation
      console.log(`Recurring donation created: ${firstName} ${lastName} - $${amount}/month`);

      // Send confirmation email
      await sendDonationEmail(email, firstName, amount, frequency);

      return res.status(200).json({
        success: true,
        message: `Thank you for your monthly donation of $${amount}`,
        subscriptionId: subscription.id,
        frequency: 'recurring'
      });
    } else {
      // One-time donation
      if (!paymentMethodId) {
        return res.status(400).json({
          error: 'Payment method required'
        });
      }

      // Create payment intent for one-time donation
      paymentIntentData.payment_method = paymentMethodId;
      paymentIntentData.confirm = true;
      paymentIntentData.off_session = true;

      const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

      if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing') {
        // Log successful donation
        console.log(`One-time donation processed: ${firstName} ${lastName} - $${amount}`);

        // Send confirmation email
        await sendDonationEmail(email, firstName, amount, frequency);

        return res.status(200).json({
          success: true,
          message: `Thank you for your donation of $${amount}`,
          paymentIntentId: paymentIntent.id,
          frequency: 'onetime'
        });
      } else {
        return res.status(400).json({
          error: 'Payment could not be processed. Please try again.'
        });
      }
    }
  } catch (error) {
    console.error('Donation error:', error);

    // Handle Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: error.message || 'Invalid donation request' 
      });
    }

    return res.status(500).json({ 
      error: 'Failed to process donation. Please try again or contact support.' 
    });
  }
};

// Helper function to send donation confirmation email
async function sendDonationEmail(email, firstName, amount, frequency) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return; // Email service not configured
  }

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

    const frequencyText = frequency === 'recurring' ? `$${amount} monthly` : `$${amount}`;
    const subscriptionText = frequency === 'recurring' ? 'You can manage your subscription anytime by contacting us.' : '';

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@alwadud.org',
      to: email,
      subject: 'Donation Confirmation - Masjid Alwadud',
      html: `
        <h2>Barakallahu Feek, ${firstName}! 💚</h2>
        <p>Thank you for your generous donation of <strong>${frequencyText}</strong> to Masjid Alwadud.</p>
        <p>Your contribution will directly support:</p>
        <ul>
          <li>Daily prayer facilities and maintenance</li>
          <li>Quran classes and Islamic education programs</li>
          <li>Community events and outreach</li>
          <li>Pastoral counseling and community support</li>
        </ul>
        <p>${subscriptionText}</p>
        <p>
          <em>"The best charity is that given when one is in need, yet it is given anyway." - Hadith</em>
        </p>
        <p>May Allah accept from you and reward you with goodness. آمين</p>
        <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Masjid Alwadud</strong><br>
        269E 149th Street, Bronx, NY 10451<br>
        <a href="https://www.alwadud.org">www.alwadud.org</a><br>
        contact@alwadud.org</p>
      `,
    });
  } catch (err) {
    console.error('Error sending donation email:', err);
  }
}
