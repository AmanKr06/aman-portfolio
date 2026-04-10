require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const rateLimit   = require('express-rate-limit');
const contactRoute = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Rate limiting — max 5 contact submissions per 15 min per IP ───────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errors: ['Too many messages sent. Please wait 15 minutes before trying again.'],
  },
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'aman-portfolio-server' }));
app.use('/api/contact', contactLimiter, contactRoute);

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Portfolio server running on http://localhost:${PORT}`);
  console.log(`📬  Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`💚  Health check:     GET  http://localhost:${PORT}/health\n`);
});
