document
    .getElementById("searchForm")
    .addEventListener("submit", search);

function search(e) {
    e.preventDefault();
    const dropdownList = document.getElementById("dropdownList");
    dropdownList.classList.toggle("show");
}

