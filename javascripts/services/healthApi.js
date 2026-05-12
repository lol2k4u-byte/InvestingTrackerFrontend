import { getResponseReqAuth } from "./apiBase.js";

export async function getHealth() {
    const endpoint = "Health";
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, null);
}

