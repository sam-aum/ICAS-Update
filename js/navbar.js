/* ========================================
   NAVBAR SCRIPT
   Runs after the HTML document finishes loading
======================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     FIND NAVBAR CONTAINER
     The navbar will be injected into this element
  ======================================== */

  const navHost = document.getElementById("navigate");

  // If the page does not contain #navigate, stop the script
  if (!navHost) return;



  /* ========================================
     MOBILE / TABLET BREAKPOINT
     Must match the breakpoint used in CSS
  ======================================== */

  const mobileBreakpoint = 900;



  /* ========================================
     NAVIGATION DATA
     This section defines the structure of the menu.

     Advantages:
     - Easy to add new links
     - Easy to reorganize menu sections
     - HTML is generated automatically
  ======================================== */

  const navData = {

    /* ---------- Top-level links (no dropdown) ---------- */

    top: [
      { label: "About", href: "/mission.html" },
      { label: "Contact", href: "/contact.html" },
    ],


    /* ---------- Dropdown menu groups ---------- */

    groups: [

      {
        label: "People",
        items: [
          { label: "Staff", href: "/staff.html" },
          { label: "Interns & Associates", href: "/interns.html" },
          { label: "Contributors & Speakers", href: "/speakers.html" },
          { label: "Fellows", href: "/roster.html" },
          { label: "Liberty Award", href: "/liberty.html" },
          { label: "Delegations", href: "/delegate/delegate.html" },
          { label: "Institutional Supporters", href: "/support.html" },
        ],
      },

      {
        label: "Programs",
        items: [
          { label: "Upcoming", href: "/upcome.html" },
          { label: "Bulletins", href: "/bullbase.html" },
          { label: "Symposia", href: "/symposia.html" },
          { label: "Lectures", href: "/lectures.html" },
          { label: "Youth Academy", href: "/youth/yacademy.html" },
          { label: "Golf", href: "/golf/golf.html" },
          { label: "Tennis", href: "/tennis/tennis.html" },
        ],
      },

      {
        label: "Media",
        items: [
          { label: "Videos", href: "/vidbase.html" },
          { label: "Photos", href: "/gallery/gallery.html" },
          { label: "Program Archives", href: "/archives/progarch.html" },
          { label: "Historical Documents", href: "/history/history.html" },
          { label: "Specials", href: "/special.html" },
        ],
      },

      {
        label: "Organization",
        items: [
          { label: "Mission", href: "/mission.html" },
          { label: "Strategy", href: "/strategy.html" },
          { label: "Index of Organizations", href: "/organize.html" },
        ],
      },

    ],
  };



  /* ========================================
     HTML BUILDER FUNCTIONS
     These small functions generate HTML
     from the navigation data above.
  ======================================== */



  /* ----------------------------------------
     Build simple navigation links
     (About, Contact)
  ---------------------------------------- */

  function buildTopLinks(links) {

    return links
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");

  }



  /* ----------------------------------------
     Build one dropdown group
     (example: "People")
  ---------------------------------------- */

  function buildDropdown(group, index) {

    const itemsHTML = group.items
      .map(
        (item) =>
          `<a role="menuitem" href="${item.href}">${item.label}</a>`
      )
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



  /* ----------------------------------------
     Build all dropdown groups
  ---------------------------------------- */

  function buildDropdowns(groups) {

    return groups
      .map((group, index) => buildDropdown(group, index))
      .join("");

  }



  /* ----------------------------------------
     Build the entire navbar
  ---------------------------------------- */

  function buildNavbarHTML(data) {

    const dropdownHTML = buildDropdowns(data.groups);
    const topLinksHTML = buildTopLinks(data.top);

    return `

      <nav class="main-nav" aria-label="Primary">

        <div class="nav-inner">

          <!-- Website logo -->

          <a class="nav-brand" href="/index.html">
            <img src="images/icas-logo.png" alt="ICAS Home">
          </a>


          <!-- Hamburger button -->

          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-nav"
            aria-label="Open navigation menu"
          >
            ☰
          </button>


          <!-- Main navigation links -->

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
     FIND IMPORTANT NAV ELEMENTS
  ======================================== */

  const toggle = navHost.querySelector(".nav-toggle");
  const primaryNav = navHost.querySelector("#primary-nav");
  const dropdownButtons = navHost.querySelectorAll(".nav-dropbtn");
  const dropdowns = navHost.querySelectorAll(".nav-dropdown");



  /* ========================================
     HELPER FUNCTIONS
     Used by the navigation behavior
  ======================================== */



  /* ----------------------------------------
     Close all dropdown menus
  ---------------------------------------- */

  function closeAllDropdowns() {

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
    });

    dropdownButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });

  }



  /* ----------------------------------------
     Open the hamburger navigation
  ---------------------------------------- */

  function openMainMenu() {

    if (!primaryNav || !toggle) return;

    primaryNav.classList.add("is-open");

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");

    toggle.textContent = "✕";

  }



  /* ----------------------------------------
     Close the hamburger navigation
  ---------------------------------------- */

  function closeMainMenu() {

    if (!primaryNav || !toggle) return;

    primaryNav.classList.remove("is-open");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    toggle.textContent = "☰";

    closeAllDropdowns();

  }



  /* ----------------------------------------
     Detect mobile/tablet layout
  ---------------------------------------- */

  function isMobileLayout() {

    return window.innerWidth <= mobileBreakpoint;

  }



  /* ========================================
     HAMBURGER MENU BEHAVIOR
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
     DROPDOWN BUTTON BEHAVIOR
     Used for touch devices
  ======================================== */

  dropdownButtons.forEach((button) => {

    button.addEventListener("click", () => {

      // Ignore clicks on desktop (desktop uses hover)
      if (!isMobileLayout()) return;

      const parentDropdown = button.closest(".nav-dropdown");
      if (!parentDropdown) return;

      const isAlreadyOpen =
        parentDropdown.classList.contains("is-open");

      // Close other dropdowns
      closeAllDropdowns();

      // Open selected dropdown
      if (!isAlreadyOpen) {

        parentDropdown.classList.add("is-open");

        button.setAttribute("aria-expanded", "true");

      }

    });

  });



  /* ========================================
     RESET NAVBAR ON WINDOW RESIZE
     Prevents layout bugs
  ======================================== */

  window.addEventListener("resize", () => {

    if (!isMobileLayout()) {
      closeMainMenu();
    }

  });

});