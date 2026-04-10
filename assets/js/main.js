/* ============================================
   main.js — Aman Kumar Portfolio
   Core: nav, theme, back-to-top, data loading
   ============================================ */

const FALLBACK_DATA = {
  personal: {
    name: "Aman Kumar",
    role: "Software Development Engineer I",
    company: "Truminds Software Systems",
    email: "zzk5153@gmail.com",
    linkedin: "https://www.linkedin.com/in/aman-kumar-927804216/",
    github: "https://github.com/AmanKr06",
    location: "Gurugram, India",
    bio: [
      "I'm a Software Development Engineer at Truminds Software Systems, where I build production-grade backend systems, APIs, and automation pipelines for enterprise clients — including Luminous and INGKA (IKEA).",
      "My work spans the full backend lifecycle: from designing cascading database schemas and migrating 258 APIs from .NET Framework to .NET Core, to resolving critical production bugs affecting 20–30K users and deploying containerized workloads on Oracle Cloud Infrastructure.",
      "I'm driven by turning complex, ambiguous requirements into clean, maintainable systems. Currently exploring LLM-based test automation and vibe coding to push what's possible in how we build software."
    ],
    availability: "Open to collaborations"
  },
  stats: [
    { value: "1+",  label: "Year of professional experience" },
    { value: "258", label: "APIs migrated to .NET Core" },
    { value: "EA",  label: "Rated: Exceptional Achiever" },
    { value: "30K", label: "Users impacted by production fix" }
  ],
  experience: [
    {
      role: "Software Development Engineer I",
      company: "Truminds Software Systems",
      duration: "2024 — Present",
      location: "Gurugram, India",
      type: "Full-time",
      description: "Building backend systems and APIs for enterprise clients (Luminous, INGKA/IKEA, Panasonic). Delivered modules spanning API migration, rule engines, push notifications, document verification, and cloud infrastructure POCs.",
      highlights: [
        "Migrated 258 APIs from .NET Framework to .NET Core MVC across mPartner microservices",
        "Built configurable Rule Engine for admin-defined reward schemes — validated on live production data",
        "Designed and delivered Assessment/LMS Module with cascading DB schema — zero post-production bugs",
        "Resolved critical combo sales bug affecting 20–30K users — traced to session-scoped global tables in stored procedures",
        "Built Firebase push notification system with background job running every 5 min via Task Scheduler",
        "Led OCI POC: containerized .NET backend with Load Balancing for High Availability on Oracle Cloud",
        "Implemented document tampering detection using Error Level Analysis (ELA) and Double Compression",
        "Awarded TruRising Star — July 2024"
      ]
    },
    {
      role: "Software Engineering Intern",
      company: "Truminds Software Systems",
      duration: "2023 — 2024",
      location: "Gurugram, India",
      type: "Internship",
      description: "Contributed to live client projects from day one. Built APIs, bulk sale features, document verification via Signzy, and geolocation tooling. Converted to full-time SDE-1 based on performance.",
      highlights: [
        "Built ASM and distributor/dealer mapping APIs for Luminous Sales One",
        "Developed Secondary Bulk Sale feature — up to 1000 product registrations per batch via Excel upload",
        "Built Tertiary Bulk Sale with OTP creation/verification and SMS stored procedure for multi-serial delivery",
        "Integrated Signzy for real-time Aadhaar, PAN, KYC and passport verification",
        "Built standalone GeoLocation Finder app using Google Geocoding API",
        "Developed Common File Upload Service utility used across multiple microservices",
        "Converted to full-time SDE-1 role based on performance"
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: [
        { name: "C / C++",                  pct: 85 },
        { name: "Python",                   pct: 80 },
        { name: "JavaScript / TypeScript",  pct: 72 },
        { name: "T-SQL",                    pct: 78 }
      ]
    },
    {
      category: "Frameworks & Tools",
      items: [
        { name: ".NET Core / Framework", pct: 78 },
        { name: "React Native",          pct: 60 },
        { name: "Jest (Unit Testing)",   pct: 72 },
        { name: "Git & GitHub",          pct: 80 }
      ]
    },
    {
      category: "Cloud & Architecture",
      items: [
        { name: "Oracle Cloud (OCI)",        pct: 62 },
        { name: "REST API Design",           pct: 80 },
        { name: "System Design / HLD / DFD", pct: 72 },
        { name: "SQL Profiler & Tuning",     pct: 70 }
      ]
    }
  ],
  projects: [
    {
      title: "mPartner — 258 API Migration",
      subtitle: "Luminous · Truminds",
      description: "Led migration of 258 APIs from .NET Framework to .NET Core MVC across UserEngagement, ISmart, and HomeScreen/Login microservices — zero regression, improved platform performance.",
      tech: [".NET Core", "T-SQL", "REST APIs", "Microservices"],
      github: "", live: "", status: "proprietary", featured: true
    },
    {
      title: "Rule Engine — Rewards Platform",
      subtitle: "Luminous · Truminds",
      description: "Built a configurable Rule Engine enabling admins to define reward schemes via geo and user-type filters. Validated against a full month of live production data. Rated Exceptional Achiever.",
      tech: [".NET Core", "T-SQL", "SQL Server", "Admin Portal"],
      github: "", live: "", status: "proprietary", featured: true
    },
    {
      title: "Production Bug Fix — 30K Users",
      subtitle: "Luminous · Truminds",
      description: "Debugged and fixed a critical combo sales bug affecting 20–30K users that stumped QA and the client. Root cause: session-scoped global tables in stored procedures. Fixed at DB level, restoring full stability.",
      tech: ["SQL Server", "T-SQL", "Stored Procedures", "Debugging"],
      github: "", live: "", status: "proprietary", featured: true
    },
    {
      title: "Automated RDLC Reporting System",
      subtitle: "Truminds",
      description: "Production-grade automated reporting on Classic .NET Framework with Task Scheduler-driven FTR data uploads — shipped cleanly with no post-production issues.",
      tech: [".NET Framework", "SQL Server", "RDLC", "Task Scheduler"],
      github: "", live: "", status: "proprietary", featured: false
    },
    {
      title: "Firebase Push Notification System",
      subtitle: "Luminous · Truminds",
      description: "Built the backend for a Firebase push notification system. Background job runs every 5 minutes via Task Scheduler, handling sales events, dealer creation alerts, and approval workflows.",
      tech: ["Firebase", ".NET Core", "Task Scheduler", "SQL Server"],
      github: "", live: "", status: "proprietary", featured: false
    },
    {
      title: "Document Tampering Detection",
      subtitle: "Truminds R&D",
      description: "Python-based document authenticity system using Error Level Analysis (ELA) and Double Compression algorithms to detect digital artefacts introduced by image editing tools.",
      tech: ["Python", "ELA", "Double Compression", "Image Processing"],
      github: "", live: "", status: "proprietary", featured: false
    },
    {
      title: "OCI Cloud Infrastructure POC",
      subtitle: "Truminds R&D",
      description: "Deployed containerized and VM-based .NET backend on Oracle Cloud with Load Balancing for High Availability — delivered alongside active sprint commitments.",
      tech: ["Oracle Cloud", ".NET", "Docker", "Load Balancer"],
      github: "", live: "", status: "proprietary", featured: false
    },
    {
      title: "Panasonic MirAIe — Frontend",
      subtitle: "Panasonic · Truminds",
      description: "Developed Tenant Info screen, workspace selection bottom sheet, and device status cards for the Panasonic MirAIe smart home app in React Native — following Figma specs.",
      tech: ["React Native", "TypeScript", "Figma"],
      github: "", live: "", status: "proprietary", featured: false
    },
    {
      title: "Digital-Products",
      subtitle: "Personal Project",
      description: "A personal web project built for couples — exploring shared digital experiences. Built independently as a learning project.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/AmanKr06/DigitalProduct",
      live: "", status: "personal", featured: false
    },
    {
      title: "LLM-Based Test Automation",
      subtitle: "Personal R&D",
      description: "Exploring automated test case generation using LLMs and vibe coding workflows — reducing manual QA effort by generating and validating test suites from natural language requirements.",
      tech: ["Python", "LLMs", "Prompt Engineering", "Jest"],
      github: "", live: "", status: "in-progress", featured: false
    }
  ],
  certifications: [
    {
      title: "TruRising Star Award",
      issuer: "Truminds Software Systems",
      date: "July 2024",
      type: "award",
      icon: "⭐",
      description: "Recognized for consistent high-impact delivery and contributions across client workstreams (Luminous, INGKA) in the first year as an SDE-1.",
      attachment: ""
    }
  ]
};

// ── LOAD DATA ──
async function loadPortfolioData() {
  let data = FALLBACK_DATA;
  try {
    const res = await fetch('./data/portfolio.json');
    if (res.ok) {
      data = await res.json();
      console.info('portfolio.json loaded');
    }
  } catch (_) {
    console.info('Using fallback data — open with Live Server for full experience');
  }
  renderAll(data);
}

function renderAll(data) {
  renderHero(data.personal, data.stats);
  renderExperience(data.experience);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderCertifications(data.certifications);
  renderContact(data.personal);
  renderFooter(data.personal);
}

// ── RENDER: HERO ──
function renderHero(personal, stats) {
  const badgeEl = document.querySelector('.hero-badge-text');
  if (badgeEl) badgeEl.textContent = personal.availability;

  const avatarWrapper = document.getElementById('hero-avatar');
  if (avatarWrapper) {
    const img = new Image();
    img.onload  = () => {
      avatarWrapper.innerHTML = `<img src="assets/images/profile.jpg" alt="${personal.name}" class="hero-avatar" title="Click to enlarge" />`;
    };
    img.onerror = () => {
      avatarWrapper.innerHTML = `<div class="hero-avatar-placeholder">${getInitials(personal.name)}</div>`;
    };
    img.src = 'assets/images/profile.jpg';
  }

  const nameEl = document.getElementById('hero-name');
  if (nameEl) {
    const [first, ...rest] = personal.name.split(' ');
    nameEl.innerHTML = `${first} <span>${rest.join(' ')}</span>`;
  }

  const roleEl    = document.getElementById('hero-role');
  const companyEl = document.getElementById('hero-company');
  if (roleEl)    roleEl.textContent    = personal.role;
  if (companyEl) companyEl.textContent = `@ ${personal.company}`;

  const statsGrid = document.getElementById('about-stats');
  if (statsGrid) {
    statsGrid.innerHTML = stats.map(s => `
      <div class="stat-card glass-card">
        <div class="stat-num">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
  }

  const bioEl = document.getElementById('about-bio');
  if (bioEl) bioEl.innerHTML = personal.bio.map(p => `<p>${p}</p>`).join('');
}

// ── RENDER: EXPERIENCE ──
function renderExperience(experiences) {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  timeline.innerHTML = experiences.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-meta">
        <span class="timeline-duration">${exp.duration}</span>
        <span class="timeline-type">${exp.type}</span>
      </div>
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-company">${exp.company} · ${exp.location}</div>
      <p class="timeline-desc">${exp.description}</p>
      <ul class="timeline-highlights">
        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>`).join('');
  observeReveal();
}

// ── RENDER: SKILLS ──
function renderSkills(skillGroups) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = skillGroups.map(group => `
    <div class="skill-card glass-card reveal">
      <div class="skill-category">${group.category}</div>
      ${group.items.map(skill => `
        <div class="skill-item" data-pct="${skill.pct}">
          <div class="skill-top">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-pct">${skill.pct}%</span>
          </div>
          <div class="skill-bar"><div class="skill-fill"></div></div>
        </div>`).join('')}
    </div>`).join('');
  observeReveal();
  observeSkillBars();
}

// ── RENDER: PROJECTS ──
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const statusBadge = {
    proprietary:   { label: 'Proprietary', cls: 'badge-proprietary' },
    'in-progress': { label: 'In Progress', cls: 'badge-inprogress'  },
    personal:      { label: 'Personal',    cls: 'badge-personal'    }
  };
  const statusIcon = {
    proprietary:   '🔒',
    'in-progress': '🚧',
    personal:      '🧑‍💻'
  };

  grid.innerHTML = projects.map(p => {
    const badge     = statusBadge[p.status];
    const icon      = statusIcon[p.status] || '📁';
    const badgeHtml = badge ? `<span class="project-badge ${badge.cls}">${badge.label}</span>` : '';
    return `
      <div class="project-card glass-card reveal hover-float${p.featured ? ' project-featured' : ''}">
        <div class="project-card-top">
          <div class="project-icon-wrap">${icon}</div>
          ${badgeHtml}
        </div>
        <div class="project-title">${p.title}</div>
        ${p.subtitle ? `<div class="project-subtitle">${p.subtitle}</div>` : ''}
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">
          ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.github
            ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link">⌥ GitHub ↗</a>`
            : `<span class="project-link project-link--muted">Code: Proprietary</span>`}
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="project-link">↗ Live Demo</a>` : ''}
        </div>
      </div>`;
  }).join('');
  observeReveal();
}

