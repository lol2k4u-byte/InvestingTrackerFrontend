import { getResponseReqAuth } from "./apiBase.js";

export async function createDividend(accountId, symbol, date, numberOfShares, dividendValue, message) {
    const obj = {
        accountId: accountId,
        symbol: symbol,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue
    };

    const endpoint = "Dividend/create";
    const method = "POST";

    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function updateDividend(id, accountId, symbol, date, numberOfShares, dividendValue, latestUpdate, message) {
    const obj = {
        id: id,
        accountId: accountId,
        symbol: symbol,
        date: date,
        numberOfShares: numberOfShares,
        dividendValue: dividendValue,
        latestUpdate: latestUpdate
    };

    const endpoint = "Dividend/update";
    const method = "POST";

    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function deleteDividend(id, latestUpdate, message) {
    const obj = {
        id: id,
        latestUpdate: latestUpdate
    };

    const endpoint = "Dividend/delete";
    const method = "POST";

    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function getDividend(id, message) {
    const endpoint = "Dividend/" + id;
    const method = "GET";

    return await getResponseReqAuth(endpoint, method, null, message);
}
