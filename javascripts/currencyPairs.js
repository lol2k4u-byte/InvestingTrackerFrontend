const baseCurrency = "DKK";

export function getCurrencyPairs(instrumentCurrency, fromCurrencies) {
    const currencyPairMap = new Map();

    getPairsToExchange(baseCurrency, fromCurrencies, currencyPairMap);
    getPairsToExchange(instrumentCurrency, fromCurrencies, currencyPairMap);

    removeDuplicates(currencyPairMap);

    return currencyPairMap;
}

function getPairsToExchange(toCurrency, fromCurrencies, currencyPairMap) {
    
    fromCurrencies.forEach(fromCurrency => {
        if (fromCurrency != toCurrency) {
            const key = getKey(fromCurrency, toCurrency);
            const value = getValue(fromCurrency, toCurrency);
            
            currencyPairMap.set(key, value);
        }
    });
}

function removeDuplicates(currencyPairMap) {
    currencyPairMap.forEach(currencyPair => {
        const key = getKey(currencyPair.toCurrency, currencyPair.fromCurrency);
            
        currencyPairMap.delete(key);
    });
}

function getKey(fromCurrency, toCurrency) {
    return `${fromCurrency}/${toCurrency}`;
}

function getValue(fromCurrency, toCurrency) {
    return {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
    };
}
