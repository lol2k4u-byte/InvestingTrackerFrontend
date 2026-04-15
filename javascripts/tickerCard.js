export function createTickerCard(element) {
  const card = document.createElement("div");
  card.className = "cardItem pointer";

  const afkastClass = element.afkast.startsWith("-") ? "negativeAmount" : "positiveAmount";
  const idagClass = element.idag.startsWith("-") ? "negativeAmount" : "positiveAmount";

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

  const menuKnap = card.querySelector(".menu-knap");
  const popupMenu = card.querySelector(".popup-menu");
  const menuItems = card.querySelectorAll(".menu-item");

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?id=${element.id}`;
  });

  menuKnap.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("vis");
  });

  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  menuItems[0].addEventListener("click", () => {
    window.location.href = `trade.html?id=${element.id}`;
  });

  menuItems[1].addEventListener("click", () => {
    window.location.href = `option.html?id=${element.id}`;
  });

  menuItems[2].addEventListener("click", () => {
    window.location.href = `dividend.html?id=${element.id}`;
  });

  return card;
}
