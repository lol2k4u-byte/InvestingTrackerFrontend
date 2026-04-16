import { createPopupMenu } from "./popupMenu.js";

export function createDividendCard(element) {
    const dividendCard = document.createElement("div");
    dividendCard.className = "item eventItem pointer";

    dividendCard.innerHTML = `
        <div class="statLogo">U</div>

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
        </div>
    `;

    const elementer = [
    {
	    text: "Rediger",
        onClick: () => { window.location.href = `dividend.html?id=${element.id}`; }
    },
    {
	    text: "Slet",
        onClick: () => { window.location.href = `deleteDividend.html?id=${element.id}`; }
    }
    ];

    const popupMenu = createPopupMenu("⋯", elementer);
    dividendCard.appendChild(popupMenu);

    return dividendCard;
};
