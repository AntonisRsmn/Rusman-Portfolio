// Reveal on scroll
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Dynamic year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav ARIA
const navToggle = document.getElementById("nav-toggle");
const navToggleLabel = document.querySelector(".nav-toggle-label");
if (navToggle && navToggleLabel) {
  navToggleLabel.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("change", () => {
    navToggleLabel.setAttribute("aria-expanded", navToggle.checked ? "true" : "false");
  });
}

// THEME: init + sync with slide switch
(function () {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const mq = window.matchMedia("(prefers-color-scheme: light)");

  const applyTheme = (theme, persist = true) => {
    const isLight = theme === "light";
    body.classList.toggle("light-theme", isLight);
    if (toggle) {
      toggle.checked = isLight;
      toggle.setAttribute("aria-checked", String(isLight));
    }
    if (persist) localStorage.setItem("theme", theme);
  };

  const initTheme = () => {
    const stored = localStorage.getItem("theme");
    const theme = stored || (mq.matches ? "light" : "dark");
    applyTheme(theme, false);
  };

  initTheme();

  if (toggle) {
    toggle.addEventListener("change", (e) => {
      applyTheme(e.currentTarget.checked ? "light" : "dark");
    });
  }

  // Follow system changes when user hasn't chosen manually
  const onPrefChange = (e) => {
    if (localStorage.getItem("theme")) return;
    applyTheme(e.matches ? "light" : "dark", false);
  };
  if (mq.addEventListener) mq.addEventListener("change", onPrefChange);
  else mq.addListener(onPrefChange); // older Safari
})();

// Social links
// Guard social link assignments (optional safety)
const gh = document.getElementById("github-link");
if (gh) gh.href = "https://github.com/AntonisRsmn";
const li = document.getElementById("linkedin-link");
if (li) li.href = "https://www.linkedin.com/in/antonis-rusman-a46424319/";
const ig = document.getElementById("insta-link");
if (ig) ig.href = "https://instagram.com/_.rusman._";
const cv = document.getElementById("resume-link");
if (cv) {
  cv.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your resume PDF link here.");
  });
}

// Make mail social-link visually prominent by default
// Previously we auto-added an `.email` accent class; keep the UI neutral by default.
// To highlight the email icon programmatically, add the `active` class to the element:
// document.querySelector('.social-link[href^="mailto:"]').classList.add('active')


/* ----------------------------- */
/* Seasonal manager: setSeason/clearSeason/toggleSeason
   - Add `season-<name>` class to <body>
   - Optionally spawn visual effects per season
   - Exposed globally for usage from console or other scripts
*/
(function () {
  const body = document.body;
  let current = null;
  let overlay = null;
  let spawner = null;

  function createOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'season-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function clearOverlay() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
  }

  /* CHRISTMAS: snow effect (DOM flakes) */
  function makeSnowflake() {
    // Christmas snowflakes disabled — use Halloween particles instead.
    // Preserve API but delegate to Halloween particle generator for consistency.
    makeHParticle();
  }

  /* HALLOWEEN: floating orange particles */
  function makeHParticle() {
    const c = createOverlay();
    const p = document.createElement('div');
    p.className = 'h-particle';
    const size = Math.round(Math.random() * 18 + 6);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    const delay = Math.random() * 8000;
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.top = (80 + Math.random() * 20) + '%';
    c.appendChild(p);
    setTimeout(() => p.remove(), 11000);
  }

  /* CHRISTMAS: now maps to the site's main particle style (Halloween) */
  function makeCParticle() {
    // Christmas particle generator removed — delegate to Halloween particle.
    makeHParticle();
  }

  // Start the generic particle effect (uses Halloween-style particles)
  function startParticles() {
    stopEffect();
    const isLight = document.body.classList.contains('light-theme');
    const initial = isLight ? 20 : 12;
    const interval = isLight ? 300 : 350;
    const twoChance = isLight ? 0.35 : 0.25;
    for (let i = 0; i < initial; i++) setTimeout(makeHParticle, Math.random() * 1200);
    spawner = setInterval(() => {
      const count = Math.random() < twoChance ? 2 : 1;
      for (let i = 0; i < count; i++) makeHParticle();
    }, interval);
  }

  function stopEffect() {
    if (spawner) { clearInterval(spawner); spawner = null; }
    if (overlay) {
      overlay.querySelectorAll('.snowflake, .h-particle, .c-particle').forEach(el => el.remove());
    }
    clearOverlay();
  }

  // Particle controls (simple API)
  function enableParticles() { if (current) return; startParticles(); current = 'particles'; }
  function disableParticles() { if (!current) return; stopEffect(); current = null; }
  function toggleParticles() { if (current) disableParticles(); else enableParticles(); }

  // Expose particle API
  window.enableParticles = enableParticles;
  window.disableParticles = disableParticles;
  window.toggleParticles = toggleParticles;

})();

// Easter egg: toggle particles every 5 clicks on hero title
(function () {
  const target = document.getElementById("hero-title");
  if (!target) return;

  let clickCount = 0;
  let resetTimer = null;
  let particlesEnabled = false; // track current state

  target.addEventListener("click", () => {
    clickCount++;

    // Reset counter if user waits too long
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      clickCount = 0;
    }, 2000); // 2s window

    if (clickCount === 5) {
      clickCount = 0;
      particlesEnabled = !particlesEnabled; // toggle state

      if (typeof enableParticles === "function" && typeof disableParticles === "function") {
        if (particlesEnabled) {
          enableParticles();
          console.log("Particles enabled!");
        } else {
          disableParticles();
          console.log("Particles disabled!");
        }
      }
    }
  });
})();

