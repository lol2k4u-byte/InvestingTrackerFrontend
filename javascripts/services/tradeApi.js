import { getResponseReqAuth } from "./apiBase.js";

export async function createTrade(date, buySellType, numberOfShares, sharePrice, costs, message) {
    const obj = {
        date: date,
        buySellType: buySellType,
        numberOfShares: numberOfShares,
        sharePrice: sharePrice,
        costs: costs
    }

    const endpoint = "Trade/create";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function getTrade(id, message) {
    const endpoint = "Trade/" + id;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
}