// ── RENDER: CERTIFICATIONS ──
function renderCertifications(certs) {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  if (!certs || certs.length === 0) {
    certs = [{
      title: "TruRising Star Award",
      issuer: "Truminds Software Systems",
      date: "July 2024",
      type: "award",
      icon: "⭐",
      description: "Recognized for consistent high-impact delivery and contributions across client workstreams in the first year as an SDE-1.",
      attachment: ""
    }];
  }

  grid.innerHTML = certs.map(cert => {
    let attachmentBtn = '';
    if (cert.attachment) {
      const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(cert.attachment);
      attachmentBtn = isImage
        ? `<button class="cert-attachment" onclick="openCertLightbox('${cert.attachment}')" aria-label="View certificate image">🖼 View Image</button>`
        : `<a class="cert-attachment" href="${cert.attachment}" target="_blank" rel="noopener" aria-label="Open certificate PDF">📄 View PDF</a>`;
    }
    return `
      <div class="cert-card glass-card reveal hover-float">
        <div class="cert-icon">${cert.icon || (cert.type === 'award' ? '⭐' : '📜')}</div>
        <div class="cert-body">
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer}</div>
          <div class="cert-date">${cert.date}</div>
          ${cert.description ? `<p style="font-size:0.82rem;color:var(--text-muted);margin-top:0.5rem;line-height:1.6;">${cert.description}</p>` : ''}
          <div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.5rem;flex-wrap:wrap;">
            <span class="cert-type cert-type--${cert.type}">${cert.type === 'award' ? '🏆 Award' : '📜 Certificate'}</span>
            ${attachmentBtn}
          </div>
        </div>
      </div>`;
  }).join('');

  observeReveal();
}

