const elementer = [
  {
	id: 1,
    navn: "Ericsson B",
    logo: "E",
    vaerdi: "22.462 kr",
    afkast: "+7,71%",
    idag: "-1,62%",
    seneste: "109,15 SEK"
  },
  {
	id: 2,
    navn: "Novo Nordisk",
    logo: "N",
    vaerdi: "18.940 kr",
    afkast: "+4,12%",
    idag: "+0,84%",
    seneste: "725,40 DKK"
  }
];

const liste = document.getElementById("liste");

elementer.forEach((element) => {
  const card = document.createElement("div");
  card.className = "item";

  const afkastClass = element.afkast.startsWith("-") ? "negativ" : "positiv";
  const idagClass = element.idag.startsWith("-") ? "negativ" : "positiv";

  card.innerHTML = `
    <div class="menu-wrapper">
      <button class="menu-knap">⋯</button>
      <div class="popup-menu">
        <div class="menu-item">Handel</div>
        <div class="menu-item">Option</div>
        <div class="menu-item">Udbytte</div>
	  </div>
	</div>
  
    <div class="item-header">
      <div class="logo">${element.logo}</div>
      <div class="navn">${element.navn}</div>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="label">Værdi</div>
        <div class="value">${element.vaerdi}</div>
      </div>

      <div class="stat">
        <div class="label">Afkast</div>
        <div class="value ${afkastClass}">${element.afkast}</div>
      </div>

      <div class="stat">
        <div class="label">I dag</div>
        <div class="value ${idagClass}">${element.idag}</div>
      </div>

      <div class="stat">
        <div class="label">Seneste</div>
        <div class="value">${element.seneste}</div>
      </div>
    </div>
  `;
  
  card.style.cursor = "pointer";

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?id=${element.id}`;
  });
  
  const menuKnap = card.querySelector(".menu-knap");
  const popupMenu = card.querySelector(".popup-menu");

  menuKnap.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("vis");
  });

  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  
  const menuItems = card.querySelectorAll(".menu-item");

  menuItems[0].addEventListener("click", () => {
    window.location.href = `trade.html?id=${element.id}`;
  });

  menuItems[1].addEventListener("click", () => {
    window.location.href = `option.html?id=${element.id}`;
  });

  menuItems[2].addEventListener("click", () => {
    window.location.href = `dividend.html?id=${element.id}`;
  });

  liste.appendChild(card);
});

document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("vis");
  });
});