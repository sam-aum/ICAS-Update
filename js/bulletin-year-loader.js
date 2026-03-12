window.addEventListener("DOMContentLoaded", () => {
    const withRoot = window.withRoot || ((path) => path);
  
    const params = new URLSearchParams(window.location.search);
    const currentYear = String(new Date().getFullYear());
    const year = params.get("year") || currentYear;
  
    const dataScript = document.createElement("script");
    dataScript.src = withRoot(`/js/bulletin-data/bulletins-${year}-data.js`);
  
    dataScript.onload = () => {
      const genScript = document.createElement("script");
      genScript.src = withRoot("/js/bullgen.js");
      document.body.appendChild(genScript);
    };
  
    dataScript.onerror = () => {
      const mount = document.getElementById("bulletinsMount");
      const pageTitle = document.getElementById("bulletinsPageTitle");
  
      if (pageTitle) {
        pageTitle.textContent = `Bulletins - ${year}`;
      }
  
      if (mount) {
        mount.innerHTML = `
          <li class="bulletin-feed-item">
            <div class="bulletin-feed-link">
              <span class="bulletin-feed-title">No bulletin data was found for ${year}.</span>
            </div>
          </li>
        `;
      }
    };
  
    document.body.appendChild(dataScript);
  });