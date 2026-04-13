const express = require('express');
const router  = express.Router();
const { Resend } = require('resend');

// ── Input validation ──────────────────────────────────────────────────────
function validateContactInput({ name, email, message }) {
  const errors = [];
  if (!name || name.trim().length < 2)
    errors.push('Name must be at least 2 characters.');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim()))
    errors.push('A valid email address is required.');
  if (!message || message.trim().length < 10)
    errors.push('Message must be at least 10 characters.');
  if (message && message.trim().length > 2000)
    errors.push('Message must be under 2000 characters.');
  return errors;
}

// ── POST /api/contact ─────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const errors = validateContactInput({ name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER;

  try {
    // Email to you
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to:   [receiverEmail],
      reply_to: email.trim(),
      subject: `New message from ${name.trim()} — Portfolio`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#4f8ef7;margin-bottom:4px;">New Portfolio Message</h2>
          <p style="color:#888;font-size:13px;margin-top:0;">Received via iamaman.dev contact form</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0;">
          <table style="width:100%;font-size:15px;line-height:1.8;">
            <tr><td style="color:#555;width:80px;vertical-align:top;"><strong>Name</strong></td><td>${escapeHtml(name.trim())}</td></tr>
            <tr><td style="color:#555;vertical-align:top;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email.trim())}" style="color:#4f8ef7;">${escapeHtml(email.trim())}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0;">
          <p style="color:#555;font-size:13px;margin-bottom:6px;"><strong>Message</strong></p>
          <div style="background:#fff;border-left:4px solid #4f8ef7;padding:12px 16px;border-radius:4px;color:#333;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message.trim())}</div>
          <p style="font-size:12px;color:#aaa;margin-top:20px;">Reply directly to this email — it will go to ${escapeHtml(email.trim())}</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: 'Aman Kumar <onboarding@resend.dev>',
      to:   [email.trim()],
      subject: `Thanks for reaching out, ${name.trim().split(' ')[0]}! 👋`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#4f8ef7;">Hey ${escapeHtml(name.trim().split(' ')[0])}, got your message!</h2>
          <p style="color:#444;line-height:1.7;">Thanks for reaching out through my portfolio. I'll get back to you within 24–48 hours.</p>
          <p style="color:#444;line-height:1.7;">In the meantime, check out my work on <a href="https://github.com/AmanKr06" style="color:#4f8ef7;">GitHub</a>.</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0;">
          <p style="color:#888;font-size:13px;">This is an automated confirmation — please don't reply to this email.</p>
          <p style="color:#555;margin-top:16px;">— Aman Kumar · <a href="https://iamaman.dev" style="color:#4f8ef7;">iamaman.dev</a></p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent! You should receive a confirmation email shortly.',
    });

  } catch (err) {
    console.error('[Contact Route] Resend failed:', err.message);
    return res.status(500).json({
      success: false,
      errors: ['Failed to send email. Please try again or email me directly.'],
    });
  }
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

module.exports = router;