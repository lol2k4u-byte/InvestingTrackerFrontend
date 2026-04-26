import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate } from "./form.js";
import { getOption, createOption, updateOption, deleteOption } from "./services/optionApi.js";


const elements = loadElements();
const parm = loadParm();
const option = await loadForm();
loadTitleContainer();

document
    .getElementById("optionForm")
    .addEventListener("submit", submitOption);

function loadElements() {
    return {
        dateElem: document.getElementById("date"),
        callPutTypeElem: document.getElementById("callPutType"),
        longShortTypeElem: document.getElementById("longShortType"),
        numberOfContractsElem: document.getElementById("numberOfContracts"),
        numberOfSharesPerContractElem: document.getElementById("numberOfSharesPerContract"),
        premiumPriceElem: document.getElementById("premiumPrice"),
        strikePriceElem: document.getElementById("strikePrice"),
        expireDateElem: document.getElementById("expireDate"),
        costsElem: document.getElementById("costs"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer")
    };
}

function loadTitleContainer() {

    const onDelete = (option === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Option", onDelete));
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
    return await deleteOption(option.id, option.latestUpdate, elements.messageElem);
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const option = await getOption(parm.id);
        elements.dateElem.value = option.date;
        elements.callPutTypeElem.value = option.callPutType;
        elements.longShortTypeElem.value = option.longShortType;
        elements.numberOfContractsElem.value = option.numberOfContracts;
        elements.numberOfSharesPerContractElem.value = option.numberOfSharesPerContract;
        elements.premiumPriceElem.value = option.premiumPrice;
        elements.strikePriceElem.value = option.strikePrice;
        elements.expireDateElem.value = option.expireDate;
        elements.costsElem.value = option.costs;
        return option;
    } else {
        return null;
    }
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
    const strikePrice = getDecimal(elements.strikePriceElem);
    const expireDate = getDate(elements.expireDateElem);
    const costs = getDecimal(elements.costsElem);

    if (isValid(date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs)) {
        const response = await saveOption(date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs);
        window.history.back();
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveOption(date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs) {
    if (option === null) {
        return await createOption(parm.accountId, parm.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, elements.messageElem);
    } else {
        return await updateOption(option.id, option.accountId, option.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, option.latestUpdate, elements.messageElem);
    }
}


function isValid(date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs) {
    if (date === null) {
        console.info("date: " + date);
        return false;
    }

    if (callPutType === null) {
        console.info("callPutType: " + callPutType);
        return false;
    }

    if (longShortType === null) {
        console.info("longShortType: " + longShortType);
        return false;
    }

    if (numberOfContracts === null) {
        console.info("numberOfContracts: " + numberOfContracts);
        return false;
    }

    if (numberOfSharesPerContract === null) {
        console.info("numberOfSharesPerContract: " + numberOfSharesPerContract);
        return false;
    }

    if (premiumPrice === null) {
        console.info("premiumPrice: " + premiumPrice);
        return false;
    }

    if (strikePrice === null) {
        console.info("strikePrice: " + strikePrice);
        return false;
    }

    if (expireDate === null) {
        console.info("expireDate: " + expireDate);
        return false;
    }

    if (costs === null) {
        console.info("costs: " + costs);
        return false;
    }

    return true;
}