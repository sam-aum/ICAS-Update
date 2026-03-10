/* ========================================
   NAVBAR SCRIPT
   Wait until the HTML page has loaded
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     FIND THE NAVBAR CONTAINER
     (#navigate is the div where the navbar will be inserted)
  ======================================== */

  const navHost = document.getElementById("navigate");

  // If the page doesn't have a navbar container, stop the script
  if (!navHost) return;


  /* ========================================
     BREAKPOINT
     Defines when the site switches to mobile/tablet mode
     Must match the CSS breakpoint
  ======================================== */

  const mobileBreakpoint = 900;


  /* ========================================
     NAVIGATION DATA
     This is the structure of the navigation menu.
     It separates:
       - top level links
       - dropdown groups
  ======================================== */

  const nav = {

    /* -------- Direct top navigation links -------- */

    top: [
      { label: "About", href: "/mission.html" },
      { label: "Contact", href: "/contact.html" },
    ],

    /* -------- Dropdown menu groups -------- */

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
     GENERATE DROPDOWN HTML
     This converts the navigation data above
     into real HTML for the dropdown menus
  ======================================== */

  const dropdownHTML = nav.groups
    .map(
      (group, index) => `
        <div class="nav-dropdown">

          <!-- Dropdown button (example: People, Programs) -->

          <button
            class="nav-dropbtn"
            type="button"
            aria-expanded="false"
            aria-controls="nav-group-${index}"
          >
            ${group.label}
          </button>

          <!-- Dropdown menu -->

          <div id="nav-group-${index}" class="nav-dropmenu" role="menu">

            ${group.items
              .map(
                (item) => `<a role="menuitem" href="${item.href}">${item.label}</a>`
              )
              .join("")}

          </div>

        </div>
      `
    )
    .join("");


  /* ========================================
     GENERATE SIMPLE TOP LINKS
     (About, Contact)
  ======================================== */

  const topLinksHTML = nav.top
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");


  /* ========================================
     INSERT FULL NAVBAR HTML INTO PAGE
  ======================================== */

  navHost.innerHTML = `

    <nav class="main-nav" aria-label="Primary">

      <div class="nav-inner">

        <!-- Website logo -->

        <a class="nav-brand" href="/index.html">
          <img src="images/icas-logo.png" alt="ICAS Home">
        </a>

        <!-- Hamburger button (mobile/tablet) -->

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


  /* ========================================
     FIND IMPORTANT ELEMENTS
  ======================================== */

  const toggle = navHost.querySelector(".nav-toggle");
  const primaryNav = navHost.querySelector("#primary-nav");
  const dropdownButtons = navHost.querySelectorAll(".nav-dropbtn");
  const dropdowns = navHost.querySelectorAll(".nav-dropdown");


  /* ========================================
     CLOSE ALL DROPDOWNS
     Used when opening another dropdown
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
     CLOSE ENTIRE NAVIGATION MENU
     Used when switching from mobile → desktop
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
     HAMBURGER BUTTON BEHAVIOR
     Opens and closes the mobile navigation
  ======================================== */

  if (toggle && primaryNav) {

    toggle.addEventListener("click", () => {

      const isOpen = primaryNav.classList.toggle("is-open");

      toggle.setAttribute("aria-expanded", String(isOpen));

      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      toggle.textContent = isOpen ? "✕" : "☰";

      if (!isOpen) {
        closeAllDropdowns();
      }

    });

  }


  /* ========================================
     DROPDOWN BUTTON BEHAVIOR
     Used for tablet/mobile tap interaction
  ======================================== */

  dropdownButtons.forEach((button) => {

    button.addEventListener("click", () => {

      /* Desktop uses hover — ignore click */

      if (window.innerWidth > mobileBreakpoint) return;

      const parentDropdown = button.closest(".nav-dropdown");

      if (!parentDropdown) return;

      const isAlreadyOpen = parentDropdown.classList.contains("is-open");

      /* Close other dropdowns */

      closeAllDropdowns();

      /* Open clicked dropdown */

      if (!isAlreadyOpen) {

        parentDropdown.classList.add("is-open");

        button.setAttribute("aria-expanded", "true");

      }

    });

  });


  /* ========================================
     RESET NAVIGATION ON SCREEN RESIZE
     Prevents broken states when resizing
  ======================================== */

  window.addEventListener("resize", () => {

    if (window.innerWidth > mobileBreakpoint) {

      closeMainMenu();

    }

  });

});