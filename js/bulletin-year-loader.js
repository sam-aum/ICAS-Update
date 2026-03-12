/* ========================================
   BULLETIN PAGE LOADER
   Determines which bulletin year to load,
   loads the corresponding data file,
   then runs the bulletin generator.
======================================== */

window.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     ROOT PATH HELPER
     Allows paths to work locally and online
  ======================================== */

  const withRoot = window.withRoot || ((path) => path);


  /* ========================================
     READ YEAR FROM URL
     Example:
     bulletins-page.html?year=2026
  ======================================== */

  const params = new URLSearchParams(window.location.search);


  /* ========================================
     DETERMINE DEFAULT YEAR
     If no year is provided, use the current year
  ======================================== */

  const currentYear = String(new Date().getFullYear());
  const year = params.get("year") || currentYear;


  /* ========================================
     LOAD BULLETIN DATA SCRIPT
     Example:
     /js/bulletin-data/bulletins-2026-data.js
  ======================================== */

  const dataScript = document.createElement("script");
  dataScript.src = withRoot(`/js/bulletin-data/bulletins-${year}-data.js`);


  /* ========================================
     WHEN DATA LOADS SUCCESSFULLY
     Load the bulletin generator script
  ======================================== */

  dataScript.onload = () => {

    const genScript = document.createElement("script");
    genScript.src = withRoot("/js/bullgen.js");

    document.body.appendChild(genScript);

  };


  /* ========================================
     IF DATA FILE DOES NOT EXIST
     Show a message instead of bulletins
  ======================================== */

  dataScript.onerror = () => {

    const mount = document.getElementById("bulletinsMount");
    const pageTitle = document.getElementById("bulletinsPageTitle");


    /* ========================================
       UPDATE PAGE TITLE
    ======================================== */

    if (pageTitle) {
      pageTitle.textContent = `Bulletins - ${year}`;
    }


    /* ========================================
       DISPLAY ERROR MESSAGE
    ======================================== */

    if (mount) {
      mount.innerHTML = `
        <li class="bulletin-feed-item">
          <div class="bulletin-feed-link">
            <span class="bulletin-feed-title">
              No bulletin data was found for ${year}.
            </span>
          </div>
        </li>
      `;
    }

  };


  /* ========================================
     START LOADING DATA SCRIPT
  ======================================== */

  document.body.appendChild(dataScript);

});