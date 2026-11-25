import { getStockBrokerAccounts } from "./services/stockBrokerAccountApi.js";

const stockBrokerAccountMap = new Map();

export async function loadStockBrokerAccounts(selectElement, message) {

    const stockBrokerAccounts = await getStockBrokerAccounts(message);
    
    stockBrokerAccounts.forEach(stockBrokerAccount => {
        const option = document.createElement("option");
        option.value = stockBrokerAccount.stockBrokerAccountId;
        option.textContent = `${stockBrokerAccount.stockBrokerName}: ${stockBrokerAccount.accountName}`;

        selectElement.appendChild(option);
        stockBrokerAccountMap.set(stockBrokerAccount.stockBrokerAccountId, stockBrokerAccount);
    });
}

function getStockBrokerAccount(stockBrokerAccountId) {
    return stockBrokerAccountMap.get(stockBrokerAccountId);
}

export function getAccountId(stockBrokerAccountId) {
    return getStockBrokerAccount(stockBrokerAccountId).accountId;
}
