import { getResponse } from "./apiBase.js";

export async function getHealth() {
    const endpoint = "Health";
    const method = "GET";
    
    return await getResponse(endpoint, method, null, null, null);
}

