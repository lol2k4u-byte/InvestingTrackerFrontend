export function createPopupMenu(sign, elements) {
  const menu = document.createElement("div");
  menu.className = "menu-wrapper";

  const button = document.createElement("button");
  button.className = "menu-button";
  button.value = sign;
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("show");
  });
  menu.appendChild(button);

  const popupMenu = document.createElement("div");
  popupMenu.className = "popup-menu";
  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  menu.appendChild(popupMenu);

  elements.forEach((element) => {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.value = element.text:

    item.addEventListener("click", () => {
      e.stopPropagation();
      popupMenu.classList.remove("show");

      if (element.onClick) {
        element.onClick();
      }
    });
    
    popupMenu.appendChild(item);
  });

  return menu;
}