// ── RENDER: CONTACT ──
function renderContact(personal) {
  const linksEl = document.getElementById('contact-links');
  if (!linksEl) return;
  linksEl.innerHTML = `
    <a href="mailto:${personal.email}" class="contact-link">
      <div class="contact-icon">✉</div>${personal.email}
    </a>
    <a href="${personal.linkedin}" target="_blank" rel="noopener" class="contact-link">
      <div class="contact-icon">in</div>LinkedIn
    </a>
    <a href="${personal.github}" target="_blank" rel="noopener" class="contact-link">
      <div class="contact-icon">&lt;/&gt;</div>GitHub
    </a>`;
}

// ── RENDER: FOOTER ──
function renderFooter(personal) {
  const n = document.getElementById('footer-name');
  const r = document.getElementById('footer-role');
  const c = document.getElementById('footer-company');
  if (n) n.textContent = personal.name;
  if (r) r.textContent = personal.role;
  if (c) c.textContent = personal.company;
}

// ── OBSERVERS ──
function observeReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.observed)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => { el.classList.add('observed'); io.observe(el); });
}

function observeSkillBars() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-pct]').forEach(item => {
          item.querySelector('.skill-fill').style.width = item.dataset.pct + '%';
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => io.observe(c));
}

// ── NAV ──
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
}

