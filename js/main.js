// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
}

menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    menuBtn.focus();
  }
});

// Join form (frontend-only until an endpoint is set)
// To connect it, put your form URL in data-endpoint on <form id="join-form">,
// e.g. a Formspree URL: https://formspree.io/f/your-id
const form = document.getElementById("join-form");

if (form) {
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      status.textContent = "This form is not connected yet, so nothing was sent.";
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = "Thank you. Your interest has been submitted.";
    } catch {
      status.textContent = "Something went wrong. Please try again later.";
    }
  });
}