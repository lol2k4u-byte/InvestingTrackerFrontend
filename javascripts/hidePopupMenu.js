document.addEventListener("click", () => {
  document.querySelectorAll(".popup-menu").forEach(menu => {
    menu.classList.remove("show");
  });
});
