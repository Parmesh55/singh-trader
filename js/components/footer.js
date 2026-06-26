const BUSINESS_SCHEDULE = [
  { label: "Monday – Saturday", status: "Open" },
  { label: "Sunday", status: "Closed" },
];

const ICONS = {
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-7.2-7-12a7 7 0 1 1 14 0c0 4.8-7 12-7 12z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-1z"></path></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg>`,
};

function buildScheduleMarkup() {
  return BUSINESS_SCHEDULE.map(({ label, status }) => {
    const statusClass = status === "Closed" ? " footer__schedule-status--closed" : "";
    return `
      <li class="footer__schedule-row">
        <span class="footer__schedule-label">${label}</span>
        <span class="footer__schedule-status${statusClass}">${status}</span>
      </li>
    `;
  }).join("");
}

function buildMarkup() {
  return `
    <footer class="footer" id="siteFooter">
      <div class="footer__container">

        <div class="footer__col footer__col--brand">
          <a href="index.html" class="footer__logo-link" aria-label="Singh Trader Home">
            <img src="assets/logo.png" alt="Singh Trader" class="footer__logo" draggable="false">
          </a>
          <p class="footer__about">
            Singh Trader is a trusted supplier of premium construction materials delivering quality products with reliable service and competitive pricing.
          </p>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Business Schedule</h3>
          <ul class="footer__schedule">
            ${buildScheduleMarkup()}
          </ul>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Contact Information</h3>
          <ul class="footer__contact">
            <li class="footer__contact-item">
              <span class="footer__icon" aria-hidden="true">${ICONS.location}</span>
              <span>Baspar Nutan</span>
            </li>
            <li class="footer__contact-item">
              <a href="tel:+919793890149" class="footer__contact-link" aria-label="Call Singh Trader at 9793890149">
                <span class="footer__icon" aria-hidden="true">${ICONS.phone}</span>
                <span>9793890149</span>
              </a>
            </li>
            <li class="footer__contact-item">
              <a href="mailto:hariomsingh3997@gmail.com" class="footer__contact-link" aria-label="Email Singh Trader at hariomsingh3997@gmail.com">
                <span class="footer__icon" aria-hidden="true">${ICONS.mail}</span>
                <span>hariomsingh3997@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2026 SINGH TRADER. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  `;
}

export function renderFooter(containerId = "footer") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = buildMarkup();
}