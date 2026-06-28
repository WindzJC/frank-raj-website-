const navToggle = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