// ── THEME ──
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    btn.textContent = '🌙';
  }
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '🌙' : '☀';
  });
}

// ── BACK TO TOP ──
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── CONTACT FORM ──
const CONTACT_API = 'https://aman-portfolio-server.onrender.com/api/contact';

function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;
  const btn     = form.querySelector('.form-submit');
  let statusEl  = form.querySelector('.form-status');

  // Inject a status message element if not already in HTML
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.className = 'form-status';
    form.appendChild(statusEl);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus(statusEl);

    const name    = form.querySelector('#name')?.value.trim()    || form.querySelector('[name="name"]')?.value.trim()    || '';
    const email   = form.querySelector('#email')?.value.trim()   || form.querySelector('[name="email"]')?.value.trim()   || '';
    const message = form.querySelector('#message')?.value.trim() || form.querySelector('[name="message"]')?.value.trim() || '';

    // Basic client-side guard
    if (!name || !email || !message) {
      showStatus(statusEl, 'error', 'Please fill in all fields.');
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    try {
      const res  = await fetch(CONTACT_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showStatus(statusEl, 'success', '✓ Message sent! Check your inbox for a confirmation.');
        form.reset();
        btn.textContent = '✓ Sent!';
        setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 4000);
      } else {
        const msg = data.errors ? data.errors.join(' ') : 'Something went wrong. Please try again.';
        showStatus(statusEl, 'error', msg);
        btn.textContent = 'Send Message';
        btn.disabled    = false;
      }
    } catch (err) {
      // Server unreachable (not running yet, network issue, etc.)
      showStatus(
        statusEl, 'error',
        'Could not reach the server. Make sure the backend is running (see README).'
      );
      btn.textContent = 'Send Message';
      btn.disabled    = false;
    }
  });
}

