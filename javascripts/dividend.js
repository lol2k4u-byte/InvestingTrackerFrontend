import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getDate, getString } from "./form.js";
import { loadAccounts } from "./accountDropdown.js";
import { getDividend, createDividend, updateDividend, deleteDividend } from "./services/dividendApi.js";
import { loadExchangeRateInfoFormElement, getExchangeRateInfo, getExchangeRateInfoObject } from "./exchangeRateInfo.js";
import { getCurrencyPairs } from "./currencyPairs.js";
import { appendCurrencyOptions } from "./currencyDatalist.js"

const elements = loadElements();
const parm = loadParm();
let exchangeRateInfoElements = null;
const dividend = await loadForm();
elements.dividendCurrencyElem.addEventListener("change", dividendCurrencyChanged);
appendCurrencyOptions(elements.currencyDatalistElem, parm.currency);
loadTitleContainer();
await loadAccountDropdown();

document
    .getElementById("dividendForm")
    .addEventListener("submit", submitDividend);

function loadElements() {
    return {
        currencyDatalistElem: document.getElementById("currencyDatalist"),
        accountIdElem: document.getElementById("accountId"),
        accountIdContainerElem: document.getElementById("accountIdContainer"),
        dateElem: document.getElementById("date"),
        numberOfSharesElem: document.getElementById("numberOfShares"),
        dividendValueElem: document.getElementById("dividendValue"),
        dividendCurrencyElem: document.getElementById("dividendCurrency"),
        dividendExchangeRateInfoElem: document.getElementById("dividendExchangeRateInfo"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer")
    };
}

function loadTitleContainer() {
    const onDelete = (dividend === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Dividend", onDelete));
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
        currency: params.get("currency"),
    };
}

function loadExchangeRateInfo() {
    elements.dividendExchangeRateInfoElem.replaceChildren();

    const fromCurrencies = getFromCurrencies();
    const currencyPairMap = getCurrencyPairs(parm.currency, fromCurrencies);

    const elemList = [];

    currencyPairMap.forEach(currencyPair => {
        const elemObject = getExchangeRateInfo(currencyPair);
        elements.dividendExchangeRateInfoElem.appendChild(elemObject.mainDiv);
        elemList.push(elemObject);
    });

    return elemList;
}

function getFromCurrencies() {
    const fromCurrencies = [];

    if (elements.dividendCurrencyElem.value != "") {
        fromCurrencies.push(elements.dividendCurrencyElem.value);
    }

    return fromCurrencies;
}

function dividendCurrencyChanged() {
    exchangeRateInfoElements = loadExchangeRateInfo();
}

async function onClickDelete() {
    return await deleteDividend(dividend.id, dividend.latestUpdate, elements.messageElem);
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const dividendResponse = await getDividend(parm.id);
        const dividend = dividendResponse.dividend;
        
        elements.dateElem.value = dividend.date;
        elements.numberOfSharesElem.value = dividend.numberOfShares;
        elements.dividendValueElem.value = dividend.dividendValue;
        elements.dividendCurrencyElem.value = dividend.dividendCurrency;
        loadExchangeRateInfoForm(dividendResponse.exchangeRateInfos);
        return dividend;
    } else {
        return null;
    }
}

function loadExchangeRateInfoForm(exchangeRateInfos) {
    exchangeRateInfoElements = [];

    exchangeRateInfos.forEach(exchangeRateInfo => {
        const exchangeRateInfoElement = loadExchangeRateInfoFormElement(exchangeRateInfo);
        elements.dividendExchangeRateInfoElem.appendChild(exchangeRateInfoElement.mainDiv);
        exchangeRateInfoElements.push(exchangeRateInfoElement);
    }); 
}

async function submitDividend(event) {
    event.preventDefault();

    elements.messageElem.textContent = "";

    const date = getDate(elements.dateElem);
    const numberOfShares = getInt(elements.numberOfSharesElem);
    const dividendValue = getDecimal(elements.dividendValueElem);
    const dividendCurrency = getString(elements.dividendCurrencyElem);
    const accountId = parm.accountId ?? getInt(elements.accountIdElem);

    if (isValid(accountId, date, numberOfShares, dividendValue, dividendCurrency)) {
        await saveDividend(accountId, date, numberOfShares, dividendValue, dividendCurrency);
        window.location.href = `ticker.html?symbol=${parm.symbol}&accountid=${accountId}`;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveDividend(accountId, date, numberOfShares, dividendValue, dividendCurrency) {
    const exchangeRateInfos = getExchangeRateInfos();

    if (dividend === null) {
        return await createDividend(
            accountId,
            parm.symbol,
            date,
            numberOfShares,
            dividendValue,
            dividendCurrency,
            exchangeRateInfos,
            elements.messageElem
        );
    } else {
        return await updateDividend(
            dividend.id,
            dividend.accountId,
            dividend.symbol,
            date,
            numberOfShares,
            dividendValue,
            dividendCurrency,
            exchangeRateInfos,
            dividend.latestUpdate,
            elements.messageElem
        );
    }
}

function getExchangeRateInfos() {
    const exchangeRateInfos = [];

    exchangeRateInfoElements.forEach(elem => {
        exchangeRateInfos.push(getExchangeRateInfoObject(elem));
    });

    return exchangeRateInfos;
}

function isValid(accountId, date, numberOfShares, dividendValue, dividendCurrency) {
    if (accountId === null) {
        return false;
    }

    if (date === null) {
        return false;
    }

    if (numberOfShares === null) {
        return false;
    }

    if (dividendValue === null) {
        return false;
    }

    if (dividendCurrency === null) {
        return false;
    }

    return true;
}
