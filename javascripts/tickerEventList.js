import { createTradeCard } from "./tradeCard.js";
import { createOptionCard } from "./optionCard.js";
import { createDividendCard } from "./dividendCard.js";

const eventList = document.getElementById("eventList");

const tradeElements = [
  {
    id: 1,
    date: "15.04.2025",
    type: "Køb",
    count: "100",
    price: "1,50 SEK",
    total: "150,00 SEK"
  },
  {
    id: 2,
    date: "15.04.2026",
    type: "Salg",
    count: "300",
    price: "1,00 SEK",
    total: "300,00 SEK"
  }
];

tradeElements.forEach((element) => {
  const tradeCard = createTradeCard(element);
  eventList.appendChild(tradeCard);
});

const optionElements = [
  {
    id: 1,
    date: "15.04.2025",
    count: "300",
    price: "3,00 SEK",
    total: "900,00 SEK",
    type: "Salg købsoption",
    strike: "104,00",
    expireDate: "15.06.2025",
    itm: "Nej"
  }
];

optionElements.forEach((element) => {
  const optionElement = createOptionCard(element);
  eventList.appendChild(optionElement);
});

const dividendElements = [
  {
    id: 1,
    date: "15.04.2025",
    count: "100",
    price: "1,50 SEK",
    total: "150,00 SEK"
  },
  {
    id: 2,
    date: "15.04.2026",
    count: "300",
    price: "1,00 SEK",
    total: "300,00 SEK"
  }
];

dividendElements.forEach((element) => {
  const dividendCard = createDividendCard(element);
  eventList.appendChild(dividendCard);
});
