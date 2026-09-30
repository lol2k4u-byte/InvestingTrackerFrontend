import { createPopupMenu } from "./popupMenu.js";
import { getAmountFormat, getAmountClass, getChangePct, getNumberFormat, getSignedAmountFormat } from "./global.js";
import { hideTicker } from "./services/tickerApi.js";

const baseCurrency = "DKK";

export function updateTickerCard(card, element) {
  card.cardPriceElem.replaceChildren();
  setStats1Children(card.cardPriceElem, element.currency, element.numberOfShares, element.tickerPrice.latestPrice, element.tickerPrice.latestPriceChangePct)
  card.cardValueElem.replaceChildren();
  setStats2Children(card.cardValueElem, element.currency, element.tickerPrice.totalValue, element.tickerPrice.returnInfo);
  card.cardBaseValueElem.replaceChildren();
  setStats2Children(card.cardBaseValueElem, baseCurrency, element.tickerPrice.baseTotalValue, element.tickerPrice.baseReturnInfo);
}

export function createTickerCard(element) {
  const card = document.createElement("div");
  card.className = "cardItem pointer";

  const cardItemHeader = document.createElement("div");
  cardItemHeader.className = "cardItemHeader";

  if (element.logo === null) {
    const symbolChar = element.symbol?.[0] ?? "";
    cardItemHeader.innerHTML = `
      <div class="cardItemLogoText">${symbolChar}</div>
      <div class="cardItemName">${element.companyName}</div>
    `;
  } else {
    const cardItemLogo = document.createElement("div");
    cardItemLogo.className = "cardItemLogo";
    const img = document.createElement("img");
    img.className = "cardItemLogo";
    img.src = element.logo;
    cardItemLogo.appendChild(img);
    img.onerror = () => {
      img.style.display = "none";
    };

    const cardItemName = document.createElement("div");
    cardItemName.className = "cardItemName";
    cardItemName.textContent = element.companyName;

    cardItemHeader.appendChild(cardItemLogo);
    cardItemHeader.appendChild(cardItemName);
    /*
    cardItemHeader.innerHTML = `
      <div class="cardItemLogo"><img class="cardItemLogo" src="${element.logo}"/></div>
      <div class="cardItemName">${element.companyName}</div>
    `;
    */
  }
  card.appendChild(cardItemHeader);

  const cardPriceStats = document.createElement("div");
  cardPriceStats.className = "cardItemStats";
  setStats1Children(cardPriceStats, element.currency, element.numberOfShares, element.tickerPrice.latestPrice, element.tickerPrice.latestPriceChangePct);
  card.appendChild(cardPriceStats);

  const cardValueStats = getCardItemStats2(element.currency, element.tickerPrice.totalValue, element.tickerPrice.returnInfo);
  card.appendChild(cardValueStats);

  const cardBaseValueStats = getCardItemStats2(baseCurrency, element.tickerPrice.baseTotalValue, element.tickerPrice.baseReturnInfo);
  cardBaseValueStats.classList.add("displayNone");
  card.appendChild(cardBaseValueStats);

  let parm = `symbol=${element.symbol}&currency=${element.currency}`;

  if (element.accountId) {
    parm = parm + `&accountid=${element.accountId}`;
  }

  let elementer = [
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
    }
  ];
  
  if (element.currency != baseCurrency) {
    elementer.push({
      text: "Udvid",
      onClick: () => { expand(baseCardItemStats); }
    });
  }

  if (element.accountId != null && element.isHidden != null) {
    if (element.isHidden === true) {
      elementer.push({
        text: "Vis",
        onClick: () => { hideCardTicker(element, false); }
      })
    } else {
      elementer.push({
        text: "Skjul",
        onClick: () => { hideCardTicker(element, true); }
      })
    }
  }

  const popupMenu = createPopupMenu("⋯", elementer);
  card.appendChild(popupMenu);

  card.addEventListener("click", () => {
    window.location.href = `ticker.html?${parm}`;
  });

  return {
    cardElem: card,
    cardPriceElem: cardPriceStats,
    cardValueElem: cardValueStats,
    cardBaseValueElem: cardBaseValueStats
  }
}

function setStats1Children(elem, currency, numberOfShares, latestPrice, latestPriceChangePct) {
  elem.appendChild(getStat("Antal", getNumberFormat(numberOfShares)));
  elem.appendChild(getStat("I dag", getChangePct(latestPriceChangePct), getAmountClass(latestPriceChangePct)));
  elem.appendChild(getStat("Seneste", getAmountFormat(latestPrice, currency)));
}

function setStats2Children(elem, currency, totalValue, returnInfo) {
  if (totalValue != null) {
    elem.appendChild(getStat("Værdi", getAmountFormat(totalValue, currency)));
  }

  if (returnInfo != null) {
    elem.appendChild(getStat("Afkast", getChangePct(returnInfo.rateOfReturn), getAmountClass(returnInfo.rateOfReturn)));


    if (returnInfo.costBasis) {
      elem.appendChild(getStat("Købspris", getAmountFormat(returnInfo.costBasis, currency)));
    }

    if (returnInfo.totalProfitLoss) {
      elem.appendChild(getStat("Profit/tab", getSignedAmountFormat(returnInfo.totalProfitLoss, currency), getAmountClass(returnInfo.totalProfitLoss)));
    }
  }
}

async function hideCardTicker(element, hide) {
  await hideTicker(element.accountId, element.symbol, hide, element.accountTickerLatestUpdate, null);
  window.location.reload();
}

function getCardItemStats2(currency, totalValue, returnInfo) {
  const cardItemStats2 = document.createElement("div");
  cardItemStats2.className = "cardItemStats cardItemStatsMargin";

  setStats2Children(cardItemStats2, currency, totalValue, returnInfo);
  
  return cardItemStats2;
}

function getStat(label, value, valueClass = null) {
  const stat = document.createElement("div");
  stat.className = "stat";

  const labelElem = document.createElement("div");
  labelElem.className = "cardItemStatLabel StatLabel";
  labelElem.textContent = label;
  stat.appendChild(labelElem);

  const valueElem = document.createElement("div");
  valueElem.className = "cardItemStatValue StatValue";
  if (valueClass) {
    valueElem.classList.add(valueClass);
  }
  valueElem.textContent = value;
  stat.appendChild(valueElem);

  return stat;
}

function expand(element) {
  if (element != null) {
    element.classList.toggle("displayNone");
  }
}