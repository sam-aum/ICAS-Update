/* ========================================
   BULLETIN PAGE LOADER
   Loads the bulletin data file for the
   requested year, then loads bullgen.js
======================================== */

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
    window.location.href = `/${year}/${year}b/${year}bull.html`;
  };

  document.body.appendChild(dataScript);

});