import { createPopupMenu } from "./popupMenu.js";
import { getBuySellTypeString, getDateFormat, getAmountFormat, getNumberFormat } from "./global.js";

export function createTradeCard(element, currency) {
    const tradeCard = document.createElement("div");
    tradeCard.className = "item eventItem pointer";
    tradeCard.onclick = () => { window.location.href = `trade.html?id=${element.id}`; }

    let date = getDateFormat(element.date);
    let numberOfShares = getNumberFormat(element.numberOfShares);
    let sharePrice = getAmountFormat(element.sharePrice, currency);
    let totalPrice = getAmountFormat(element.sharePrice * element.numberOfShares, currency);
    let type = getBuySellTypeString(element.buySellType);

    tradeCard.innerHTML = `
        <div class="statLogo">H</div>

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
                <div class="itemStatValue">${sharePrice}</div>
            </div>

            <div class="stat">  
                <div class="itemStatLabel">I alt</div>
                <div class="itemStatValue">${totalPrice}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Type</div>
                <div class="itemStatValue">${type}</div>
            </div>
        </div>
    `;

    return tradeCard;
};
