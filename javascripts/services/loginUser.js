import { getApiBase } from "./apiBase.js";
import { setAuthToken } from "./apiBase.js";

export async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    const url = getApiBase() + "/Login/login";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.text();

         if (response.status === 200) {
            setAuthToken(data)
            window.location.href = "./index.html";
        }else {
            message.style.color = "red";
            message.textContent = "Forkert brugernavn eller adgangskode.";
        }
    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Kan ikke kontakte serveren.";
    }
}