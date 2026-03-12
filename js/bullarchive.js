document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bulletin-archive-links");
  if (!container) return;

  const withRoot = window.withRoot || ((path) => path);
  const currentYear = new Date().getFullYear();

  const years = [
    {
      label: "1998 - 2002",
      href: withRoot("/bulletin/bulletin.html")
    }
  ];

  for (let year = 2003; year <= currentYear; year++) {
    years.push({
      label: String(year),
      year: year,
      newHref: withRoot(`/bulletins/bulletins-page.html?year=${year}`),
      oldHref: withRoot(`/${year}/${year}b/${year}bull.html`),
      dataHref: withRoot(`/js/bulletin-data/bulletins-${year}-data.js`)
    });
  }

  container.innerHTML = "";

  for (const entry of years) {
    const link = document.createElement("a");
    link.textContent = entry.label;
    link.classList.add("bulletin-year-link");

    if (!entry.year) {
      link.href = entry.href;
      container.appendChild(link);
      continue;
    }

    link.href = entry.newHref;

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

    container.appendChild(link);
  }
});