import { getResponseReqAuthJson } from "./apiBase.js";

export async function getStockBrokerAccounts(message) {

    const endpoint = "StockBrokerAccount";
    const method = "GET";

    return await getResponseReqAuthJson(endpoint, method, null, message);
}
