/* ========================================
   BULLETIN YEAR ARCHIVE LINKS
   Uses bulletin-config.js to determine
   whether each year should use the new
   system or the legacy page.
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("bulletin-archive-links");
  if (!container) return;

  const withRoot = window.withRoot || ((path) => path);
  const currentYear = new Date().getFullYear();

  const newSystemYears =
    window.BULLETIN_CONFIG?.newSystemYears || [];

  const years = [
    {
      label: "1998 - 2002",
      href: "/bulletin/bulletin.html"
    }
  ];

  for (let year = 2003; year <= currentYear; year++) {
    const yearString = String(year);
    const useNewSystem = newSystemYears.includes(yearString);

    years.push({
      label: yearString,
      href: useNewSystem
        ? withRoot(`/bulletins/bulletins-page.html?year=${yearString}`)
        : `/${yearString}/${yearString}b/${yearString}bull.html`
    });
  }

  container.innerHTML = "";

  for (const entry of years) {
    const link = document.createElement("a");
    link.textContent = entry.label;
    link.href = entry.href;
    link.classList.add("bulletin-year-link");
    container.appendChild(link);
  }

});