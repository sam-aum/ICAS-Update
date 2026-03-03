// navlinks2.js
document.addEventListener("DOMContentLoaded", () => {
    const navHost = document.getElementById("navigate");
    if (!navHost) return;
  
    navHost.innerHTML = `
      <nav class="main-nav" aria-label="Primary">
        <div class="nav-inner">
          <a class="nav-brand" href="/index.html">ICAS</a>
  
          <!--
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
              ☰ <span class="sr-only">Menu</span>
            </button> 
          -->

          <div id="primary-nav" class="nav-links">
            <a href="/bullbase.html">Bulletins</a>
            <a href="/contact.html">Contact</a>
            <a href="/speakers.html">Contributors &amp; Speakers</a>
            <a href="/delegate/delegate.html">Delegations</a>
            <a href="/roster.html">Fellows</a>
            <a href="/golf/golf.html">Golf</a>
            <a href="/history/history.html">Historical Documents</a>
            <a href="/organize.html">Index of Organizations</a>
            <a href="/support.html">Institutional Supporters</a>
            <a href="/interns.html">Interns &amp; Associates</a>
            <a href="/lectures.html">Lectures</a>
            <a href="/liberty.html">Liberty Award</a>
            <a href="/mission.html">Mission</a>
            <a href="/gallery/gallery.html">Photos</a>
            <a href="/archives/progarch.html">Programs Archives</a>
            <a href="/special.html">Specials</a>
            <a href="/staff.html">Staff</a>
            <a href="/strategy.html">Strategy</a>
            <a href="/symposia.html">Symposia</a>
            <a href="/tennis/tennis.html">Tennis</a>
            <a href="/upcome.html">Upcoming</a>
            <a href="/vidbase.html">Videos</a>
            <a href="/youth/yacademy.html">Youth Academy</a>
          </div>
        </div>
      </nav>
    `;
  
    // Hamburger behavior (ready for mobile CSS)
    // const toggle = navHost.querySelector(".nav-toggle");
    // const links = navHost.querySelector("#primary-nav");
  
    // toggle.addEventListener("click", () => {
    //   const isOpen = links.classList.toggle("is-open");
    //   toggle.setAttribute("aria-expanded", String(isOpen));
    // });
  });