import { getTickerInfo } from "./services/tickerApi.js"

let tickerPromise = null;

export function getSharedTicker(accountId, tickerId) {
    if (!tickerPromise) {
        tickerPromise = getTickerInfo(accountId, tickerId);
    }

    return tickerPromise;
}