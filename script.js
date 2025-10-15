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

// Contact form fallback to mail client
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent("New message from portfolio — " + name);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  window.location.href = `mailto:info@rusman.gr?subject=${subject}&body=${body}`;
});

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Social links
document.getElementById("github-link").href = "https://github.com/AntonisRsmn";
document.getElementById("linkedin-link").href =
  "https://www.linkedin.com/in/antonis-rusman-a46424319/";
document.getElementById("insta-link").href = "https://instagram.com/_.rusman._";
document.getElementById("resume-link").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Add your resume PDF link here.");
});

