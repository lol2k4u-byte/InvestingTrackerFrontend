import { getStockBrokers } from "./services/stockBrokerApi.js";

export async function loadStockBrokers(selectElement, message) {

    const stockBrokers = await getStockBrokers(message);

    stockBrokers.forEach(stockBroker => {
        const option = document.createElement("option");
        option.value = stockBroker.name;
        option.textContent = stockBroker.name;

        selectElement.appendChild(option);
    });
}
