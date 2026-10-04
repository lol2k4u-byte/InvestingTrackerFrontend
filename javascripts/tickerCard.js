import { createPopupMenu } from "./popupMenu.js";
import {
  getAmountFormat,
  getAmountClass,
  getChangePct,
  getNumberFormat,
  getSignedAmountFormat
} from "./global.js";
import { hideTicker } from "./services/tickerApi.js";

const baseCurrency = "DKK";
const numberOfSharesStatId = "NumberOfShares";
const latestPriceChangePctStatId = "LatestPriceChangePct";
const latestPriceStatId = "LatestPrice";
const totalValueStatId = "TotalValue";
const rateOfReturnStatId = "RateOfReturn";
const costBasisStatId = "CostBasis";
const totalProfitLossStatId = "TotalProfitLoss";
let tickerCardId = 0;

export function updateTickerCard(card, ticker) {
  const { currency, numberOfShares, tickerPrice } = ticker;

  updateValue(card, numberOfSharesStatId, numberOfShares, getNumberFormat);
  updateValue(card, latestPriceChangePctStatId, tickerPrice?.latestPriceChangePct, getChangePct, getAmountClass);
  updateValue(card, latestPriceStatId, tickerPrice?.latestPrice, value => getAmountFormat(value, currency));
  updateValue(card, totalValueStatId, tickerPrice?.totalValue, value => getAmountFormat(value, currency));
  updateValue(card, `Base${totalValueStatId}`, tickerPrice?.baseTotalValue, value => getAmountFormat(value, baseCurrency));
  updateReturnInfo(card, tickerPrice?.returnInfo, currency);
  updateReturnInfo(card, tickerPrice?.baseReturnInfo, baseCurrency, "Base");
}

function updateReturnInfo(card, returnInfo, valueCurrency, prefix = "") {
  updateValue(card, `${prefix}${rateOfReturnStatId}`, returnInfo?.rateOfReturn, getChangePct, getAmountClass);
  updateValue(card, `${prefix}${costBasisStatId}`, returnInfo?.costBasis, value => getAmountFormat(value, valueCurrency));
  updateValue(card, `${prefix}${totalProfitLossStatId}`, returnInfo?.totalProfitLoss, value => getSignedAmountFormat(value, valueCurrency), getAmountClass);
}

function updateValue(card, statId, value, format, getValueClass = null) {
  if (value == null) {
    return;
  }

  const element = card.cardElem.querySelector(`[id="TickerCard#${card.id}_${statId}Value"]`);
  if (element) {
    element.textContent = format(value);
    element.className = "cardItemStatValue StatValue";
    const valueClass = getValueClass?.(value);
    if (valueClass) {
      element.classList.add(valueClass);
    }
    element.parentElement.classList.remove("displayNone");
  }
}

export function createTickerCard(ticker) {
  tickerCardId += 1;

  const card = createElement("div", "cardItem pointer");
  const cardPriceStats = createElement("div", "cardItemStats");
  const cardValueStats = createElement("div", "cardItemStats cardItemStatsMargin");
  const cardBaseValueStats = createElement("div", "cardItemStats cardItemStatsMargin displayNone");
  const query = getTickerQuery(ticker);
  const menuItems = createMenuItems(ticker, query, cardBaseValueStats);

  const tickerCard = {
    id: tickerCardId,
    cardElem: card,
    cardPriceElem: cardPriceStats,
    cardValueElem: cardValueStats,
    cardBaseValueElem: cardBaseValueStats
  };

  setCardStats(tickerCard, ticker);
  card.append(
    createHeader(ticker),
    cardPriceStats,
    cardValueStats,
    cardBaseValueStats,
    createPopupMenu("⋯", menuItems)
  );
  card.addEventListener("click", () => {
    window.location.href = `ticker.html?${query}`;
  });

  return tickerCard;
}

export function setCardStats(tickerCard, ticker) {
  const { currency, numberOfShares, tickerPrice } = ticker;

  setPriceStats(tickerCard.cardPriceElem, currency, numberOfShares, tickerPrice);
  setValueStats(tickerCard.cardValueElem, currency, tickerPrice.totalValue, tickerPrice.returnInfo);
  setValueStats(tickerCard.cardBaseValueElem, baseCurrency, tickerPrice.baseTotalValue, tickerPrice.baseReturnInfo, "Base");
}

