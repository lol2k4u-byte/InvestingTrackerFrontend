import { getDateFormat } from "./global.js";
import { createTradeCard } from "./tradeCard.js";
import { createOptionCard } from "./optionCard.js";
import { createDividendCard } from "./dividendCard.js";
import { getTickerInfo, getTickerEvents } from "./services/tickerApi.js";

const eventList = document.getElementById("eventList");
const parm = loadParm();
const ticker = await getTickerInfo(parm.accountId, parm.symbol);
const events = await getTickerEvents(parm.accountId, parm.symbol);

function loadParm() {
  const params = new URLSearchParams(window.location.search);

  return {
    accountId: params.get("accountid"),
    symbol: params.get("symbol")
  };
}

events.forEach((event) => {
  const tradeCard = createTradeCard(event.trade, ticker.currency);
  eventList.appendChild(tradeCard);
});



