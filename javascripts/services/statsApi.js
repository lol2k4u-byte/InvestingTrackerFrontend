import { getResponseReqAuthJson } from "./apiBase.js";

export async function getStats(accountId, message) {

    const endpoint = "Stats/" + accountId;
    const method = "GET";

    return await getResponseReqAuthJson(endpoint, method, null, message);
}
