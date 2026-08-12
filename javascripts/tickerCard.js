import { createPopupMenu } from "./popupMenu.js";
import { getAmountFormat, getAmountClass, getChangePct, getNumberFormat, getSignedAmountFormat } from "./global.js";
import { hideTicker } from "./services/tickerApi.js";

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

  const cardItemStats1 = document.createElement("div");
  cardItemStats1.className = "cardItemStats";

  cardItemStats1.appendChild(getStat("Antal", getNumberFormat(element.numberOfShares)));
  cardItemStats1.appendChild(getStat("I dag", getChangePct(element.latestPriceChangePct), getAmountClass(element.latestPriceChangePct)));
  cardItemStats1.appendChild(getStat("Seneste", getAmountFormat(element.latestPrice, element.currency)));

  card.appendChild(cardItemStats1);


  card.appendChild(getCardItemStats2(element.currency, element.totalValue, element.returnInfo));

  let baseCardItemStats = null;
  const baseCurrency = "DKK";
  if (element.currency != baseCurrency) {
    baseCardItemStats = getCardItemStats2(baseCurrency, element.baseTotalValue, element.baseReturnInfo);
    baseCardItemStats.classList.add("displayNone");
    card.appendChild(baseCardItemStats);
  }
  
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
    },
    {
      text: "Udvid",
      onClick: () => { expand(baseCardItemStats); }
    }
  ];

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

  return card;
}

async function hideCardTicker(element, hide) {
  await hideTicker(element.accountId, element.symbol, hide, element.accountTickerLatestUpdate, null);
  window.location.reload();
}

function getCardItemStats2(currency, totalValue, returnInfo) {
  const cardItemStats2 = document.createElement("div");
  cardItemStats2.className = "cardItemStats cardItemStatsMargin";

  cardItemStats2.appendChild(getStat("Værdi", getAmountFormat(totalValue, currency)));
  cardItemStats2.appendChild(getStat("Afkast", getChangePct(returnInfo.rateOfReturn), getAmountClass(returnInfo.rateOfReturn)));
  

  if (returnInfo.costBasis) {
    cardItemStats2.appendChild(getStat("Købspris", getAmountFormat(returnInfo.costBasis, currency)));
  }

  if (returnInfo.totalProfitLoss) {
    cardItemStats2.appendChild(getStat("Profit/tab", getSignedAmountFormat(returnInfo.totalProfitLoss, currency), getAmountClass(returnInfo.totalProfitLoss)));
  }

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