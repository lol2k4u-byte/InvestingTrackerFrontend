import { getTickerList, stream } from "./services/tickerApi.js";
import { createTickerCard, updateTickerCard } from "./tickerCard.js";
import { loadController } from "./controller.js";

const elementer = await getTickerList(true, null);

const liste = document.getElementById("liste");
let accountId = null;
let accountDiv = null;
let accountList = null;
const streamRequests = new Map();
loadTickerCards();
const controller = loadController();
startStream();

function loadTickerCards() {
  elementer.forEach((element) => {
    createAccountDiv(element);
    const card = createTickerCard(element);
    accountList.appendChild(card.cardElem);
    addStreamRequest(element, card);
  });
}

function addStreamRequest(element, card) {
  const correlationId = crypto.randomUUID();
  const streamRequest = {
    correlationId: correlationId,
    accountId: element.accountId,
    symbol: element.symbol,
    currency: element.currency,
    card: card
  };

  streamRequests.set(correlationId, streamRequest);
}

function startStream() {
  const items = Array.from(streamRequests.values());
  stream(items, null, processStreamResponse, controller.signal);
}

function processStreamResponse(response) {
  const request = streamRequests.get(response.correlationId);
  updateTickerCard(request.card, response);
}

function createAccountDiv(element) {
  if (element.accountId != accountId) {
    accountList = document.createElement("div");

    accountId = element.accountId;
    accountDiv = document.createElement("div");
    accountDiv.className = "accountList";
    accountDiv.append(getAccountHeader(element, accountList));

    accountList.className = "accountList";
    accountDiv.appendChild(accountList);

    liste.appendChild(accountDiv);
  }

  return accountDiv;
}

function getAccountHeader(element, list) {
  const header = document.createElement("div");
  header.className = "accountHeader pointer";

  const name = document.createElement("h1");
  name.textContent = element.accountName;
  header.appendChild(name);

  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.textContent = "▼";
  header.appendChild(arrow);

  header.addEventListener("click", () => {
    arrow.classList.toggle("close");
    list.classList.toggle("hidden");
  });

  return header;
}