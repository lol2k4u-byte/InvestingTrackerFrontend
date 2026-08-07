import { getResponseReqAuth } from "./apiBase.js";

export async function getStats(accountId, message) {

    const endpoint = "Stats/" + accountId;
    const method = "GET";

    return await getResponseReqAuth(endpoint, method, null, message);
}
