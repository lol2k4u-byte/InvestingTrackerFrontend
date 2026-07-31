import { getDecimal, getEnum, getInt } from "./form.js";

const autoOptionValue = 0;
const priceOptionValue = 1;
const rateOptionValue = 2;

export function loadExchangeRateInfoFormElement(exchangeRateInfo) {
    const currencyPair = {
        fromCurrency: exchangeRateInfo.fromCurrency,
        toCurrency: exchangeRateInfo.toCurrency,
    };

    return getExchangeRateInfoElements(currencyPair, exchangeRateInfo);
}

export function loadExchangeRateInfoElementObject(elements, exchangeRateInfo) {

    if (exchangeRateInfo === null) {
        return;
    }

    elements.selectElement.value = exchangeRateInfo.method;

    if (exchangeRateInfo.method === priceOptionValue) {
        elements.fromPriceElement.value = exchangeRateInfo.fromPrice; 
        elements.toPriceElement.value = exchangeRateInfo.toPrice;   
    } else if (exchangeRateInfo.method === rateOptionValue) {
        elements.fromRateElement.value = exchangeRateInfo.fromRate; 
        elements.toRateElement.value = exchangeRateInfo.toRate;   
    }

}

export function getExchangeRateInfo(currencyPair, title) {
    return getExchangeRateInfoElements(currencyPair, title);
}

function getExchangeRateInfoElements(currencyPair, exchangeRateInfo = null) {
    const fromCurrency = currencyPair.fromCurrency;
    const toCurrency = currencyPair.toCurrency;

    const main = document.createElement("div");
    const elements = {
        mainDiv: main,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        selectElement: null,
        priceControls: null,
        fromPriceElement: null,
        toPriceElement: null,
        fromRateElement: null,
        toRateElement: null,
        rateControls: null,
    };

    main.appendChild(getHeader(fromCurrency, toCurrency));
    main.appendChild(getMethod(elements));
    main.appendChild(getPriceControls(fromCurrency, toCurrency, elements));
    main.appendChild(getRateControls(fromCurrency, toCurrency, elements));

    loadExchangeRateInfoElementObject(elements, exchangeRateInfo);
    
    ShowExchangeMethodControls(elements);

    return elements;
}

function getHeader(fromCurrency, toCurrency) {
    const text = `Veksling ${fromCurrency} til ${toCurrency}`;

    const div = document.createElement("div");
    div.classList.add("exchangeRateHeader");
    div.textContent = text;

    return div;
}

function getMethod(elements) {
    
    const div = document.createElement("div");

    div.appendChild(getLabel("Metode"));

    const select = getSelect();
    elements.selectElement = select;
    select.addEventListener("change", (e) => {
        exchangeRateMethodChanged(e, elements);
    });

    select.appendChild(getOption("Auto", autoOptionValue));
    select.appendChild(getOption("Fra pris", priceOptionValue));
    select.appendChild(getOption("Fra kurs", rateOptionValue));
    div.appendChild(select);

    return div;
}

function exchangeRateMethodChanged(event, elements) {
    ShowExchangeMethodControls(elements);
}

function ShowExchangeMethodControls(elements) {
    const controls = [
        {
            elem: elements.priceControls,
            value: priceOptionValue,
        },
        {
            elem: elements.rateControls,
            value: rateOptionValue,
        },
    ];

    const value = getInt(elements.selectElement);

    controls.forEach(control => {
        if (control.value === value) {
            control.elem.classList.remove("displayNone");
        } else {
            control.elem.classList.add("displayNone");
        }
    });    
}

function getPriceControls(fromCurrency, toCurrency, elements) {

    const mainDiv = document.createElement("div");
    mainDiv.className = "split2";
    elements.priceControls = mainDiv;

    const fromDivText = `${fromCurrency} pris`;
    const fromDiv = document.createElement("div");
    fromDiv.appendChild(getLabel(fromDivText));
    elements.fromPriceElement = getPriceInput();
    fromDiv.appendChild(elements.fromPriceElement);
    mainDiv.appendChild(fromDiv);

    const toDivText = `${toCurrency} pris`;
    const toDiv = document.createElement("div");
    toDiv.appendChild(getLabel(toDivText));
    elements.toPriceElement = getPriceInput();
    toDiv.appendChild(elements.toPriceElement);
    mainDiv.appendChild(toDiv);

    return mainDiv;
}

function getRateControls(fromCurrency, toCurrency, elements) {

    const mainDiv = document.createElement("div");
    mainDiv.className = "split2";
    elements.rateControls = mainDiv;

    const fromDivText = `${fromCurrency} kurs`;
    const fromDiv = document.createElement("div");
    fromDiv.appendChild(getLabel(fromDivText));
    elements.fromRateElement = getRateInput();
    fromDiv.appendChild(elements.fromRateElement);
    mainDiv.appendChild(fromDiv);

    const toDivText = `${toCurrency} kurs`;
    const toDiv = document.createElement("div");
    toDiv.appendChild(getLabel(toDivText));
    elements.toRateElement = getRateInput();
    toDiv.appendChild(elements.toRateElement);
    mainDiv.appendChild(toDiv);

    return mainDiv;
}

function getLabel(text) {
    const label = document.createElement("div");
    label.className = "customLabel"
    label.textContent = text;
    return label;
}

function getSelect() {
    const select = document.createElement("select");
    select.className = "customControl";
    return select;
}

function getOption(text, value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    return option;
}

function getPriceInput() {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.className = "customControl";
    return input;
}

function getRateInput() {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.000001";
    input.className = "customControl";
    return input;
}

export function getExchangeRateInfoObject(elements) {
    const methodType = getEnum(elements.selectElement, 0, 2);
    
    const obj =  {
        fromCurrency: elements.fromCurrency,
        toCurrency: elements.toCurrency,
        methodType: methodType,
        fromPrice: null,
        toPrice: null,
        fromRate: null,
        toRate: null,
    };

    if (methodType === priceOptionValue) {
        obj.fromPrice = getDecimal(elements.fromPriceElement);
        obj.toPrice = getDecimal(elements.toPriceElement);
    } else if (methodType === rateOptionValue) {
        obj.fromRate = getDecimal(elements.fromRateElement);
        obj.toRate = getDecimal(elements.toRateElement);
    }

    return obj;
}