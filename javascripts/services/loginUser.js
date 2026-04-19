import { getResponse, setToken } from "./apiBase.js";

export async function loginUser(event) {
    event.preventDefault();

    const obj = {
        username: document.getElementById("username").value,
        password:  document.getElementById("password").value
    };
    
    const message = document.getElementById("message");

    const endpoint = "Login/login";
    const method = "POST";
    const response = await getResponse(endpoint, method, null, obj, message);

    if (response.status === 200) {
        const token = await response.text();
        setToken(token)
        window.location.href = "./index.html";
    } else {
        message.textContent = "Forkert brugernavn eller adgangskode";
    }
}
