document.addEventListener("DOMContentLoaded", () => {
  const navHost = document.getElementById("navigate");
  if (!navHost) return;

  const nav = {
    top: [
      { label: "About", href: "/mission.html" },
      { label: "Contact", href: "/contact.html" },
    ],
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

  const dropdownHTML = nav.groups
    .map(
      (group) => `
        <div class="nav-dropdown">
          <button class="nav-dropbtn" type="button" aria-haspopup="true">
            ${group.label}
          </button>
          <div class="nav-dropmenu" role="menu">
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

  const topLinksHTML = nav.top
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  navHost.innerHTML = `
    <nav class="main-nav" aria-label="Primary">
      <div class="nav-inner">
        <a class="nav-brand" href="/index.html">
          <img src="images/icas-logo.png" alt="ICAS Home">
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

  const toggle = navHost.querySelector(".nav-toggle");
  const primaryNav = navHost.querySelector("#primary-nav");

  if (!toggle || !primaryNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    toggle.textContent = isOpen ? "✕" : "☰";
  });
});