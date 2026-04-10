/* ============================================
   animations.js — Aman Kumar Portfolio
   Scroll-triggered animations & interactions
   ============================================ */

// ── CURSOR GLOW (subtle mouse follower) ──
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = [
  'position:fixed', 'pointer-events:none', 'z-index:9999',
  'width:300px', 'height:300px', 'border-radius:50%',
  'background:radial-gradient(circle,rgba(79,142,247,0.06) 0%,transparent 70%)',
  'transform:translate(-50%,-50%)',
  'transition:left 0.12s ease,top 0.12s ease',
  'left:-999px', 'top:-999px'
].join(';');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── NAV ACTIVE LINK HIGHLIGHT ──
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── STAT CARD COUNT-UP ANIMATION ──
function animateCountUp(el, target) {
  const num = parseInt(target);
  if (isNaN(num) || num > 100) return;
  const suffix   = target.replace(/[0-9]/g, '');
  const duration = 1000;
  const interval = duration / num;
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current + suffix;
    if (current >= num) { el.textContent = target; clearInterval(timer); }
  }, interval);
}

// Observe stats AFTER main.js injects them via MutationObserver
const aboutStatsEl = document.getElementById('about-stats');
if (aboutStatsEl) {
  const mo = new MutationObserver(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(el => {
            animateCountUp(el, el.textContent.trim());
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(aboutStatsEl);
    mo.disconnect();
  });
  mo.observe(aboutStatsEl, { childList: true });
}
