import { stream } from "./services/tickerApi.js";
import { createTickerCard, updateTickerCard } from "./tickerCard.js";
import { getSharedTicker } from "./tickerCache.js"
import { loadController } from "./controller.js";

const params = new URLSearchParams(window.location.search);
const accountId = params.get("accountid");
const symbol = params.get("symbol");
const ticker = await getSharedTicker(accountId, symbol);
const controller = loadController();
let streamRequest = null;
loadTickerCard();
startStream();

document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("vis");
  });
});

function loadTickerCard() {
  const card = createTickerCard(ticker);
  document.getElementById("tickerCard").appendChild(card.cardElem);
  streamRequest = getStreamRequest(ticker, card);
}

function getStreamRequest(element, card) {
  const correlationId = crypto.randomUUID();
  return {
    correlationId: correlationId,
    accountId: element.accountId,
    symbol: element.symbol,
    currency: element.currency,
    card: card
  };
}

function startStream() {
  const items = [ streamRequest ];
  stream(items, null, processStreamResponse, controller.signal);
}

function processStreamResponse(response) {
  if (response.correlationId === streamRequest.correlationId) {
    updateTickerCard(streamRequest.card, response);
  }
}