import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate, getString } from "./form.js";
import { loadAccounts } from "./accountDropdown.js";
import { getOption, createOption, updateOption, deleteOption } from "./services/optionApi.js";
import { loadExchangeRateInfoFormElement, getExchangeRateInfo, getExchangeRateInfoObject } from "./exchangeRateInfo.js";
import { getCurrencyPairs } from "./currencyPairs.js";
import { appendCurrencyOptions } from "./currencyDatalist.js"


const elements = loadElements();
const parm = loadParm();
let exchangeRateInfoElements = null;
const optionData = await loadForm();
elements.premiumPriceCurrencyElem.addEventListener("change", currencyChanged);
elements.strikePriceCurrencyElem.addEventListener("change", currencyChanged);
elements.costsCurrencyElem.addEventListener("change", currencyChanged);
elements.exerciseCostsCurrencyElem.addEventListener("change", currencyChanged);
appendCurrencyOptions(elements.currencyDatalistElem, parm.currency);
loadTitleContainer();
await loadAccountDropdown();

elements.isExercisedElem.addEventListener("change", isExercisedChanged);

document
    .getElementById("optionForm")
    .addEventListener("submit", submitOption);

function loadElements() {
    return {
        currencyDatalistElem: document.getElementById("currencyDatalist"),
        accountIdElem: document.getElementById("accountId"),
        accountIdContainerElem: document.getElementById("accountIdContainer"),
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
    elements.optionExchangeRateInfoElem.replaceChildren();

    const fromCurrencies = getFromCurrencies();
    const currencyPairMap = getCurrencyPairs(parm.currency, fromCurrencies);

    const elemList = [];

    currencyPairMap.forEach(currencyPair => {
        const elemObject = getExchangeRateInfo(currencyPair);
        elements.optionExchangeRateInfoElem.appendChild(elemObject.mainDiv);
        elemList.push(elemObject);
    });

    return elemList;
}

function getFromCurrencies() {
    const fromCurrencies = [];

    if (elements.premiumPriceCurrencyElem.value != "") {
        fromCurrencies.push(elements.premiumPriceCurrencyElem.value);
    }
    if (elements.strikePriceCurrencyElem.value != "") {
        fromCurrencies.push(elements.strikePriceCurrencyElem.value);
    }
    if (elements.costsCurrencyElem.value != "") {
        fromCurrencies.push(elements.costsCurrencyElem.value);
    }
    if (elements.exerciseCostsCurrencyElem.value != "") {
        fromCurrencies.push(elements.exerciseCostsCurrencyElem.value);
    }

    return fromCurrencies;
}

function currencyChanged() {
    exchangeRateInfoElements = loadExchangeRateInfo();
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
        elements.isExercisedElem.checked = optionData.option.isExercised;
        if (optionData.option.isExercised) {
            elements.exerciseDateElem.value = optionData.optionExercise.date;
            elements.exerciseCostsElem.value = optionData.optionExercise.costs;
            elements.exerciseCostsCurrencyElem.value = optionData.optionExercise.costsCurrency;
            isExercisedChanged();
        }
        loadExchangeRateInfoForm(optionData.exchangeRateInfos);
        return optionData;
    } else {
        return null;
    }
}

function loadExchangeRateInfoForm(exchangeRateInfos) {
    exchangeRateInfoElements = [];

    exchangeRateInfos.forEach(exchangeRateInfo => {
        const exchangeRateInfoElement = loadExchangeRateInfoFormElement(exchangeRateInfo);
        elements.optionExchangeRateInfoElem.appendChild(exchangeRateInfoElement.mainDiv);
        exchangeRateInfoElements.push(exchangeRateInfoElement);
    }); 
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
    const isExercised = elements.isExercisedElem.checked;
    const exerciseDate = getDate(elements.exerciseDateElem);
    const exerciseCosts = getDecimal(elements.exerciseCostsElem);
    const exerciseCostsCurrency = getString(elements.exerciseCostsCurrencyElem);
    const accountId = parm.accountId ?? getInt(elements.accountIdElem);

    if (isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency)) {
        const response = await saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency);
        window.location.href = `ticker.html?symbol=${parm.symbol}&accountid=${accountId}`;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPriceCurrency, premiumPrice, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency) {
    const exchangeRateInfos = getExchangeRateInfos();

    if (optionData === null) {
        return await createOption(accountId, parm.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, isExercised, exerciseDate, exerciseCosts, exchangeRateInfos, elements.messageElem);
    } else {
        return await updateOption(optionData.option.id, optionData.option.accountId, optionData.option.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, isExercised, exerciseDate, exerciseCosts, exchangeRateInfos, optionData.option.latestUpdate, elements.messageElem);
    }
}

function getExchangeRateInfos() {
    const exchangeRateInfos = [];

    exchangeRateInfoElements.forEach(elem => {
        exchangeRateInfos.push(getExchangeRateInfoObject(elem));
    });

    return exchangeRateInfos;
}


function isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency) {
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