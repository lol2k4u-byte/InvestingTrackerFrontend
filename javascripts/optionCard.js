import { createPopupMenu } from "./popupMenu.js";

export function createOptionCard(element) {
    const optionCard = document.createElement("div");
    optionCard.className = "item eventItem pointer";

    optionCard.innerHTML = `
        <div class="statLogo">O</div>

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

            <div class="stat">
                <div class="itemStatLabel">Strike</div>
                <div class="itemStatValue">${element.strike}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Udløbsdato</div>
                <div class="itemStatValue">${element.expireDate}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">ITM</div>
                <div class="itemStatValue">${element.itm}</div>
            </div>
        </div>
    `;

    const elementer = [
    {
	    text: "Rediger",
        onClick: () => { window.location.href = `option.html?id=${element.id}`; }
    },
    {
	    text: "Slet",
        onClick: () => { window.location.href = `deleteOption.html?id=${element.id}`; }
    }
    ];

    const popupMenu = createPopupMenu("⋯", elementer);
    optionCard.appendChild(popupMenu);

    return optionCard;
};
