import { getResponseReqAuthJson, getResponseReqAuthStream } from "./apiBase.js";


export async function getTickerInfo(accountId, tickerId, message) {
    let endpoint = `Ticker/info?tickerid=${tickerId}`;

    if (accountId) {
        endpoint = endpoint + `&accountid=${accountId}`;
    }

    const method = "GET";
    
    return await getResponseReqAuthJson(endpoint, method, null, message);
};

export async function getTickerList(activeOnly, message) {

    const endpoint = `Ticker?activeOnly=${activeOnly}`;
    const method = "GET";
    const obj = null;

    return await getResponseReqAuthJson(endpoint, method, obj, message);
    

};

export async function getTickerEvents(accountId, tickerId, message) {
    const endpoint = `Ticker/events?accountid=${accountId}&tickerId=${tickerId}`;
    const method = "GET";
    
    return await getResponseReqAuthJson(endpoint, method, null, message);
}

export async function getSearch(query, message) {
    const endpoint = `Ticker/search?query=${query}`;
    const method = "GET";
    
    return await getResponseReqAuthJson(endpoint, method, null, message);
}

export async function hideTicker(accountId, tickerId, hide, latestUpdate, message) {
    const endpoint = `Ticker/hide`;
    const method = "POST";

    const obj = {
        accountId: accountId,
        tickerId: tickerId,
        hide: hide,
        latestUpdate: latestUpdate
    };
    
    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function stream(items, message, callback, signal) {
    const endpoint = `Ticker/stream`;
    const method = "POST";

    const obj = items.map(getStreamItem);
    
    await getResponseReqAuthStream(endpoint, method, obj, message, callback, signal);
}

function getStreamItem(item) {
    return {
        correlationId: item.correlationId,
        accountId: item.accountId,
        tickerId: item.tickerId,
        currency: item.currency
    };
}