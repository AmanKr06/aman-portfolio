/* ============================================
   github.js — Aman Kumar Portfolio
   Live GitHub stats via GitHub REST API v3

   WHY STATS MAY NOT SHOW:
   - file:// protocol blocks external API calls (CORS)
   - Fix: open with VS Code Live Server (http://localhost)
   - The card auto-hides if API is unreachable — no broken UI
   ============================================ */

const GITHUB_USERNAME = 'AmanKr06';

async function loadGitHubStats() {
  const el = document.getElementById('github-stats');
  if (!el) return;

  // Show loading skeleton while fetching
  el.style.display = 'block';
  el.innerHTML = `
    <div class="github-card glass-card">
      <div class="github-loading">
        <div class="github-loading-line" style="width:60%"></div>
        <div class="github-loading-line" style="width:40%; margin-top:8px"></div>
        <div style="display:flex; gap:1rem; margin-top:1.25rem;">
          <div class="github-loading-line" style="flex:1; height:40px; border-radius:8px"></div>
          <div class="github-loading-line" style="flex:1; height:40px; border-radius:8px"></div>
          <div class="github-loading-line" style="flex:1; height:40px; border-radius:8px"></div>
        </div>
      </div>
    </div>`;

  try {
    // Fetch user + repos in parallel
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers })
    ]);

    // If API rate-limited or blocked, hide card cleanly
    if (!userRes.ok) {
      console.warn(`GitHub API responded: ${userRes.status} — hiding stats card`);
      el.style.display = 'none';
      return;
    }

    const user  = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const totalStars   = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const topLanguages = getTopLanguages(repos);

    el.innerHTML = `
      <div class="github-card glass-card reveal">
        <div class="github-header">
          <img
            src="${user.avatar_url}"
            alt="${user.name || GITHUB_USERNAME}"
            class="github-avatar"
            onerror="this.style.display='none'"
          />
          <div>
            <div class="github-name">${user.name || GITHUB_USERNAME}</div>
            <div class="github-handle">@${user.login}</div>
            ${user.bio ? `<div class="github-bio">${user.bio}</div>` : ''}
          </div>
        </div>

        <div class="github-stats-grid">
          <div class="github-stat">
            <div class="github-stat-num">${user.public_repos}</div>
            <div class="github-stat-label">Public Repos</div>
          </div>
          <div class="github-stat">
            <div class="github-stat-num">${user.followers}</div>
            <div class="github-stat-label">Followers</div>
          </div>
          <div class="github-stat">
            <div class="github-stat-num">${totalStars}</div>
            <div class="github-stat-label">Total Stars</div>
          </div>
        </div>

        ${topLanguages.length ? `
          <div class="github-langs">
            <div class="github-langs-label">Top Languages</div>
            <div class="github-langs-list">
              ${topLanguages.map(l => `<span class="tech-tag">${l}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <a
          href="https://github.com/${GITHUB_USERNAME}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary"
          style="text-align:center; display:block; margin-top:1.25rem; font-size:0.85rem; padding:0.6rem 1rem;"
        >
          View GitHub Profile ↗
        </a>
      </div>`;

    // Trigger reveal animation
    requestAnimationFrame(() => {
      el.querySelector('.github-card').classList.add('visible');
    });

  } catch (err) {
    // Network blocked (file://) or no internet — hide silently, no broken UI
    console.info('GitHub stats hidden:', err.message,
      '— Open with Live Server (http://localhost) to see live stats.');
    el.style.display = 'none';
  }
}

function getTopLanguages(repos) {
  const count = {};
  repos.forEach(r => {
    if (r.language && !r.fork) {
      count[r.language] = (count[r.language] || 0) + 1;
    }
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang);
}

document.addEventListener('DOMContentLoaded', loadGitHubStats);
