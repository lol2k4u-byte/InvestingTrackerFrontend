import { getAccounts } from "./services/accountApi.js";

export async function loadAccounts(selectElement, message) {

    const accounts = await getAccounts(message);

    accounts.forEach(account => {
        const option = document.createElement("option");
        option.value = account.id;
        option.textContent = account.name;

        selectElement.appendChild(option);
    });
}
