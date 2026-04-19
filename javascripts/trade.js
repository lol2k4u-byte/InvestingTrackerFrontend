import { getInt, getDecimal, getEnum, getDate } from "./form.js";
import { getTrade, createTrade } from "./services/tradeApi.js";

const dateElem = document.getElementById("date");
const buySellTypeElem = document.getElementById("buySellType");
const numberOfSharesElem = document.getElementById("numberOfShares");
const sharePriceElem = document.getElementById("sharePrice");
const costsElem = document.getElementById("costs");

dateElem.value = new Date().toISOString().split("T")[0];

const parm = loadParm();
const trade = await loadForm();

document
    .getElementById("tradeForm")
    .addEventListener("submit", submitTrade);

const message = document.getElementById("message");

function loadParm() {
    const params = new URLSearchParams(window.location.search);

    return {
        id: params.get("id"),
        accountId: params.get("accountId"),
        symbol: params.get("symbol"),
    };
}

async function loadForm() {
    if (parm.id != null) {
        const trade = await getTrade(parm.id);
        dateElem.value = trade.date;
        buySellTypeElem.value = trade.buySellType;
        numberOfSharesElem.value = trade.numberOfShares;
        sharePriceElem.value = trade.sharePrice;
        costsElem.value = trade.costs;
        return trade;
    }
}

async function submitTrade(event) {
    event.preventDefault();

    message.textContent = "";

    const date = getDate(dateElem);
    const buySellType = getEnum(buySellTypeElem);
    const numberOfShares = getInt(numberOfSharesElem);
    const sharePrice = getDecimal(sharePriceElem);
    const costs = getDecimal(costsElem);

    if (isValid(date, buySellType, numberOfShares, sharePrice, costs)) {
        const json = await createTrade(date, buySellType, numberOfShares, sharePrice, costs, message);
    } else {
        message.textContent = "Fejl i input";
    }
}

function isValid(date, buySellType, numberOfShares, sharePrice, costs) {
    if (date === null) {
        return false;
    }

    if (buySellType === null) {
        return false;
    }

    if (numberOfShares === null) {
        return false;
    }

    if (sharePrice === null) {
        return false;
    }

    if (costs === null) {
        return false;
    }

    return true;
}