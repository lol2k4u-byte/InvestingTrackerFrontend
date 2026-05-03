import { getSearch } from "./services/tickerApi.js";

document
    .getElementById("searchForm")
    .addEventListener("submit", search);

const query = document.getElementById("query");
const dropdownList = document.getElementById("dropdownList");

function search(e) {
    e.preventDefault();
    fillDropdownList();
    dropdownList.classList.toggle("show");
}

async function fillDropdownList() {
    if (dropdownList.innerHTML)
        dropdownList.innerHTML = "";

    const result = await getSearch(query.value);
    result.forEach(element => {
        const item = document.createElement("div");
        item.className = "menu-item dropdownItem";
        
        const itemName = document.createElement("div");
        itemName.textContent = element.name;
        item.appendChild(itemName);
        
        const itemSymbol = document.createElement("div");
        itemSymbol.textContent = element.symbol + " @ " + element.exchange;
        item.appendChild(itemSymbol);

        item.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.href = `ticker.html?symbol=${element.symbol}`;
        });

        dropdownList.appendChild(item);
    });
    
}
