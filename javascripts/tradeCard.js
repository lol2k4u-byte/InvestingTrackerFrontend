import { createPopupMenu } from "./popupMenu.js";

export function createTradeCard(element) {
    const tradeCard = document.createElement("div");
    tradeCard.className = "item eventItem pointer";

    tradeCard.innerHTML = `
        <div class="statLogo">H</div>

        <div class="tickerEventStats">
            <div class="stat">
                <div class="itemStatLabel">Dato</div>
                <div class="itemStatValue">${element.date}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Antal</div>
                <div class="itemStatValue">${element.count}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Pr stk.</div>
                <div class="itemStatValue">${element.price}</div>
            </div>

            <div class="stat">  
                <div class="itemStatLabel">I alt</div>
                <div class="itemStatValue">${element.total}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Type</div>
                <div class="itemStatValue">${element.type}</div>
            </div>
        </div>
    `;

    const elementer = [
    {
	    text: "Rediger",
        onClick: () => { window.location.href = `trade.html?id=${element.id}`; }
    },
    {
	    text: "Slet",
        onClick: () => { window.location.href = `deleteTrade.html?id=${element.id}`; }
    }
    ];

    const popupMenu = createPopupMenu("⋯", elementer);
    tradeCard.appendChild(popupMenu);

    return tradeCard;
};
