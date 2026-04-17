import { createPopupMenu } from "./popupMenu.js";

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

  const cardItemHeader = document.createElement("div");
  cardItemHeader.className = "cardItemHeader";

  if (element.logo == null) {
    const symbolChar = element.symbol?.[0] ?? "";
    cardItemHeader.innerHTML = `
      <div class="cardItemLogoText">${symbolChar}</div>
      <div class="cardItemName">${element.companyName}</div>
    `;
  } else {
    cardItemHeader.innerHTML = `
      <div class="cardItemLogo"><img class="cardItemLogo" src="${element.logo}"/></div>
      <div class="cardItemName">${element.companyName}</div>
    `;
}
  card.appendChild(cardItemHeader);

  const cardItemStats = document.createElement("div");
  cardItemStats.className = "cardItemStats";
  cardItemStats.innerHTML = `
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
  `;
  card.appendChild(cardItemStats);
  
  
  const parm = `accountId=${element.accountId}&symbol=${element.symbol}`;

  const elementer = [
  {
    text: "Handel",
    onClick: () => { window.location.href = `trade.html?${parm}`; }
  },
  {
    text: "Option",
    onClick: () => { window.location.href = `option.html?${parm}`; }
  },
  {
    text: "Udbytte",
    onClick: () => { window.location.href = `dividend.html?${parm}`; }
  },
  ];

  const popupMenu = createPopupMenu("⋯", elementer);
  card.appendChild(popupMenu);

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?${parm}`;
  });

  return card;
}
