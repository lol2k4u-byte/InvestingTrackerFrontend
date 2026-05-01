import { getResponseReqAuth } from "./apiBase.js";

export async function getAccounts(message) {

    const endpoint = "Account";
    const method = "GET";

    return await getResponseReqAuth(endpoint, method, null, message);
}
