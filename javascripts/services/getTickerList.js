import { getApiBase } from "./apiBase.js";
import { getHeaders } from "./apiBase.js";

export async function getTickerList(message) {

    const url = getApiBase() + "/Ticker";
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders()
        });

        const data = await response.json();

         if (response.status === 200) {
            return data;
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