function showStatus(el, type, msg) {
  el.textContent  = msg;
  el.className    = `form-status form-status--${type}`;
}
function clearStatus(el) {
  el.textContent = '';
  el.className   = 'form-status';
}

// ── LIGHTBOX (profile photo + cert images) ──
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const backdrop = lightbox ? lightbox.querySelector('.lightbox-backdrop') : null;
  const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  if (!lightbox || !lbImg) return;

  function openLightbox(src, round = true) {
    lbImg.src = src;
    lbImg.style.borderRadius = round ? '50%' : '12px';
    lbImg.style.width  = round ? 'min(400px, 85vw)' : 'min(600px, 90vw)';
    lbImg.style.height = round ? 'min(400px, 85vw)' : 'auto';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Expose for cert images (called via onclick in rendered HTML)
  window.openCertLightbox = (src) => openLightbox(src, false);

  // Attach to profile avatar once injected
  const avatarWrapper = document.getElementById('hero-avatar');
  if (avatarWrapper) {
    const mo = new MutationObserver(() => {
      const img = avatarWrapper.querySelector('img.hero-avatar');
      if (img) {
        img.addEventListener('click', () => openLightbox(img.src, true));
        mo.disconnect();
      }
    });
    mo.observe(avatarWrapper, { childList: true });
  }

  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// ── HELPERS ──
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
  initNav();
  initTheme();
  initBackToTop();
  initContactForm();
  initLightbox();
  observeReveal();
});
