const script = document.currentScript;

if (script && script.parentNode) {
  const footerWrapper = document.createElement("div");
  footerWrapper.className = "bulletin-signature-wrap";

  footerWrapper.innerHTML = `
    <div class="bulletin-signature">
      <p>Sincerely,</p>

      <p>
        Sang Joo Kim<br>
        Senior Fellow &amp; Executive Vice President<br>
        <span class="ia">ICAS</span><br>
        <a href="https://www.icasinc.org/strategy.html">
          <span class="ia">ICAS</span> Strategy (icasinc.org)
        </a><br>
        <a href="https://www.icasinc.org/2026/2026v/2026video.html">
          <span class="ia">ICAS</span> 2026 Videos
        </a><br>
        <span class="ia">ICAS</span> is not an agent of any government and/or foreign principal.
      </p>
    </div>

    <div class="bulletin-rights">
      <p>All Rights Reserved</p>
    </div>
  `;

  script.parentNode.insertBefore(footerWrapper, script);
  script.remove();
}