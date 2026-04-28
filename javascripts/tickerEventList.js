import { getDateFormat } from "./global.js";
import { createTradeCard } from "./tradeCard.js";
import { createOptionCard } from "./optionCard.js";
import { createDividendCard } from "./dividendCard.js";
import { getSharedTicker } from "./tickerCache.js"
import { getTickerEvents } from "./services/tickerApi.js";

const eventList = document.getElementById("eventList");
const parm = loadParm();
const ticker = await getSharedTicker(parm.accountId, parm.symbol);
const events = await getTickerEvents(parm.accountId, parm.symbol);

function loadParm() {
  const params = new URLSearchParams(window.location.search);

  return {
    accountId: params.get("accountid"),
    symbol: params.get("symbol")
  };
}

events.forEach((event) => {
  if (event.trade != null) {
    const tradeCard = createTradeCard(event.trade, ticker.currency);
    eventList.appendChild(tradeCard);
  }
  if (event.option != null) {
    const optionCard = createOptionCard(event.option, ticker.currency);
    eventList.appendChild(optionCard);
  }
  if (event.dividend != null) {
    const dividendCard = createDividendCard(event.dividend, ticker.currency);
    eventList.appendChild(dividendCard);
  }
});



