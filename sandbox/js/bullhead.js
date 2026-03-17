document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".bulletin-card, #main");
  if (!main) return;

  const header = document.createElement("div");
  header.className = "bulletin-topmark";
  header.innerHTML = `
    <div class="bulletin-topmark-inner">
      <p class="bulletin-label">
        <span class="B1">ICAS </span><span class="B2">Bulletin</span>
      </p>
      <hr class="bulletin-rule">
      <p class="bulletin-org">Institute for Corean-American Studies, Inc.</p>
    </div>
  `;

  main.prepend(header);
});