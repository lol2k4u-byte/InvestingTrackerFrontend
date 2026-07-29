const baseCurrency = "DKK";

export function loadCurrencies(selectElement, instrumentCurrency) {

    addOption(selectElement, instrumentCurrency);
    addOption(selectElement, baseCurrency);
}

function addOption(selectElement, currency) {
    const optionElement = document.createElement("option");
    optionElement.value = currency;
    optionElement.textContent = currency;
    selectElement.appendChild(optionElement);
}
