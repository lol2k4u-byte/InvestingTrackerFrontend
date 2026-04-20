import { createTickerCard } from "./tickerCard.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const element = {
  id: 1,
  navn: "Ericsson B",
  vaerdi: "22.462 kr",
  afkast: "+7,71%",
  idag: "-1,62%",
  seneste: "109,15 SEK"
};

const card = createTickerCard(element);
document.getElementById("tickerCard").appendChild(card);

document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("vis");
  });
});
