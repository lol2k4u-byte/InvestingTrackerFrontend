import { loginUser } from "./services/loginUser.js";
import { getHealth } from "./services/healthApi.js";

const health = await getHealth();
document.getElementById("loginButton").disabled = false;

document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

