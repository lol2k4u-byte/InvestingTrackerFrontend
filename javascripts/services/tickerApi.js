import { getResponseReqAuth } from "./apiBase.js";


export async function getTickerInfo(accountId, symbol, message) {
    const endpoint = `Ticker/info?accountid=${accountId}&symbol=${symbol}`;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
};

export async function getTickerList(message) {

    const endpoint = "Ticker";
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