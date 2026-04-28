import { createPopupMenu } from "./popupMenu.js";
import { getOptionTypeString, getDateFormat, getAmountFormat, getNumberFormat } from "./global.js";

export function createOptionCard(element, currency) {
    const optionCard = document.createElement("div");
    optionCard.className = "item eventItem pointer";
    optionCard.onclick = () => { window.location.href = `option.html?id=${element.id}`; }

    let date = getDateFormat(element.date);
    let numberOfShares = getNumberFormat(element.numberOfContracts * element.numberOfSharesPerContract);
    let premiumPrice = getAmountFormat(element.premiumPrice, currency);
    let totalPremium = getAmountFormat(element.premiumPrice * numberOfShares, currency);
    let type = getOptionTypeString(element.callPutType, element.longShortType);
    let strikePrice = getAmountFormat(element.strikePrice, currency);
    let expireDate = getDateFormat(element.expireDate);
    let itm = element.isExercised ? "Ja" : "Nej";

    optionCard.innerHTML = `
        <div class="statLogo">O</div>

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
                <div class="itemStatValue">${premiumPrice}</div>
            </div>

            <div class="stat">  
                <div class="itemStatLabel">I alt</div>
                <div class="itemStatValue">${totalPremium}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Type</div>
                <div class="itemStatValue">${type}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Strike</div>
                <div class="itemStatValue">${strikePrice}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Udløbsdato</div>
                <div class="itemStatValue">${expireDate}</div>
            </div>

            <div class="stat">
                <div class="itemStatLabel">Udnyttet</div>
                <div class="itemStatValue">${itm}</div>
            </div>
        </div>
    `;

    return optionCard;
};
