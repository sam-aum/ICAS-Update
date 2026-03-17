(function() {
  // Create a wrapper div for the signature
  const footerWrapper = document.createElement("div");

  // Add the content
  footerWrapper.innerHTML = `
    <div style="max-width: 500px; margin: 20px auto; text-align: left; line-height: 1.5;">
      <p>Sincerely,</p>
      <p>
        Sang Joo Kim<br>
        Senior Fellow &amp; Executive Vice President<br>
        <span class="ia">ICAS</span><br>
        <a href="https://www.icasinc.org/strategy.html"><span class="ia">ICAS</span> Strategy (icasinc.org)</a><br>
        <a href="https://www.icasinc.org/2026/2026v/2026video.html"><span class="ia">ICAS</span> 2026 Videos</a><br>
        <span class="ia">ICAS</span> is not an agent of any government and/or foreign principal.</p>
      </p>
    </div>

    <div style="width: 100%; text-align: right; font-size: 0.9em; color: #555; margin-top: 10px;">
      <p>All Rights Reserved</p>
    </div>
  `;

  // Insert it exactly where this script is in the page
  document.currentScript.parentNode.insertBefore(footerWrapper, document.currentScript.nextSibling);
})();
