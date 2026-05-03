import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getEnum, getDate } from "./form.js";
import { loadAccounts } from "./accountDropdown.js";
import { getOption, createOption, updateOption, deleteOption } from "./services/optionApi.js";


const elements = loadElements();
const parm = loadParm();
const optionData = await loadForm();
loadTitleContainer();
await loadAccountDropdown();

elements.isExercisedElem.addEventListener("change", isExercisedChanged);

document
    .getElementById("optionForm")
    .addEventListener("submit", submitOption);

function loadElements() {
    return {
        accountIdElem: document.getElementById("accountId"),
        accountIdContainerElem: document.getElementById("accountIdContainer"),
        dateElem: document.getElementById("date"),
        callPutTypeElem: document.getElementById("callPutType"),
        longShortTypeElem: document.getElementById("longShortType"),
        numberOfContractsElem: document.getElementById("numberOfContracts"),
        numberOfSharesPerContractElem: document.getElementById("numberOfSharesPerContract"),
        premiumPriceElem: document.getElementById("premiumPrice"),
        strikePriceElem: document.getElementById("strikePrice"),
        expireDateElem: document.getElementById("expireDate"),
        costsElem: document.getElementById("costs"),
        isExercisedElem: document.getElementById("isExercised"),
        exerciseDateElem: document.getElementById("exerciseDate"),
        exerciseCostsElem: document.getElementById("exerciseCosts"),
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
    };
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
        elements.strikePriceElem.value = optionData.option.strikePrice;
        elements.expireDateElem.value = optionData.option.expireDate;
        elements.costsElem.value = optionData.option.costs;
        elements.isExercisedElem.checked = optionData.option.isExercised;
        if (optionData.option.isExercised) {
            elements.exerciseDateElem.value = optionData.optionExercise.date;
            elements.exerciseCostsElem.value = optionData.optionExercise.costs;
            isExercisedChanged();
        }
        return optionData;
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
    const isExercised = elements.isExercisedElem.checked;
    const exerciseDate = getDate(elements.exerciseDateElem);
    const exerciseCosts = getDecimal(elements.exerciseCostsElem);
    const accountId = parm.accountId ?? getInt(elements.accountIdElem);

    if (isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts)) {
        const response = await saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts);
        window.location.href = document.referrer;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveOption(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts) {
    if (optionData === null) {
        return await createOption(accountId, parm.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts, elements.messageElem);
    } else {
        return await updateOption(optionData.option.id, optionData.option.accountId, optionData.option.symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts, optionData.option.latestUpdate, elements.messageElem);
    }
}


function isValid(accountId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts) {
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

    if (strikePrice === null) {
        return false;
    }

    if (expireDate === null) {
        return false;
    }

    if (costs === null) {
        return false;
    }

    if (isExercised) {
        if (exerciseDate === null) {
            return false;
        }

        if (exerciseCosts === null) {
            return false;
        }
    }

    return true;
}