export function getDateFormat(date) {
    if (!date) {
        return "";
    }

    const [year, month, day] = date.split("-");

    return `${day}.${month}.${year}`;
}

export function getAmountFormat(amount, currency) {
    if (amount == null || !currency) {
        return "";
    }

    return `${currency} ${Number(amount).toLocaleString("da-DK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

export function getBuySellTypeString(buySellType) {
    if (buySellType === 0) { return "Køb"; }
    if (buySellType === 1) { return "Salg"; }
    return null;
}