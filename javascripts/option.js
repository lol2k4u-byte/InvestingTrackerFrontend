import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate, getString } from "./form.js";
import { loadAccounts } from "./accountDropdown.js";
import { loadStockBrokers } from "./stockBrokerDropdown.js";
import { getOption, createOption, updateOption, deleteOption } from "./services/optionApi.js";
import { loadExchangeRateInfoFormElement, getExchangeRateInfo, getExchangeRateInfoObject } from "./exchangeRateInfo.js";
import { getCurrencyPairs } from "./currencyPairs.js";
import { appendCurrencyOptions } from "./currencyDatalist.js"


const elements = loadElements();
const parm = loadParm();
let exchangeRateInfoElements = null;
let exerciseExchangeRateInfoElements = null;
await loadAccountDropdown();
await loadStockBrokerDropdown();
const optionData = await loadForm();
elements.premiumPriceCurrencyElem.addEventListener("change", optionCurrencyChanged);
elements.strikePriceCurrencyElem.addEventListener("change", exerciseCurrencyChanged);
elements.costsCurrencyElem.addEventListener("change", optionCurrencyChanged);
elements.exerciseCostsCurrencyElem.addEventListener("change", exerciseCurrencyChanged);
appendCurrencyOptions(elements.currencyDatalistElem, parm.currency);
loadTitleContainer();


elements.isExercisedElem.addEventListener("change", isExercisedChanged);

document
    .getElementById("optionForm")
    .addEventListener("submit", submitOption);

