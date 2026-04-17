import { getApiBase } from "./apiBase.js";
import { getHeaders } from "./apiBase.js";
import { handleAuthStatus } from "./apiBase.js";

export async function getTickerList(message) {

    const url = getApiBase() + "Ticker";
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders()
        });
        
        handleAuthStatus(response);
        
        if (response.status === 200) {
            return await response.json();
        }else {
            message.style.color = "red";
            message.textContent = "Forkert brugernavn eller adgangskode.";
        }
    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Kan ikke kontakte serveren.";
    }
};
