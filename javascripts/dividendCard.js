import { createPopupMenu } from "./popupMenu.js";
import { getDateFormat, getAmountFormat, getNumberFormat } from "./global.js";

export function createDividendCard(element, currency) {
    const dividendCard = document.createElement("div");
    dividendCard.className = "item eventItem pointer";
    dividendCard.onclick = () => { window.location.href = `dividend.html?id=${element.id}`; }

    let date = getDateFormat(element.date);
    let numberOfShares = getNumberFormat(element.numberOfShares);
    let dividendValue = getAmountFormat(element.dividendValue, currency);
    let totalValue = getAmountFormat(element.dividendValue * element.numberOfShares, currency);

    dividendCard.innerHTML = `
        <div class="statLogo">U</div>

        <div class="tickerEventStats">
            <div class="stat">
                <div class="itemStatLabel">Dato</div>
                <div class="itemStatValue">${date}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Antal</div>
                <div class="itemStatValue">${numberOfShares}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Pr stk.</div>
                <div class="itemStatValue">${dividendValue}</div>
            </div>

            <div class="stat">  
                <div class="itemStatLabel">I alt</div>
                <div class="itemStatValue">${totalValue}</div>
            </div>
        </div>
    `;

    return dividendCard;
};