function loadElements() {
    return {
        currencyDatalistElem: document.getElementById("currencyDatalist"),
        accountIdElem: document.getElementById("accountId"),
        accountIdContainerElem: document.getElementById("accountIdContainer"),
        stockBrokerNameElem: document.getElementById("stockBrokerName"),
        dateElem: document.getElementById("date"),
        callPutTypeElem: document.getElementById("callPutType"),
        longShortTypeElem: document.getElementById("longShortType"),
        numberOfContractsElem: document.getElementById("numberOfContracts"),
        numberOfSharesPerContractElem: document.getElementById("numberOfSharesPerContract"),
        premiumPriceElem: document.getElementById("premiumPrice"),
        premiumPriceCurrencyElem: document.getElementById("premiumPriceCurrency"),
        strikePriceElem: document.getElementById("strikePrice"),
        strikePriceCurrencyElem: document.getElementById("strikePriceCurrency"),
        expireDateElem: document.getElementById("expireDate"),
        costsElem: document.getElementById("costs"),
        costsCurrencyElem: document.getElementById("costsCurrency"),
        isExercisedElem: document.getElementById("isExercised"),
        exerciseDateElem: document.getElementById("exerciseDate"),
        exerciseCostsElem: document.getElementById("exerciseCosts"),
        exerciseCostsCurrencyElem: document.getElementById("exerciseCostsCurrency"),
        optionExchangeRateInfoElem: document.getElementById("optionExchangeRateInfo"),
        exerciseExchangeRateInfoElem: document.getElementById("exerciseExchangeRateInfo"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer"),
        ExercisedContainer: document.getElementById("ExercisedContainer")
    };
}

function loadTitleContainer() {

    const onDelete = (optionData === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Option", onDelete));
}

async function loadAccountDropdown() {
    if (parm.accountId === null) {
        await loadAccounts(elements.accountIdElem, elements.messageElem);
        elements.accountIdElem.required = true;
    } else {
        elements.accountIdContainerElem.classList.add("displayNone");
    }
}

async function loadStockBrokerDropdown() {
    await loadStockBrokers(elements.stockBrokerNameElem, elements.messageElem);
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

function loadExchangeRateInfoOption() {
    const fromCurrencies = getFromCurrenciesOption();
    return loadExchangeRateInfo(elements.optionExchangeRateInfoElem, fromCurrencies);
}

function loadExchangeRateInfoExercise() {
    const fromCurrencies = getFromCurrenciesExercise();
    return loadExchangeRateInfo(elements.exerciseExchangeRateInfoElem, fromCurrencies);
}

function loadExchangeRateInfo(element, fromCurrencies) {
    element.replaceChildren();

    const currencyPairMap = getCurrencyPairs(parm.currency, fromCurrencies);

    const elemList = [];

    currencyPairMap.forEach(currencyPair => {
        const elemObject = getExchangeRateInfo(currencyPair);
        element.appendChild(elemObject.mainDiv);
        elemList.push(elemObject);
    });

    return elemList;
}

function getFromCurrenciesOption() {
    const fromCurrencies = [];

    if (elements.premiumPriceCurrencyElem.value != "") {
        fromCurrencies.push(elements.premiumPriceCurrencyElem.value);
    }
    if (elements.costsCurrencyElem.value != "") {
        fromCurrencies.push(elements.costsCurrencyElem.value);
    }

    return fromCurrencies;
}

function getFromCurrenciesExercise() {
    const fromCurrencies = [];

    if (elements.strikePriceCurrencyElem.value != "") {
        fromCurrencies.push(elements.strikePriceCurrencyElem.value);
    }
    if (elements.exerciseCostsCurrencyElem.value != "") {
        fromCurrencies.push(elements.exerciseCostsCurrencyElem.value);
    }

    return fromCurrencies;
}

function optionCurrencyChanged() {
    exchangeRateInfoElements = loadExchangeRateInfoOption();
}

function exerciseCurrencyChanged() {
    exerciseExchangeRateInfoElements = loadExchangeRateInfoExercise();
}

function isExercisedChanged() {
    const inputs = elements.ExercisedContainer.querySelectorAll("input");
    inputs.forEach(input => { input.required = elements.isExercisedElem.checked; });

    if (elements.isExercisedElem.checked) {
        elements.ExercisedContainer.classList.remove("displayNone");

    } else {
        elements.ExercisedContainer.classList.add("displayNone");
    }
}

async function onClickDelete() {
    return await deleteOption(optionData.option.id, optionData.option.latestUpdate, elements.messageElem);
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const optionData = await getOption(parm.id);
        elements.dateElem.value = optionData.option.date;
        elements.callPutTypeElem.value = optionData.option.callPutType;
        elements.longShortTypeElem.value = optionData.option.longShortType;
        elements.numberOfContractsElem.value = optionData.option.numberOfContracts;
        elements.numberOfSharesPerContractElem.value = optionData.option.numberOfSharesPerContract;
        elements.premiumPriceElem.value = optionData.option.premiumPrice;
        elements.premiumPriceCurrencyElem.value = optionData.option.premiumPriceCurrency;
        elements.strikePriceElem.value = optionData.option.strikePrice;
        elements.strikePriceCurrencyElem.value = optionData.option.strikePriceCurrency;
        elements.expireDateElem.value = optionData.option.expireDate;
        elements.costsElem.value = optionData.option.costs;
        elements.costsCurrencyElem.value = optionData.option.costsCurrency;
        elements.stockBrokerNameElem.value = optionData.option.stockBrokerName;
        elements.isExercisedElem.checked = optionData.option.isExercised;
        if (optionData.option.isExercised) {
            elements.exerciseDateElem.value = optionData.optionExercise.date;
            elements.exerciseCostsElem.value = optionData.optionExercise.costs;
            elements.exerciseCostsCurrencyElem.value = optionData.optionExercise.costsCurrency;
            isExercisedChanged();
        }
        exchangeRateInfoElements = loadExchangeRateInfoForm(elements.optionExchangeRateInfoElem, optionData.exchangeRateInfos);
        exerciseExchangeRateInfoElements = loadExchangeRateInfoForm(elements.exerciseExchangeRateInfoElem, optionData.exerciseExchangeRateInfos);
        return optionData;
    } else {
        return null;
    }
}

function loadExchangeRateInfoForm(element, exchangeRateInfos) {
    if (exchangeRateInfos === null) {
        return;
    }
    
    const elementList = [];

    exchangeRateInfos.forEach(exchangeRateInfo => {
        const exchangeRateInfoElement = loadExchangeRateInfoFormElement(exchangeRateInfo);
        element.appendChild(exchangeRateInfoElement.mainDiv);
        elementList.push(exchangeRateInfoElement);
    }); 

    return elementList;
}

async function submitOption(event) {
    event.preventDefault();

    elements.messageElem.textContent = "";

    const date = getDate(elements.dateElem);
    const callPutType = getEnum(elements.callPutTypeElem, 0, 1);
    const longShortType = getEnum(elements.longShortTypeElem, 0, 1);
    const numberOfContracts = getInt(elements.numberOfContractsElem);
    const numberOfSharesPerContract = getInt(elements.numberOfSharesPerContractElem);
    const premiumPrice = getDecimal(elements.premiumPriceElem);
    const premiumPriceCurrency = getString(elements.premiumPriceCurrencyElem);
    const strikePrice = getDecimal(elements.strikePriceElem);
    const strikePriceCurrency = getString(elements.strikePriceCurrencyElem);
    const expireDate = getDate(elements.expireDateElem);
    const costs = getDecimal(elements.costsElem);
    const costsCurrency = getString(elements.costsCurrencyElem);
    const stockBrokerName = getString(elements.stockBrokerNameElem);
    const isExercised = elements.isExercisedElem.checked;
    const exerciseDate = getDate(elements.exerciseDateElem);
    const exerciseCosts = getDecimal(elements.exerciseCostsElem);
    const exerciseCostsCurrency = getString(elements.exerciseCostsCurrencyElem);
    const accountId = parm.accountId ?? getInt(elements.accountIdElem);

    if (isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency)) {
        const response = await saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency);
        window.location.href = `ticker.html?symbol=${parm.symbol}&accountid=${accountId}`;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency) {
    const exchangeRateInfos = getExchangeRateInfos(exchangeRateInfoElements);
    const exerciseExchangeRateInfos = getExchangeRateInfos(exerciseExchangeRateInfoElements);

    if (optionData === null) {
        return await createOption(accountId, parm.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency, exchangeRateInfos, exerciseExchangeRateInfos, elements.messageElem);
    } else {
        return await updateOption(optionData.option.id, optionData.option.accountId, optionData.option.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency, exchangeRateInfos, exerciseExchangeRateInfos, optionData.option.latestUpdate, elements.messageElem);
    }
}

function getExchangeRateInfos(elemList) {
    if (elemList === null) {
        return null;
    }

    const exchangeRateInfos = [];

    elemList.forEach(elem => {
        exchangeRateInfos.push(getExchangeRateInfoObject(elem));
    });

    return exchangeRateInfos;
}


function isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, stockBrokerName, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency) {
    if (accountId === null) {
        return false;
    }

    if (date === null) {
        return false;
    }

    if (callPutType === null) {
        return false;
    }

    if (longShortType === null) {
        return false;
    }

    if (numberOfContracts === null) {
        return false;
    }

    if (numberOfSharesPerContract === null) {
        return false;
    }

    if (premiumPrice === null) {
        return false;
    }

    if (premiumPriceCurrency === null) {
        return false;
    }

    if (strikePrice === null) {
        return false;
    }

    if (strikePriceCurrency === null) {
        return false;
    }

    if (expireDate === null) {
        return false;
    }

    if (costs === null) {
        return false;
    }

    if (costsCurrency === null) {
        return false;
    }

    if (stockBrokerName === null) {
        return false;
    }

    if (isExercised) {
        if (exerciseDate === null) {
            return false;
        }

        if (exerciseCosts === null) {
            return false;
        }

        if (exerciseCostsCurrency === null) {
            return false;
        }
    }

    return true;
}
