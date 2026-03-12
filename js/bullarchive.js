/* ========================================
   BULLETIN YEAR ARCHIVE LINKS
   Generates the list of bulletin years and
   determines whether to use the new system
   or fall back to the legacy bulletin pages.
======================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     FIND ARCHIVE CONTAINER
     The year links will be inserted here
  ======================================== */

  const container = document.getElementById("bulletin-archive-links");
  if (!container) return;


  /* ========================================
     ROOT PATH HELPER
     Allows links to work correctly whether
     the site is running locally or online
  ======================================== */

  const withRoot = window.withRoot || ((path) => path);


  /* ========================================
     DETERMINE CURRENT YEAR
     Used to automatically generate year links
     up to the present year
  ======================================== */

  const currentYear = new Date().getFullYear();


  /* ========================================
     INITIAL ARCHIVE ENTRY
     Older bulletins (1998–2002) use a single
     legacy archive page
  ======================================== */

  const years = [
    {
      label: "1998 - 2002",
      href: withRoot("/bulletin/bulletin.html")
    }
  ];


  /* ========================================
     GENERATE YEAR OBJECTS
     Each year contains:
       - label   → text shown to user
       - newHref → new bulletin system
       - oldHref → legacy bulletin page
       - dataHref → data file used by new system
  ======================================== */

  for (let year = 2003; year <= currentYear; year++) {
    years.push({
      label: String(year),
      year: year,
      newHref: withRoot(`/bulletins/bulletins-page.html?year=${year}`),
      oldHref: withRoot(`/${year}/${year}b/${year}bull.html`),
      dataHref: withRoot(`/js/bulletin-data/bulletins-${year}-data.js`)
    });
  }


  /* ========================================
     CLEAR EXISTING CONTENT
     Ensures links are rebuilt cleanly
  ======================================== */

  container.innerHTML = "";


  /* ========================================
     BUILD YEAR LINKS
     Create a clickable link for each year
  ======================================== */

  for (const entry of years) {

    const link = document.createElement("a");
    link.textContent = entry.label;
    link.classList.add("bulletin-year-link");


    /* ========================================
       LEGACY ARCHIVE (1998–2002)
       These always go directly to the old page
    ======================================== */

    if (!entry.year) {
      link.href = entry.href;
      container.appendChild(link);
      continue;
    }


    /* ========================================
       DEFAULT LINK
       Assume the new bulletin system exists
    ======================================== */

    link.href = entry.newHref;


    /* ========================================
       DATA FILE CHECK
       Before navigating, check whether the
       bulletin data file exists.

       If it does NOT exist → redirect to
       the legacy bulletin page instead.
    ======================================== */

    link.addEventListener("click", async (e) => {

      try {
        const response = await fetch(entry.dataHref, { method: "HEAD" });

        if (!response.ok) {
          e.preventDefault();
          window.location.href = entry.oldHref;
        }

      } catch (error) {

        e.preventDefault();
        window.location.href = entry.oldHref;

      }

    });


    /* ========================================
       INSERT LINK INTO PAGE
    ======================================== */

    container.appendChild(link);

  }

});