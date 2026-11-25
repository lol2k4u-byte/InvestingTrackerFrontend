import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate, getString } from "./form.js";
import { loadStockBrokerAccounts, getAccountId } from "./stockBrokerDropdown.js";
import { getTrade, createTrade, updateTrade, deleteTrade } from "./services/tradeApi.js";
import { loadExchangeRateInfoFormElement, getExchangeRateInfo, getExchangeRateInfoObject } from "./exchangeRateInfo.js";
import { getCurrencyPairs } from "./currencyPairs.js";
import { appendCurrencyOptions } from "./currencyDatalist.js"


const elements = loadElements();
await loadStockBrokerAccounts(elements.stockBrokerAccountIdElem, elements.messageElem);
const parm = loadParm();
let exchangeRateInfoElements = null;
const trade = await loadForm();
const tickerId = getTickerId();
elements.sharePriceCurrencyElem.addEventListener("change", currencyChanged);
elements.costsCurrencyElem.addEventListener("change", currencyChanged);
appendCurrencyOptions(elements.currencyDatalistElem, parm.currency);
loadTitleContainer();


document
    .getElementById("tradeForm")
    .addEventListener("submit", submitTrade);

function loadElements() {
    return {
        currencyDatalistElem: document.getElementById("currencyDatalist"),
        stockBrokerAccountIdElem: document.getElementById("stockBrokerAccountId"),
        dateElem: document.getElementById("date"),
        buySellTypeElem: document.getElementById("buySellType"),
        numberOfSharesElem: document.getElementById("numberOfShares"),
        sharePriceElem: document.getElementById("sharePrice"),
        sharePriceCurrencyElem: document.getElementById("sharePriceCurrency"),
        costsElem: document.getElementById("costs"),
        costsCurrencyElem: document.getElementById("costsCurrency"),
        tradeExchangeRateInfoElem: document.getElementById("tradeExchangeRateInfo"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer")
    };
}

function loadTitleContainer() {

    const onDelete = (trade === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Trade", onDelete));
}

function loadParm() {
    const params = new URLSearchParams(window.location.search);

    return {
        id: params.get("id"),
        tickerId: params.get("tickerid"),
        currency: params.get("currency"),
    };
}

function loadExchangeRateInfo() {
    elements.tradeExchangeRateInfoElem.replaceChildren();

    const fromCurrencies = getFromCurrencies();
    const currencyPairMap = getCurrencyPairs(parm.currency, fromCurrencies);

    const elemList = [];

    currencyPairMap.forEach(currencyPair => {
        const elemObject = getExchangeRateInfo(currencyPair);
        elements.tradeExchangeRateInfoElem.appendChild(elemObject.mainDiv);
        elemList.push(elemObject);
    });

    return elemList;
}

function getFromCurrencies() {
    const fromCurrencies = [];

    if (elements.sharePriceCurrencyElem.value != "") {
        fromCurrencies.push(elements.sharePriceCurrencyElem.value);
    }
    if (elements.costsCurrencyElem.value != "") {
        fromCurrencies.push(elements.costsCurrencyElem.value);
    }

    return fromCurrencies;
}

function currencyChanged() {
    exchangeRateInfoElements = loadExchangeRateInfo();
}

async function onClickDelete() {
    return await deleteTrade(trade.id, trade.latestUpdate, elements.messageElem);
}

function getTickerId() {
    if (trade != null) {
        return trade.tickerId;
    } else {
        return parm.tickerId;
    }
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const tradeResponse = await getTrade(parm.id);
        const trade = tradeResponse.trade;

        elements.dateElem.value = trade.date;
        elements.buySellTypeElem.value = trade.buySellType;
        elements.numberOfSharesElem.value = trade.numberOfShares;
        elements.sharePriceElem.value = trade.sharePrice;
        elements.sharePriceCurrencyElem.value = trade.sharePriceCurrency;
        elements.costsElem.value = trade.costs;
        elements.costsCurrencyElem.value = trade.costsCurrency;
        elements.stockBrokerAccountIdElem.value = trade.stockBrokerAccountId;
        loadExchangeRateInfoForm(tradeResponse.exchangeRateInfos);
        return trade;
    } else {
        return null;
    }
}

function loadExchangeRateInfoForm(exchangeRateInfos) {
    exchangeRateInfoElements = [];

    exchangeRateInfos.forEach(exchangeRateInfo => {
        const exchangeRateInfoElement = loadExchangeRateInfoFormElement(exchangeRateInfo);
        elements.tradeExchangeRateInfoElem.appendChild(exchangeRateInfoElement.mainDiv);
        exchangeRateInfoElements.push(exchangeRateInfoElement);
    });
}

async function submitTrade(event) {
    event.preventDefault();

    elements.messageElem.textContent = "";

    const date = getDate(elements.dateElem);
    const buySellType = getEnum(elements.buySellTypeElem);
    const numberOfShares = getDecimal(elements.numberOfSharesElem);
    const sharePrice = getDecimal(elements.sharePriceElem);
    const sharePriceCurrency = getString(elements.sharePriceCurrencyElem);
    const costs = getDecimal(elements.costsElem);
    const costsCurrency = getString(elements.costsCurrencyElem);
    const stockBrokerAccountId = getInt(elements.stockBrokerAccountIdElem);

    if (isValid(stockBrokerAccountId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency)) {
        const response = await saveTrade(stockBrokerAccountId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency);
        
        const accountid = getAccountId(stockBrokerAccountId);
        window.location.href = `ticker.html?tickerid=${tickerId}&accountid=${accountid}`;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveTrade(stockBrokerAccountId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency) {
    const exchangeRateInfos = getExchangeRateInfos();

    if (trade === null) {
        return await createTrade(stockBrokerAccountId, parm.tickerId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency, exchangeRateInfos, elements.messageElem);
    } else {
        return await updateTrade(trade.id, stockBrokerAccountId, trade.tickerId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency, exchangeRateInfos, trade.latestUpdate, elements.messageElem);
    }
}

function getExchangeRateInfos() {
    if (exchangeRateInfoElements === null) {
        return null;
    }

    const exchangeRateInfos = [];

    exchangeRateInfoElements.forEach(elem => {
        exchangeRateInfos.push(getExchangeRateInfoObject(elem));
    });

    return exchangeRateInfos;
}


function isValid(stockBrokerAccountId, date, buySellType, numberOfShares, sharePrice, sharePriceCurrency, costs, costsCurrency) {
    if (stockBrokerAccountId === null) {
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

    if (sharePriceCurrency === null) {
        return false;
    }

    if (costs === null) {
        return false;
    }

    if (costsCurrency === null) {
        return false;
    }

    return true;
}
