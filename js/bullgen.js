/* ========================================
   BULLETIN GENERATOR
   Builds the bulletin feed for a selected
   year using data from bulletins-YYYY-data.js
======================================== */


/* ========================================
   FIND REQUIRED PAGE ELEMENTS
======================================== */

const mount = document.getElementById("bulletinsMount");
const pageTitle = document.getElementById("bulletinsPageTitle");


/* ========================================
   LOAD PAGE DATA
   Data is provided by bulletins-YYYY-data.js
======================================== */

const pageData = window.bulletinsPageData;


/* ========================================
   ROOT PATH HELPER
   Allows links to work locally and online
======================================== */

const withRoot = window.withRoot || ((path) => path);


/* ========================================
   BASIC VALIDATION
   Ensure required elements and data exist
======================================== */

if (!mount) {
  console.error("No #bulletinsMount element found.");
} else if (!pageData || !Array.isArray(pageData.items)) {
  console.error("bulletinsPageData missing or invalid.");
} else {


  /* ========================================
     MONTH NAMES FOR DATE FORMATTING
  ======================================== */

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  /* ========================================
     SET PAGE TITLE
     Updates both the page heading and
     the browser tab title
  ======================================== */

  if (pageTitle && pageData.title) {
    pageTitle.textContent = pageData.title;
  }

  if (pageData.title) {
    document.title = `ICAS ${pageData.title}`;
  }


  /* ========================================
     PARSE BULLETIN CODE
     Example code: b260222a

     Format:
       prefix  → b
       year    → 26
       month   → 02
       day     → 22
       suffix  → a

     Converts code into:
       - valid Date object
       - bulletin URL
  ======================================== */

  function parseCode(code) {

    const match = code.match(/^([a-zA-Z])(\d{2})(\d{2})(\d{2})([a-zA-Z0-9]+)$/);
    if (!match) return null;

    const prefix = match[1];
    const yy = match[2];
    const mm = match[3];
    const dd = match[4];

    const fullYear = 2000 + Number(yy);
    const monthIndex = Number(mm) - 1;
    const day = Number(dd);

    const dt = new Date(fullYear, monthIndex, day);


    /* ========================================
       VALIDATE DATE
       Ensures the date actually exists
    ======================================== */

    if (
      Number.isNaN(dt.getTime()) ||
      dt.getFullYear() !== fullYear ||
      dt.getMonth() !== monthIndex ||
      dt.getDate() !== day
    ) {
      return null;
    }


    /* ========================================
       RETURN PARSED BULLETIN INFO
    ======================================== */

    return {
      code,
      dt,
      href: withRoot(`/${fullYear}/${fullYear}${prefix}/${code}.html`)
    };
  }


  /* ========================================
     FORMAT DATE FOR DISPLAY
     Example:
     February 22, 2026
  ======================================== */

  function prettyDate(dt) {

    const month = monthNames[dt.getMonth()];
    const day = String(dt.getDate()).padStart(2, "0");
    const year = dt.getFullYear();

    return `${month} ${day}, ${year}`;
  }


  /* ========================================
     PROCESS BULLETIN DATA
     - validate codes
     - build URLs
     - attach titles
     - sort newest first
  ======================================== */

  const items = pageData.items
    .map((item) => {

      if (typeof item.code !== "string" || typeof item.titleHtml !== "string") {
        return null;
      }

      const parsed = parseCode(item.code);
      if (!parsed) return null;

      return {
        ...parsed,
        href: item.href || parsed.href,
        titleHtml: item.titleHtml
      };

    })
    .filter(Boolean)
    .sort((a, b) => b.dt - a.dt);


  /* ========================================
     CLEAR EXISTING BULLETINS
  ======================================== */

  mount.innerHTML = "";


  /* ========================================
     BUILD BULLETIN LIST
     Each bulletin is rendered as:

     <li>
       <a>
         date
         title
       </a>
     </li>
  ======================================== */

  for (const item of items) {

    const li = document.createElement("li");
    li.className = "bulletin-feed-item";

    li.innerHTML = `
      <a class="bulletin-feed-link" href="${item.href}">
        <span class="bulletin-feed-date">${prettyDate(item.dt)}</span>
        <span class="bulletin-feed-title">${item.titleHtml}</span>
      </a>
    `;

    mount.appendChild(li);

  }

}