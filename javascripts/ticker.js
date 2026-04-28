import { createTickerCard } from "./tickerCard.js";
import { getSharedTicker } from "./tickerCache.js"

const params = new URLSearchParams(window.location.search);
const accountId = params.get("accountid");
const symbol = params.get("symbol");
const ticker = await getSharedTicker(accountId, symbol);

const card = createTickerCard(ticker);
document.getElementById("tickerCard").appendChild(card);

document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("vis");
  });
});
