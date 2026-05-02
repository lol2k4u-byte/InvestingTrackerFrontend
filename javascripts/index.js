document
    .getElementById("searchForm")
    .addEventListener("submit", search);

const dropdownList = document.getElementById("dropdownList");

function search(e) {
    e.preventDefault();
    dropdownList.innerHTML = "";
    fillDropdownList();
    dropdownList.classList.toggle("show");
}

async function fillDropdownList() {
    
}
