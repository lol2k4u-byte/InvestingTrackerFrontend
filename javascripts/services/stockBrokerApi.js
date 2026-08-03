import { getResponseReqAuth } from "./apiBase.js";

export async function getStockBrokers(message) {

    const endpoint = "StockBroker";
    const method = "GET";

    return await getResponseReqAuth(endpoint, method, null, message);
}
