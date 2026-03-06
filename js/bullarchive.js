document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bulletin-archive-links");
  if (!container) return;

  // const years = [
  //   { label: "1998 - 2002", href: "/bulletin/bulletin.html" },
  //   { label: "2003", href: "/2003/2003b/2003bull.html" },
  //   { label: "2004", href: "/2004/2004b/2004bull.html" },
  //   { label: "2005", href: "/2005/2005b/2005bull.html" },
  //   { label: "2006", href: "/2006/2006b/2006bull.html" },
  //   { label: "2007", href: "/2007/2007b/2007bull.html" },
  //   { label: "2008", href: "/2008/2008b/2008bull.html" },
  //   { label: "2009", href: "/2009/2009b/2009bull.html" },
  //   { label: "2010", href: "/2010/2010b/2010bull.html" },
  //   { label: "2011", href: "/2011/2011b/2011bull.html" },
  //   { label: "2012", href: "/2012/2012b/2012bull.html" },
  //   { label: "2013", href: "/2013/2013b/2013bull.html" },
  //   { label: "2014", href: "/2014/2014b/2014bull.html" },
  //   { label: "2015", href: "/2015/2015b/2015bull.html" },
  //   { label: "2016", href: "/2016/2016b/2016bull.html" },
  //   { label: "2017", href: "/2017/2017b/2017bull.html" },
  //   { label: "2018", href: "/2018/2018b/2018bull.html" },
  //   { label: "2019", href: "/2019/2019b/2019bull.html" },
  //   { label: "2020", href: "/2020/2020b/2020bull.html" },
  //   { label: "2021", href: "/2021/2021b/2021bull.html" },
  //   { label: "2022", href: "/2022/2022b/2022bull.html" },
  //   { label: "2023", href: "/2023/2023b/2023bull.html" },
  //   { label: "2024", href: "/2024/2024b/2024bull.html" },
  //   { label: "2025", href: "/2025/2025b/2025bull.html" },
  //   { label: "2026", href: "/2026/2026b/2026bull.html" }
  // ];


  // this is the list of years that will automatically be added to the archive each new year
  const currentYear = new Date().getFullYear();

  const years = [
    { label: "1998 - 2002", href: "/bulletin/bulletin.html" }
  ];

  for (let year = 2003; year <= currentYear; year++) {
    years.push({
      label: String(year),
      href: `/${year}/${year}b/${year}bull.html`
    });
  }

  years.forEach(year => {
    const link = document.createElement("a");
    link.href = year.href;
    link.textContent = year.label;

    // IMPORTANT: use a different class than the bulletin list uses
    link.classList.add("bulletin-year-link");

      // // highlight the current year
      // const currentYear = new Date().getFullYear().toString();

      // if (year.label === currentYear) {
      //   link.classList.add("active-year");
      // }

    container.appendChild(link);
  });
  

});