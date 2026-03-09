document.addEventListener("DOMContentLoaded", () => {
  /* =======================================
     GET ARCHIVE CONTAINER
  ======================================= */

  const container = document.getElementById("bulletin-archive-links");
  if (!container) return;

  const currentYear = new Date().getFullYear();


  /* =======================================
     BUILD ARCHIVE YEAR DATA
  ======================================= */

  const years = [
    { label: "1998 - 2002", href: "/bulletin/bulletin.html" }
  ];

  for (let year = 2003; year <= currentYear; year++) {
    years.push({
      label: String(year),
      href: `/${year}/${year}b/${year}bull.html`
    });
  }


  /* =======================================
     RENDER ARCHIVE LINKS
  ======================================= */

  container.innerHTML = "";

  for (const year of years) {
    const link = document.createElement("a");
    link.href = year.href;
    link.textContent = year.label;
    link.classList.add("bulletin-year-link");

    container.appendChild(link);
  }
});