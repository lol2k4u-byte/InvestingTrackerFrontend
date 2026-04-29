import { getTitleContainer } from "./titleContainer.js";
import { getInt, getDecimal, getDate } from "./form.js";
import { getDividend, createDividend, updateDividend, deleteDividend } from "./services/dividendApi.js";

const elements = loadElements();
const parm = loadParm();
const dividend = await loadForm();
loadTitleContainer();

document
    .getElementById("dividendForm")
    .addEventListener("submit", submitDividend);

function loadElements() {
    return {
        dateElem: document.getElementById("date"),
        numberOfSharesElem: document.getElementById("numberOfShares"),
        dividendValueElem: document.getElementById("dividendValue"),
        messageElem: document.getElementById("message"),
        titleContainer: document.getElementById("titleContainer")
    };
}

function loadTitleContainer() {
    const onDelete = (dividend === null) ? null : onClickDelete;
    elements.titleContainer.appendChild(getTitleContainer("Dividend", onDelete));
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
    return await deleteDividend(dividend.id, dividend.latestUpdate, elements.messageElem);
}

async function loadForm() {
    elements.dateElem.value = new Date().toISOString().split("T")[0];

    if (parm.id != null) {
        const dividend = await getDividend(parm.id);
        elements.dateElem.value = dividend.date;
        elements.numberOfSharesElem.value = dividend.numberOfShares;
        elements.dividendValueElem.value = dividend.dividendValue;
        return dividend;
    } else {
        return null;
    }
}

async function submitDividend(event) {
    event.preventDefault();

    elements.messageElem.textContent = "";

    const date = getDate(elements.dateElem);
    const numberOfShares = getInt(elements.numberOfSharesElem);
    const dividendValue = getDecimal(elements.dividendValueElem);

    if (isValid(date, numberOfShares, dividendValue)) {
        await saveDividend(date, numberOfShares, dividendValue);
        window.location.href = document.referrer;
    } else {
        elements.messageElem.textContent = "Fejl i input";
    }
}

async function saveDividend(date, numberOfShares, dividendValue) {
    if (dividend === null) {
        return await createDividend(
            parm.accountId,
            parm.symbol,
            date,
            numberOfShares,
            dividendValue,
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
            dividend.latestUpdate,
            elements.messageElem
        );
    }
}

function isValid(date, numberOfShares, dividendValue) {
    if (date === null) {
        return false;
    }

    if (numberOfShares === null) {
        return false;
    }

    if (dividendValue === null) {
        return false;
    }

    return true;
}
