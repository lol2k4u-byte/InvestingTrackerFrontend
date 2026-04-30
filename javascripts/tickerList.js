import { getTickerList } from "./services/tickerApi.js";
import { createTickerCard } from "./tickerCard.js";

const elementer = await getTickerList();


const liste = document.getElementById("liste");
let accountId = null;
let accountDiv = null;
let accountList = null;

elementer.forEach((element) => {
  createAccountDiv(element);
  const card = createTickerCard(element);
  accountList.appendChild(card);
});

function createAccountDiv(element) {
  if (element.accountId != accountId) {
    accountList  = document.createElement("div");

    accountId = element.accountId;
    accountDiv = document.createElement("div");
    accountDiv.className = "accountList";
    accountDiv.append(getAccountHeader(element, accountList));

    accountList.className = "accountList";
    accountDiv.appendChild(accountList);

    liste.appendChild(accountDiv);
  }

  return accountDiv;
}

function getAccountHeader(element, list) {
  const header = document.createElement("div");
  header.className = "accountHeader pointer";

  const name = document.createElement("h1");
  name.textContent = element.accountName ;
  header.appendChild(name);

  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.textContent = "▼";
  header.appendChild(arrow);

  header.addEventListener("click", () => { 
    arrow.classList.toggle("close"); 
    list.classList.toggle("hidden");
  });

  return header;
}