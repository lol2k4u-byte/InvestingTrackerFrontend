import { getTickerInfo } from "./services/tickerApi.js"

let tickerPromise = null;

export function getSharedTicker(accountId, symbol) {
    if (!tickerPromise) {
        tickerPromise = getTickerInfo(accountId, symbol);
    }

    return tickerPromise;
}