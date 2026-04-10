const nodemailer = require('nodemailer');

/**
 * Creates and returns a Nodemailer transporter using Gmail SMTP.
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD in .env
 */
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      'Missing email credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file.'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

module.exports = { createTransporter };
