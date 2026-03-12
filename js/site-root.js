/* ========================================
   SITE ROOT HELPER
   Detects whether the site is running:
   - at the domain root
   - inside a sandbox folder
======================================== */

(function () {
    function detectSiteRoot() {
      const path = window.location.pathname;
  
      if (path.startsWith("/sandbox4/")) return "/sandbox4";
      if (path.startsWith("/sandbox3/")) return "/sandbox3";
      if (path.startsWith("/sandbox2/")) return "/sandbox2";
      if (path.startsWith("/sandbox/")) return "/sandbox";
  
      return "";
    }
  
    window.SITE_ROOT = detectSiteRoot();
  
    window.withRoot = function (path) {
      return `${window.SITE_ROOT}${path}`;
    };
  })();