// navlinks2.js
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
  
    // Build dropdown HTML
    const dropdownHTML = nav.groups
      .map(
        (group) => `
        <div class="nav-dropdown">
          <button class="nav-dropbtn" type="button" aria-haspopup="true" aria-expanded="false">
            ${group.label}
          </button>
          <div class="nav-dropmenu" role="menu">
            ${group.items
              .map((item) => `<a role="menuitem" href="${item.href}">${item.label}</a>`)
              .join("")}
          </div>
        </div>
      `
      )
      .join("");
  
    // Build top links HTML
    const topLinksHTML = nav.top
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  
    navHost.innerHTML = `
      <nav class="main-nav" aria-label="Primary">
        <div class="nav-inner">
            <a class="nav-brand" href="/index.html">
                <img src="images/icas-logo.png" alt="ICAS Home">
            </a>
  
          <div id="primary-nav" class="nav-links">
            ${dropdownHTML}
            ${topLinksHTML}
          </div>
        </div>
      </nav>
    `;
  
    // Simple dropdown behavior (click to open/close)
    const dropdowns = navHost.querySelectorAll(".nav-dropdown");
  
    dropdowns.forEach((dd) => {
      const btn = dd.querySelector(".nav-dropbtn");
      const menu = dd.querySelector(".nav-dropmenu");
  
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
  
        // close others
        dropdowns.forEach((other) => {
          if (other !== dd) {
            other.querySelector(".nav-dropbtn").setAttribute("aria-expanded", "false");
            other.querySelector(".nav-dropmenu").classList.remove("is-open");
          }
        });
  
        const isOpen = menu.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });
    });
  
    // click outside closes all
    document.addEventListener("click", () => {
      dropdowns.forEach((dd) => {
        dd.querySelector(".nav-dropbtn").setAttribute("aria-expanded", "false");
        dd.querySelector(".nav-dropmenu").classList.remove("is-open");
      });
    });
  
    // Esc closes all
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdowns.forEach((dd) => {
          dd.querySelector(".nav-dropbtn").setAttribute("aria-expanded", "false");
          dd.querySelector(".nav-dropmenu").classList.remove("is-open");
        });
      }
    });
  });