export function createTickerCard(element) {
  const card = document.createElement("div");
  card.className = "cardItem pointer";

  //const afkastClass = element.afkast.startsWith("-") ? "negativeAmount" : "positiveAmount";
  //const idagClass = element.idag.startsWith("-") ? "negativeAmount" : "positiveAmount";

  const afkastClass = "negativeAmount";
  const idagClass = "positiveAmount";

  const symbolChar = element.symbol?.[0] ?? "";
  const logoClass = element.logo == null ? "cardItemLogoText" : "cardItemLogo";
  const logoHtml = element.logo == null ? symbolChar : `<img class="cardItemLogo" src="${element.logo}"/>`;
  

  card.innerHTML = `
    <div class="menu-wrapper">
      <button class="menu-button">&plus;</button>
      <div class="popup-menu">
        <div class="menu-item">Handel</div>
        <div class="menu-item">Option</div>
        <div class="menu-item">Udbytte</div>
      </div>
    </div>

    <div class="cardItemHeader">
      <div class="${logoClass}">${logoHtml}</div>
      <div class="cardItemName">${element.companyName}</div>
    </div>

    <div class="cardItemStats">
      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Værdi</div>
        <div class="cardItemStatValue StatValue">${element.totalValue}</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Afkast</div>
        <div class="cardItemStatValue StatValue ${afkastClass}">-1,23%</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">I dag</div>
        <div class="cardItemStatValue StatValue ${idagClass}">+3,27%</div>
      </div>

      <div class="stat">
        <div class="cardItemStatLabel StatLabel">Seneste</div>
        <div class="cardItemStatValue StatValue">${element.latestPrice}</div>
      </div>
    </div>
  `;

  const menuKnap = card.querySelector(".menu-button");
  const popupMenu = card.querySelector(".popup-menu");
  const menuItems = card.querySelectorAll(".menu-item");

  const parm = `accountId=${element.accountId}&symbol=${element.symbol}`;

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?${parm}`;
  });

  menuKnap.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("show");
  });

  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  menuItems[0].addEventListener("click", () => {
    window.location.href = `trade.html?${parm}`;
  });

  menuItems[1].addEventListener("click", () => {
    window.location.href = `option.html?${parm}`;
  });

  menuItems[2].addEventListener("click", () => {
    window.location.href = `dividend.html?${parm}`;
  });

  return card;
}
