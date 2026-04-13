const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("companyName").textContent = `${id}`;