document.addEventListener("DOMContentLoaded", function () {

  const nav = document.getElementById("main-nav");

  const links = [
      { href: "/bullbase.html", label: "Bulletins" },
      { href: "/contact.html", label: "Contact" },
      { href: "/speakers.html", label: "Contributors & Speakers" },
      { href: "/delegate/delegate.html", label: "Delegations" },
      { href: "/roster.html", label: "Fellows" },
      { href: "/golf/golf.html", label: "Golf" },
      { href: "/history/history.html", label: "Historical Documents" },
      { href: "/index.html", label: "Home" },
      { href: "/organize.html", label: "Index of Organizations" },
      { href: "/support.html", label: "Institutional Supporters" },
      { href: "/interns.html", label: "Interns & Associates" },
      { href: "/lectures.html", label: "Lectures" },
      { href: "/liberty.html", label: "Liberty Award" },
      { href: "/mission.html", label: "Mission" },
      { href: "/gallery/gallery.html", label: "Photos" },
      { href: "/archives/progarch.html", label: "Programs Archives" },
      { href: "/special.html", label: "Specials" },
      { href: "/staff.html", label: "Staff" },
      { href: "/strategy.html", label: "Strategy" },
      { href: "/symposia.html", label: "Symposia" },
      { href: "/tennis/tennis.html", label: "Tennis" },
      { href: "/upcome.html", label: "Upcoming" },
      { href: "/vidbase.html", label: "Videos" },
      { href: "/youth/yacademy.html", label: "Youth Academy" }
  ];

  const ul = document.createElement("ul");
  ul.classList.add("nav-list");

  links.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = link.href;
      a.textContent = link.label;

      li.appendChild(a);
      ul.appendChild(li);
  });

  nav.appendChild(ul);

});