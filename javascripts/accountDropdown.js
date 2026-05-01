import { getAccounts } from "./services/accountApi.js";

export async function loadAccounts(selectElement, message) {

    const accounts = await getAccounts(message);

    // ryd eksisterende options
    selectElement.innerHTML = "";

    accounts.forEach(account => {
        const option = document.createElement("option");
        option.value = account.accountId;
        option.textContent = account.name;

        selectElement.appendChild(option);
    });
}
