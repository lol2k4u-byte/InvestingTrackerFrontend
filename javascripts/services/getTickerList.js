import { getResponseReqAuth } from "./apiBase.js";


export async function getTickerList(message) {

    const endpoint = "Ticker";
    const method = "GET";
    const obj = null;

    return await getResponseReqAuth(endpoint, method, obj, message);
    

};
