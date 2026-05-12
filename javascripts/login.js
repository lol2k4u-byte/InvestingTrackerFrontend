import { loginUser } from "./services/loginUser.js";
import { getHealth } from "./services/healthApi.js";

const health = await getHealth();
document.getElementById("connectedDiv").classList.add("show");

document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

