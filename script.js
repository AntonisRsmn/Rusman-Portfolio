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

// Social links
document.getElementById("github-link").href = "https://github.com/AntonisRsmn";
document.getElementById("linkedin-link").href =
  "https://www.linkedin.com/in/antonis-rusman-a46424319/";
document.getElementById("insta-link").href = "https://instagram.com/_.rusman._";
document.getElementById("resume-link").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Add your resume PDF link here.");
});

