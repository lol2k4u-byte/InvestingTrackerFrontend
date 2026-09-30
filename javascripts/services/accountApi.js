import { getResponseReqAuthJson } from "./apiBase.js";

export async function getAccounts(message) {

    const endpoint = "Account";
    const method = "GET";

    return await getResponseReqAuthJson(endpoint, method, null, message);
}
