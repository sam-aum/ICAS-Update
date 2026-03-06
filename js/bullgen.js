document.addEventListener("DOMContentLoaded", () => {
    const mount = document.getElementById("bulletinsMount");
    const raw = document.getElementById("bulletinsData")?.textContent || "";
    if (!mount) return;
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // expected format: b260222a
    function parseCode(code) {
      const match = code.match(/^([a-zA-Z])(\d{2})(\d{2})(\d{2})([a-zA-Z0-9]+)$/);
      if (!match) return null;
  
      const prefix = match[1];
      const yy = match[2];
      const mm = match[3];
      const dd = match[4];
  
      const fullYear = 2000 + Number(yy);
      const monthIndex = Number(mm) - 1;
      const day = Number(dd);
  
      const dt = new Date(fullYear, monthIndex, day);
      if (
        isNaN(dt.getTime()) ||
        dt.getFullYear() !== fullYear ||
        dt.getMonth() !== monthIndex ||
        dt.getDate() !== day
      ) {
        return null;
      }
  
      const href = `/${fullYear}/${fullYear}${prefix}/${code}.html`;
  
      return {
        code,
        dt,
        href
      };
    }
  
    function prettyDate(dt) {
      const month = monthNames[dt.getMonth()];
      const day = String(dt.getDate()).padStart(2, "0");
      const year = dt.getFullYear();
      return `${month} ${day}, ${year}`;
    }
  
    const lines = raw
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
  
    const items = [];
  
    for (const line of lines) {
      const parts = line.split("|").map(part => part.trim());
      const code = parts[0];
      const titleHtml = parts.slice(1).join(" | ");
  
      if (!code || !titleHtml) continue;
  
      const parsed = parseCode(code);
      if (!parsed) continue;
  
      items.push({
        ...parsed,
        titleHtml
      });
    }
  
    items.sort((a, b) => b.dt - a.dt);
  
    const ul = document.createElement("ul");
    ul.className = "bulletin-feed-list";
  
    for (const item of items) {
      const li = document.createElement("li");
      li.className = "bulletin-feed-item";
  
      li.innerHTML = `
        <a class="bulletin-feed-link" href="${item.href}">
          <span class="bulletin-feed-date">${prettyDate(item.dt)}</span>
          <span class="bulletin-feed-title">${item.titleHtml}</span>
        </a>
      `;
  
      ul.appendChild(li);
    }
  
    mount.innerHTML = "";
    mount.appendChild(ul);
  });