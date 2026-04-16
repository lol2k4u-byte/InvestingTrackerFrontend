export function createTickerCard(element) {
  const card = document.createElement("div");
  card.className = "cardItem pointer";

  const afkastClass = element.afkast.startsWith("-") ? "negativeAmount" : "positiveAmount";
  const idagClass = element.idag.startsWith("-") ? "negativeAmount" : "positiveAmount";

  card.innerHTML = `
    <div class="menu-wrapper">
      <button class="cmenu-button">&plus;</button>
      <div class="popup-menu">
        <div class="menu-item">Handel</div>
        <div class="menu-item">Option</div>
        <div class="menu-item">Udbytte</div>
      </div>
    </div>

    <div class="cardItemHeader">
      <div class="cardItemLogo">${element.logo}</div>
      <div class="cardItemName">${element.navn}</div>
    </div>

    <div class="cardItemStats">
      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Værdi</div>
        <div class="cardItemStatValue StatValue">${element.vaerdi}</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Afkast</div>
        <div class="cardItemStatValue StatValue ${afkastClass}">${element.afkast}</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">I dag</div>
        <div class="cardItemStatValue StatValue ${idagClass}">${element.idag}</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Seneste</div>
        <div class="cardItemStatValue StatValue">${element.seneste}</div>
      </div>
    </div>
  `;

  const menuKnap = card.querySelector(".menu-button");
  const popupMenu = card.querySelector(".popup-menu");
  const menuItems = card.querySelectorAll(".menu-item");

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?id=${element.id}`;
  });

  menuKnap.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("show");
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
