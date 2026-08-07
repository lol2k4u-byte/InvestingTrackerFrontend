import { getAmountFormat } from "./global.js";

export function getCanvas(title, data) {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    const labels = sortedData.map(d => d.label);
    const values = sortedData.map(d => d.value);

    const colors = getColors(values.length);
    const totalValue = getTotalValue(values);

    const div = document.createElement("div");
    div.className = "canvasContainer";

    div.appendChild(getTitleContainer(title))
    div.appendChild(getTotalValueContainer(totalValue))
    div.appendChild(getCanvasChartContainer(labels, values, colors, totalValue));

    return div;
}

function getTotalValue(values) {

    return values.reduce((sum, value) => sum + value, 0);
}

function getTitleContainer(title) {
    const div = document.createElement("div");
    div.className = "canvasTitle";
    div.textContent = title;

    return div;
}

function getTotalValueContainer(totalValue) {
    const div = document.createElement("div");
    div.className = "canvasTitle";
    div.textContent = getAmountFormat(totalValue, "DKK");

    return div;
}

function getCanvasChartContainer(labels, values, colors, totalValue) {
    const div = document.createElement("div");
    div.className = "canvasChartContainer";

    div.appendChild(getChartContainer(labels, values, colors, totalValue));
    div.appendChild(getLegend(labels, values, colors, totalValue));

    return div;
}

function getChartContainer(labels, values, colors, totalValue) {
    const div = document.createElement("div");
    div.className = "chartContainer";

    div.appendChild(getChart(labels, values, colors, totalValue));

    return div;
}

function getChart(labels, values, colors, totalValue) {

    const canvas = document.createElement("canvas");
    const settings = getSettings(labels, values, colors, totalValue);

    new Chart(canvas, settings);

    return canvas;
}

function getLegend(labels, values, colors, totalValue) {

    const legend = document.createElement("div");
    legend.className = "chartLegend";

    labels.forEach((label, index) => {

        const item = document.createElement("div");
        item.className = "legendItem";

        const color = document.createElement("div");
        color.className = "legendColor";
        color.style.backgroundColor = colors[index];

        const name = document.createElement("div");
        name.className = "legendName";
        name.textContent = label;

        const currency = document.createElement("div");
        currency.textContent = "DKK"

        const value = document.createElement("div");
        value.className = "legendValue";
        value.textContent = getAmountFormat(values[index]);

        const percentage = document.createElement("div");
        percentage.className = "legendPercentage";
        percentage.textContent = getPercentage(values[index], totalValue);

        item.appendChild(color);
        item.appendChild(name);
        item.appendChild(currency);
        item.appendChild(value);
        item.appendChild(percentage);

        legend.appendChild(item);
    });

    return legend;
}

function getSettings(labels, values, colors, totalValue) {

    return {
        type: "doughnut",

        data: {
            labels: labels,

            datasets: [{
                label: "Værdi",
                data: values,
                backgroundColor: colors,
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 12
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            cutout: "55%",

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return [
                                `${labels[context.dataIndex]}`,
                                `Værdi: ${values[context.dataIndex]}`,
                                `Andel: ${ getPercentage(values[context.dataIndex], totalValue) }`
                            ];
                        }
                    }
                }
            }
        }
    };
}

function getColors(count) {
    return Array.from({ length: count }, (_, index) => {
        const hue = Math.round((360 / count) * index);

        return `hsl(${hue}, 70%, 55%)`;
    });
}

function getPercentage(value, totalValue) {

    return `${((value / totalValue) * 100).toFixed(2)} %`;
}