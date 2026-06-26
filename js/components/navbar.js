const NAV_LINKS = [
  { label: "Home", href: "index.html", match: "index.html" },
  { label: "Products", href: "products.html", match: "products.html" },
  { label: "About", href: "index.html#about", match: "__about__" },
  { label: "Contact", href: "contact.html", match: "contact.html" },
];

function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function buildLinksMarkup(linkClass, activePage) {
  return NAV_LINKS.map((link) => {
    const isActive =
  link.match === activePage &&
  link.match !== "__about__";
    const activeClass = isActive ? " is-active" : "";
    return `<li><a href="${link.href}" class="${linkClass}${activeClass}" data-nav-link data-match="${link.match}">${link.label}</a></li>`;
  }).join("");
}

function buildMarkup() {
  const activePage = getCurrentPage();
  const desktopLinks = buildLinksMarkup("navbar__link", activePage);
  const mobileLinks = buildLinksMarkup("navbar__mobile-link", activePage);

  return `
    <header class="navbar" id="siteNavbar">
      <div class="navbar__container">
        <a href="index.html" class="navbar__logo-link" aria-label="Singh Trader Home">
          <img src="assets/logo.png" alt="Singh Trader" class="navbar__logo" draggable="false">
        </a>

        <nav class="navbar__nav" aria-label="Primary navigation">
          <ul class="navbar__links">
            ${desktopLinks}
          </ul>
        </nav>

        <div class="navbar__actions">
          <a href="tel:+910000000000" class="navbar__cta">Call Now</a>
        </div>

        <button
          type="button"
          class="navbar__hamburger"
          id="navbarHamburger"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="navbarMobileMenu"
        >
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
        </button>
      </div>

      <div class="navbar__mobile-menu" id="navbarMobileMenu">
        <ul class="navbar__mobile-links">
          ${mobileLinks}
          <li><a href="tel:+910000000000" class="navbar__cta navbar__cta--mobile">Call Now</a></li>
        </ul>
      </div>
    </header>
  `;
}

function attachNavbarEvents(root) {
  const hamburger = root.querySelector("#navbarHamburger");
  const mobileMenu = root.querySelector("#navbarMobileMenu");
  const navItems = root.querySelectorAll("[data-nav-link]");

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("no-scroll");
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (isOpen) closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!isOpen) return;
    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);
    if (!clickedInsideMenu && !clickedHamburger) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isOpen) {
    closeMenu();
    hamburger.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isOpen) {
    closeMenu();
  }
});


const navbar = document.getElementById("siteNavbar");

if (navbar) {

  window.addEventListener("scroll", () => {

    navbar.classList.toggle(
      "is-scrolled",
      window.scrollY > 10
    );

  });

}


const aboutSection = document.getElementById("about");

if (aboutSection) {

  const observer = new IntersectionObserver(

    ([entry]) => {

      const aboutLinks =
        root.querySelectorAll('[data-match="__about__"]');

      const homeLinks =
        root.querySelectorAll('[data-match="index.html"]');

      aboutLinks.forEach(link =>
        link.classList.toggle(
          "is-active",
          entry.isIntersecting
        )
      );

      homeLinks.forEach(link =>
        link.classList.toggle(
          "is-active",
          !entry.isIntersecting
        )
      );

    },

    {
      threshold: 0.35
    }

  );

  observer.observe(aboutSection);

}

}

export function renderNavbar(containerId = "navbar") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = buildMarkup();
  attachNavbarEvents(container);
}