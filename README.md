# Aman Kumar — Personal Portfolio

> Personal portfolio website for Aman Kumar, SDE-1 at Truminds Software Systems.

---

## 🚀 Quick Start

1. Clone or download this project
2. Open `index.html` in your browser — **that's it for the frontend**
3. For backend features (contact form), see the Server Setup section below

---

## 📁 Project Structure

```
aman-portfolio/
├── index.html                  # Main entry point
├── 404.html                    # Custom not-found page
├── README.md                   # This file
├── .gitignore
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Main styles & CSS variables
│   │   ├── animations.css      # Keyframes & scroll reveal
│   │   └── responsive.css      # Mobile/tablet breakpoints
│   │
│   ├── js/
│   │   ├── main.js             # Core logic, data loading, theme
│   │   └── github.js           # GitHub API integration
│   │
│   └── images/
│       ├── profile.jpg         # Your photo (add this!)
│       ├── favicon.png         # Browser tab icon
│       └── projects/           # Project screenshots
│
├── data/
│   └── portfolio.json          # ← Edit ALL your content here
│
└── server/                     # Backend (Step 8 — coming soon)
    ├── index.js
    ├── routes/
    ├── config/
    └── package.json
```

---

## ✏️ How to Customize

### Update your personal info
Edit **`data/portfolio.json`** — this is the single source of truth for all content:
- Personal info, bio, links
- Experience / timeline entries
- Skills and percentages
- Project cards

### Add your photo
Drop your photo into `assets/images/` and name it `profile.jpg`.

### Add your resume
Drop your PDF into `assets/` and name it `resume.pdf`.

### GitHub stats
In `assets/js/github.js`, update:
```js
const GITHUB_USERNAME = 'your-github-username';
```

---

## 🧱 Build Roadmap

- [x] Step 1 — Project structure & split files
- [ ] Step 2 — Projects section
- [ ] Step 3 — Experience timeline
- [ ] Step 4 — Resume download + SEO
- [ ] Step 5 — GitHub API integration
- [ ] Step 6 — Dark/Light mode toggle
- [ ] Step 7 — Certifications section
- [ ] Step 8 — Backend: working contact form (Node.js)
- [ ] Step 9 — 404 page + back to top
- [ ] Step 10 — Deploy 🚀

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3 (custom), Vanilla JavaScript  
**Fonts:** Syne (display), DM Sans (body) via Google Fonts  
**APIs:** GitHub REST API  
**Backend (coming):** Node.js, Express, Nodemailer

---

## 📬 Contact

**Aman Kumar** · SDE-1 · Truminds Software Systems

---

## 🖥️ Backend — Contact Form (Step 4)

The contact form requires the Node.js server to be running locally (or deployed).

### Prerequisites
- Node.js v18+ installed ([nodejs.org](https://nodejs.org))

### Setup

```bash
# 1. Go into the server folder
cd server

# 2. Install dependencies
npm install

# 3. Create your .env file from the example
cp .env.example .env

# 4. Open .env and fill in your Gmail credentials
#    (see comments inside .env.example for how to get an App Password)

# 5. Start the server
npm run dev        # development (auto-restarts on save)
# or
npm start          # production
```

The server runs on **http://localhost:3001** by default.  
You must have it running whenever you want the contact form to work locally.

### Gmail App Password (required)
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required for App Passwords)
3. Search "App passwords" → create one → select **Mail**
4. Copy the 16-character code into `.env` as `GMAIL_APP_PASSWORD`

> ⚠️ Never use your real Gmail password. App Passwords are revocable and safe.

### How it works
- `POST /api/contact` — validates input, sends you an email, sends the visitor an auto-reply
- Rate limited to **5 submissions per 15 minutes** per IP
- HTML-escapes all input before putting it in the email template
