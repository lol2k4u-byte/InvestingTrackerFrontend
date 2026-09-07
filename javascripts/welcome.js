import { getHealth } from "./services/healthApi.js";

const health = await getHealth();
window.location.href = "./login.html";
