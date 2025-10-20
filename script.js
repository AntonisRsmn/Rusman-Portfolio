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

