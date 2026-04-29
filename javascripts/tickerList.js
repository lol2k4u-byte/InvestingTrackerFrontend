import { getTickerList } from "./services/tickerApi.js";
import { createTickerCard } from "./tickerCard.js";

const elementer = await getTickerList();


const liste = document.getElementById("liste");

elementer.forEach((element) => {
  const card = createTickerCard(element);
  liste.appendChild(card);
});
