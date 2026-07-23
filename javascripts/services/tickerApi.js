import { getResponseReqAuth } from "./apiBase.js";


export async function getTickerInfo(accountId, symbol, message) {
    let endpoint = `Ticker/info?symbol=${symbol}`;

    if (accountId) {
        endpoint = endpoint + `&accountid=${accountId}`;
    }

    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
};

export async function getTickerList(activeOnly, message) {

    const endpoint = `Ticker?activeOnly=${activeOnly}`;
    const method = "GET";
    const obj = null;

    return await getResponseReqAuth(endpoint, method, obj, message);
    

};

export async function getTickerEvents(accountId, symbol, message) {
    const endpoint = `Ticker/events?accountid=${accountId}&symbol=${symbol}`;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
}

export async function getSearch(query, message) {
    const endpoint = `Ticker/search?query=${query}`;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
}

export async function hideTicker(accountId, symbol, hide, latestUpdate, message) {
    const endpoint = `Ticker/hide`;
    const method = "POST";

    const obj = {
        accountId: accountId,
        symbol: symbol,
        hide: hide,
        latestUpdate: latestUpdate
    };
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}