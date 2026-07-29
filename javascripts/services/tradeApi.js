import { getResponseReqAuth } from "./apiBase.js";

export async function createTrade(accountId, symbol, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency, exchangeRateInfos, message) {
    const obj = {
        accountId: accountId,
        symbol: symbol,
        date: date,
        buySellType: buySellType,
        numberOfShares: numberOfShares,
        sharePrice: sharePrice,
        sharePriceCurrency: sharePriceCurrency,
        costs: costs,
        costsCurrency: costsCurrency,
        exchangeRateInfos: exchangeRateInfos
    };

    const endpoint = "Trade/create";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function updateTrade(id, accountId, symbol, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency, exchangeRateInfos, latestUpdate, message) {
    const obj = {
        id: id,
        accountId: accountId,
        symbol: symbol,
        date: date,
        buySellType: buySellType,
        numberOfShares: numberOfShares,
        sharePrice: sharePrice,
        sharePriceCurrency: sharePriceCurrency,
        costs: costs,
        costsCurrency: costsCurrency,
        exchangeRateInfos: exchangeRateInfos,
        latestUpdate: latestUpdate
    };

    const endpoint = "Trade/update";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function deleteTrade(id, latestUpdate, message) {
    const obj = {
        id: id,
        latestUpdate: latestUpdate
    };

    const endpoint = "Trade/delete";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function getTrade(id, message) {
    const endpoint = "Trade/" + id;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
}

