function getValue(name) {
    return document.getElementById(name).value;
}

export function getDate(element) {
    const value = element.value;

    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!isValidFormat) {
        alert("not valid");
        return null;
    }

    const date = new Date(value);
    if (date.getTime() === NaN) {
        return null;
    }

    return value;
}

export function getEnum(element, min, max) {
    const value = getInt(element);

    if (value === null) {
        return null;
    }

    if (value < min || value > max) {
        return null;
    }

    return value;
}

export function getInt(element) {
    const value = getDecimal(element);

    if (value === null) {
        return null;
    }

    if (!Number.isInteger(value)) {
        return null;
    }

    return value;
}

export function getDecimal(element) {
    const value = element.value;

    if (value === null || value === undefined) {
        return null;
    }

    const trimmedValue = value.toString().trim();

    if (trimmedValue === "") {
        return null;
    }

    const numberValue = Number(trimmedValue);

    if (isNaN(numberValue)) {
        return null;
    }

    return numberValue;
}

