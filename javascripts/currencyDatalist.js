export function appendCurrencyOptions(element, currency) {

    const baseCurrency = "DKK";

    if (currency != baseCurrency) {
        appendOption(element, baseCurrency);
    }

    appendOption(element, currency);

}

function appendOption(element, currency) {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    element.appendChild(option);
}