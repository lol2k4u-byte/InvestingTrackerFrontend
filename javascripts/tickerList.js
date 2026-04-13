import { createTickerCard } from "./tickerCard.js";

const elementer = [
  {
	id: 1,
    navn: "Ericsson B",
    logo: "E",
    vaerdi: "22.462 kr",
    afkast: "+7,71%",
    idag: "-1,62%",
    seneste: "109,15 SEK"
  },
  {
	id: 2,
    navn: "Novo Nordisk",
    logo: "N",
    vaerdi: "18.940 kr",
    afkast: "+4,12%",
    idag: "+0,84%",
    seneste: "725,40 DKK"
  }
];

const liste = document.getElementById("liste");

elementer.forEach((element) => {
  const card = createTickerCard(element);
  liste.appendChild(card);
});

document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("vis");
  });
});
