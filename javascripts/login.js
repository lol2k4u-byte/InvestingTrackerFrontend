import { loginUser } from "./services/loginUser.js";

document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

