import { getResponseReqAuthJson } from "./apiBase.js";

export async function getStockBrokers(message) {

    const endpoint = "StockBroker";
    const method = "GET";

    return await getResponseReqAuthJson(endpoint, method, null, message);
}
