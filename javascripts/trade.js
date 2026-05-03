import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate } from "./form.js";
import { loadAccounts } from "./accountDropdown.js";
import { getTrade, createTrade, updateTrade, deleteTrade } from "./services/tradeApi.js";


const elements = loadElements();
const parm = loadParm();
const trade = await loadForm();
loadTitleContainer();
await loadAccountDropdown();

document
    .getElementById("tradeForm")
    .addEventListener("submit", submitTrade);

function loadElements() {
    return {
        accountIdElem: document.getElementById("accountId"),
        accountIdContainerElem: document.getElementById("accountIdContainer"),
        dateElem: document.getElementById("date"),
        buySellTypeElem: document.getElementById("buySellType"),
        numberOfSharesElem: document.getElementById("numberOfShares"),
        sharePriceElem: document.getElementById("sharePrice"),
        costsElem: document.getElementById("costs"),
        costsExchangeRateElem: document.getElementById("costsExchangeRate"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer")
    };
}

function loadTitleContainer() {

    const onDelete = (trade === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Trade", onDelete));
}

async function loadAccountDropdown() {
    if (parm.accountId === null) {
        await loadAccounts(elements.accountIdElem, elements.messageElem);
        elements.accountIdElem.required = true;
    } else {
        elements.accountIdContainerElem.classList.add("displayNone");
    }
}

function loadParm() {
    const params = new URLSearchParams(window.location.search);
    
    return {
        id: params.get("id"),
        accountId: params.get("accountid"),
        symbol: params.get("symbol"),
    };
}

async function onClickDelete() {
    return await deleteTrade(trade.id, trade.latestUpdate, elements.messageElem);
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const trade = await getTrade(parm.id);
        elements.dateElem.value = trade.date;
        elements.buySellTypeElem.value = trade.buySellType;
        elements.numberOfSharesElem.value = trade.numberOfShares;
        elements.sharePriceElem.value = trade.sharePrice;
        elements.costsElem.value = trade.costs;
        elements.costsExchangeRateElem.value = 1;
        return trade;
    } else {
        return null;
    }
}

async function submitTrade(event) {
    event.preventDefault();

    elements.messageElem.textContent = "";

    const date = getDate(elements.dateElem);
    const buySellType = getEnum(elements.buySellTypeElem);
    const numberOfShares = getInt(elements.numberOfSharesElem);
    const sharePrice = getDecimal(elements.sharePriceElem);
    const costs = getDecimal(elements.costsElem);
    const costsExchangeRate = getDecimal(elements.costsExchangeRateElem);
    const accountId = parm.accountId ?? getInt(elements.accountIdElem);

    if (isValid(accountId, date, buySellType, numberOfShares, sharePrice, costs, costsExchangeRate)) {
        const response = await saveTrade(accountId, date, buySellType, numberOfShares, sharePrice, costs, costsExchangeRate);
        window.location.href = `ticker.html?symbol=${parm.symbol}&${accountId}`;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveTrade(accountId, date, buySellType, numberOfShares, sharePrice, costs, costsExchangeRate) {
    const costsInTickerCurrency = costs / costsExchangeRate;
    if (trade === null) {
        return await createTrade(accountId, parm.symbol, date, buySellType, numberOfShares, sharePrice, costsInTickerCurrency, elements.messageElem);
    } else {
        return await updateTrade(trade.id, trade.accountId, trade.symbol, date, buySellType, numberOfShares, sharePrice, costsInTickerCurrency, trade.latestUpdate, elements.messageElem);
    }
}


function isValid(accountId, date, buySellType, numberOfShares, sharePrice, costs, costsExchangeRate) {
    if (accountId === null) {
        return false;
    }

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

    if (costsExchangeRate === null) {
        return false;
    }

    return true;
}