function createHeader(ticker) {
  const header = createElement("div", "cardItemHeader");
  const name = createElement("div", "cardItemName", ticker.companyName);
  let logo;

  if (ticker.logo === null) {
    logo = createElement("div", "cardItemLogoText", ticker.symbol?.[0] ?? "");
  } else {
    logo = createElement("div", "cardItemLogo");
    const image = createElement("img", "cardItemLogo");
    image.src = ticker.logo;
    image.onerror = () => {
      image.style.display = "none";
    };
    logo.append(image);
  }

  header.append(logo, name);
  return header;
}

function getTickerQuery(ticker) {
  let query = `symbol=${ticker.symbol}&currency=${ticker.currency}`;

  if (ticker.accountId) {
    query += `&accountid=${ticker.accountId}`;
  }

  return query;
}

function createMenuItems(ticker, query, baseValueStats) {
  const menuItems = [
    createNavigationItem("Handel", "trade.html", query),
    createNavigationItem("Option", "option.html", query),
    createNavigationItem("Udbytte", "dividend.html", query)
  ];

  if (ticker.currency !== baseCurrency) {
    menuItems.push({
      text: "Udvid",
      onClick: () => baseValueStats.classList.toggle("displayNone")
    });
  }

  if (ticker.accountId != null && ticker.isHidden != null) {
    const shouldHide = ticker.isHidden !== true;
    menuItems.push({
      text: shouldHide ? "Skjul" : "Vis",
      onClick: () => hideCardTicker(ticker, shouldHide)
    });
  }

  return menuItems;
}

function createNavigationItem(text, page, query) {
  return {
    text,
    onClick: () => {
      window.location.href = `${page}?${query}`;
    }
  };
}

function setPriceStats(container, currency, numberOfShares, tickerPrice) {
  const { latestPrice, latestPriceChangePct } = tickerPrice;

  container.replaceChildren(
    createStat("Antal", getNumberFormat(numberOfShares), numberOfSharesStatId),
    createStat("I dag", getChangePct(latestPriceChangePct), latestPriceChangePctStatId, getAmountClass(latestPriceChangePct)),
    createStat("Seneste", getAmountFormat(latestPrice, currency), latestPriceStatId)
  );
}

function setValueStats(container, currency, totalValue, returnInfo, statIdPrefix = "") {
  const { rateOfReturn, costBasis, totalProfitLoss } = returnInfo ?? {};

  container.replaceChildren(
    createStat("Værdi", getAmountFormat(totalValue, currency), `${statIdPrefix}${totalValueStatId}`, null, totalValue == null),
    createStat("Afkast", rateOfReturn == null ? "" : getChangePct(rateOfReturn), `${statIdPrefix}${rateOfReturnStatId}`, getAmountClass(rateOfReturn), rateOfReturn == null),
    createStat("Købspris", getAmountFormat(costBasis, currency), `${statIdPrefix}${costBasisStatId}`, null, costBasis == null),
    createStat("Profit/tab", getSignedAmountFormat(totalProfitLoss, currency), `${statIdPrefix}${totalProfitLossStatId}`, getAmountClass(totalProfitLoss), totalProfitLoss == null)
  );
}

async function hideCardTicker(ticker, hide) {
  await hideTicker(ticker.accountId, ticker.symbol, hide, ticker.accountTickerLatestUpdate, null);
  window.location.reload();
}

function createStat(label, value, statId = "", valueClass = null, hidden = false) {
  const stat = createElement("div", hidden ? "stat displayNone" : "stat");
  const labelElement = createElement("div", "cardItemStatLabel StatLabel", label);
  const valueElement = createElement("div", "cardItemStatValue StatValue", value);

  labelElement.id = getTagId(`${statId}Label`);
  valueElement.id = getTagId(`${statId}Value`);

  if (valueClass) {
    valueElement.classList.add(valueClass);
  }

  stat.append(labelElement, valueElement);
  return stat;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function getTagId(name) {
  return `TickerCard#${tickerCardId}_${name}`;
}
