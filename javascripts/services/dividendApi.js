import { getResponseReqAuthJson } from "./apiBase.js";

export async function createDividend(accountId, tickerId, date, numberOfShares, dividendValue, dividendCurrency, stockBrokerName, exchangeRateInfos, message) {
    const obj = {
        accountId: accountId,
        tickerId: tickerId,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue,
        dividendCurrency: dividendCurrency,
        stockBrokerName: stockBrokerName,
        exchangeRateInfos: exchangeRateInfos
    };

    const endpoint = "Dividend/create";
    const method = "POST";

    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function updateDividend(id, accountId, tickerId, date, numberOfShares, dividendValue, dividendCurrency, stockBrokerName, exchangeRateInfos, latestUpdate, message) {
    const obj = {
        id: id,
        accountId: accountId,
        tickerId: tickerId,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue,
        dividendCurrency: dividendCurrency,
        stockBrokerName: stockBrokerName,
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
