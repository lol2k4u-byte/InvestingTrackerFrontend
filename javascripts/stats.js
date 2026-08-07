import { getCanvas } from "./canvas.js";
import { getStats } from "./services/statsApi.js";

const elements = getElements();
const stats = await getStats(1);

getLongTickerStats();
getShortTickerStats();
getLongStockBrokerStats();
getShortStockBrokerStats();


function getElements() {
    return {
        longTickerStatsElem: document.getElementById("longTickerStats"),
        shortTickerStatsElem: document.getElementById("shortTickerStats"),
        longStockBrokerStatsElem: document.getElementById("longStockBrokerStats"),
        shortStockBrokerStatsElem: document.getElementById("shortStockBrokerStats"),
    };
}

function getLongTickerStats() {
    const title = "Lange positioner fordelt på aktie";
    const data = getTickerCanvasData(stats.longPositionElements);

    const canvas = getCanvas(title, data);
    elements.longTickerStatsElem.appendChild(canvas);
}

function getShortTickerStats() {
    const title = "Korte positioner fordelt på aktie";
    const data = getTickerCanvasData(stats.shortPositionElements);

    const canvas = getCanvas(title, data);
    elements.shortTickerStatsElem.appendChild(canvas);
}

function getLongStockBrokerStats() {
    const title = "Lange positioner fordelt på børsmægler";
    const data = getStockBrokerCanvasData(stats.longStockBrokerElements);

    const canvas = getCanvas(title, data);
    elements.longStockBrokerStatsElem.appendChild(canvas);
}

function getShortStockBrokerStats() {
    const title = "Korte positioner fordelt på børsmægler";
    const data = getStockBrokerCanvasData(stats.shortStockBrokerElements);

    const canvas = getCanvas(title, data);
    elements.shortStockBrokerStatsElem.appendChild(canvas);
}

function getTickerCanvasData(positionElements) {
    const data = [];

    positionElements.forEach(e => {
        const element = {
            label: e.name,
            value: e.value
        };
        data.push(element);
    });

    return data;
}

function getStockBrokerCanvasData(stockBrokerElements) {
    const data = [];

    stockBrokerElements.forEach(e => {
        const element = {
            label: e.stockBrokerName,
            value: e.value
        };
        data.push(element);
    });

    return data;
}