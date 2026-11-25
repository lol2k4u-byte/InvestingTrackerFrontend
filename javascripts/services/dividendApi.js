import { getResponseReqAuthJson } from "./apiBase.js";

export async function createDividend(stockBrokerAccountId, tickerId, date, numberOfShares, dividendValue, dividendCurrency, exchangeRateInfos, message) {
    const obj = {
        stockBrokerAccountId: stockBrokerAccountId,
        tickerId: tickerId,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue,
        dividendCurrency: dividendCurrency,
        exchangeRateInfos: exchangeRateInfos
    };

    const endpoint = "Dividend/create";
    const method = "POST";

    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function updateDividend(id, stockBrokerAccountId, tickerId, date, numberOfShares, dividendValue, dividendCurrency, exchangeRateInfos, latestUpdate, message) {
    const obj = {
        id: id,
        stockBrokerAccountId: stockBrokerAccountId,
        tickerId: tickerId,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue,
        dividendCurrency: dividendCurrency,
        exchangeRateInfos: exchangeRateInfos,
        latestUpdate: latestUpdate
    };

    const endpoint = "Dividend/update";
    const method = "POST";

    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function deleteDividend(id, latestUpdate, message) {
    const obj = {
        id: id,
        latestUpdate: latestUpdate
    };

    const endpoint = "Dividend/delete";
    const method = "POST";

    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function getDividend(id, message) {
    const endpoint = "Dividend/" + id;
    const method = "GET";

    return await getResponseReqAuthJson(endpoint, method, null, message);
}
