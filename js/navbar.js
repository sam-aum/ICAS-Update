/* ========================================
   NAVBAR SCRIPT
   Builds the navigation bar, dropdowns,
   and mobile menu behavior
======================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     FIND NAVBAR CONTAINER
     The navbar will be injected into this element
  ======================================== */

  const navHost = document.getElementById("navigate");
  if (!navHost) return;


  /* ========================================
     ROOT PATH HELPERS
     Allows links to work both locally
     and on the live website
  ======================================== */

  const SITE_ROOT = window.SITE_ROOT || "";
  const withRoot = window.withRoot || ((path) => `${SITE_ROOT}${path}`);


  /* ========================================
     MOBILE BREAKPOINT
     Must match the breakpoint used in CSS
  ======================================== */

  const mobileBreakpoint = 900;


  /* ========================================
     NAVIGATION DATA
     Defines all top links and dropdown groups
  ======================================== */

  const navData = {
    top: [
      { label: "About", href: withRoot("/mission.html") },
      { label: "Contact", href: withRoot("/contact.html") },
    ],

    groups: [
      {
        label: "People",
        items: [
          { label: "Staff", href: withRoot("/staff.html") },
          { label: "Interns & Associates", href: withRoot("/interns.html") },
          { label: "Contributors & Speakers", href: withRoot("/speakers.html") },
          { label: "Fellows", href: withRoot("/roster.html") },
          { label: "Liberty Award", href: withRoot("/liberty.html") },
          { label: "Delegations", href: withRoot("/delegate/delegate.html") },
          { label: "Institutional Supporters", href: withRoot("/support.html") },
        ],
      },

      {
        label: "Programs",
        items: [
          { label: "Upcoming", href: withRoot("/upcome.html") },
          { label: "Bulletins", href: withRoot("/bullbase.html") },
          { label: "Symposia", href: withRoot("/symposia.html") },
          { label: "Lectures", href: withRoot("/lectures.html") },
          { label: "Youth Academy", href: withRoot("/youth/yacademy.html") },
          { label: "Golf", href: withRoot("/golf/golf.html") },
          { label: "Tennis", href: withRoot("/tennis/tennis.html") },
        ],
      },

      {
        label: "Media",
        items: [
          { label: "Videos", href: withRoot("/vidbase.html") },
          { label: "Photos", href: withRoot("/gallery/gallery.html") },
          { label: "Program Archives", href: withRoot("/archives/progarch.html") },
          { label: "Historical Documents", href: withRoot("/history/history.html") },
          { label: "Specials", href: withRoot("/special.html") },
        ],
      },

      {
        label: "Organization",
        items: [
          { label: "Mission", href: withRoot("/mission.html") },
          { label: "Strategy", href: withRoot("/strategy.html") },
          { label: "Index of Organizations", href: withRoot("/organize.html") },
        ],
      },
    ],
  };


  /* ========================================
     BUILD TOP-LEVEL LINKS
     Creates regular links with no dropdown
  ======================================== */

  function buildTopLinks(links) {
    return links
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }


  /* ========================================
     BUILD ONE DROPDOWN GROUP
     Creates the button and dropdown menu
     for one navigation section
  ======================================== */

  function buildDropdown(group, index) {

    const itemsHTML = group.items
      .map((item) => `<a role="menuitem" href="${item.href}">${item.label}</a>`)
      .join("");

    return `
      <div class="nav-dropdown">
        <button
          class="nav-dropbtn"
          type="button"
          aria-expanded="false"
          aria-controls="nav-group-${index}"
        >
          ${group.label}
        </button>

        <div id="nav-group-${index}" class="nav-dropmenu" role="menu">
          ${itemsHTML}
        </div>
      </div>
    `;
  }


  /* ========================================
     BUILD ALL DROPDOWN GROUPS
  ======================================== */

  function buildDropdowns(groups) {
    return groups
      .map((group, index) => buildDropdown(group, index))
      .join("");
  }


  /* ========================================
     BUILD COMPLETE NAVBAR HTML
     Combines logo, toggle button, dropdowns,
     and top-level links into one navbar
  ======================================== */

  function buildNavbarHTML(data) {

    const dropdownHTML = buildDropdowns(data.groups);
    const topLinksHTML = buildTopLinks(data.top);

    return `
      <nav class="main-nav" aria-label="Primary">
        <div class="nav-inner">

          <a class="nav-brand" href="${withRoot("/index.html")}">
            <img src="${withRoot("/images/icas-logo.png")}" alt="ICAS Home">
          </a>

          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-nav"
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          <div id="primary-nav" class="nav-links">
            ${dropdownHTML}
            ${topLinksHTML}
          </div>

        </div>
      </nav>
    `;
  }


  /* ========================================
     INSERT NAVBAR INTO PAGE
  ======================================== */

  navHost.innerHTML = buildNavbarHTML(navData);


  /* ========================================
     FIND GENERATED NAV ELEMENTS
     These are created after the HTML is injected
  ======================================== */

  const toggle = navHost.querySelector(".nav-toggle");
  const primaryNav = navHost.querySelector("#primary-nav");
  const dropdownButtons = navHost.querySelectorAll(".nav-dropbtn");
  const dropdowns = navHost.querySelectorAll(".nav-dropdown");


  /* ========================================
     CLOSE ALL DROPDOWNS
     Used when switching menus or closing nav
  ======================================== */

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
    });

    dropdownButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }


  /* ========================================
     OPEN MAIN MOBILE MENU
  ======================================== */

  function openMainMenu() {
    if (!primaryNav || !toggle) return;

    primaryNav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    toggle.textContent = "✕";
  }


  /* ========================================
     CLOSE MAIN MOBILE MENU
  ======================================== */

  function closeMainMenu() {
    if (!primaryNav || !toggle) return;

    primaryNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.textContent = "☰";

    closeAllDropdowns();
  }


  /* ========================================
     CHECK MOBILE LAYOUT
     Returns true when viewport is at or below
     the mobile/tablet breakpoint
  ======================================== */

  function isMobileLayout() {
    return window.innerWidth <= mobileBreakpoint;
  }


  /* ========================================
     MOBILE TOGGLE BUTTON
     Opens and closes the main menu
  ======================================== */

  if (toggle && primaryNav) {
    toggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.contains("is-open");

      if (isOpen) {
        closeMainMenu();
      } else {
        openMainMenu();
      }
    });
  }


  /* ========================================
     MOBILE DROPDOWN BUTTONS
     On mobile/tablet, tap to open one dropdown
     at a time
  ======================================== */

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isMobileLayout()) return;

      const parentDropdown = button.closest(".nav-dropdown");
      if (!parentDropdown) return;

      const isAlreadyOpen = parentDropdown.classList.contains("is-open");

      closeAllDropdowns();

      if (!isAlreadyOpen) {
        parentDropdown.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* ========================================
     WINDOW RESIZE HANDLER
     If screen becomes desktop size, reset
     the mobile menu state
  ======================================== */

  window.addEventListener("resize", () => {
    if (!isMobileLayout()) {
      closeMainMenu();
    }
  });


  /* ========================================
     CLICK OUTSIDE NAVBAR
     Close the mobile menu when clicking
     anywhere outside the navigation
  ======================================== */

  document.addEventListener("click", (event) => {
    if (navHost.contains(event.target)) return;

    if (primaryNav.classList.contains("is-open")) {
      closeMainMenu();
    }
  });

});