export function getTitleContainer(title, onDelete) {
    const container = document.createElement("div");
    container.className = "titleContainer";

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.title = "Tilbage";
    backButton.textContent = "🡰";
    backButton.onclick = () => { window.history.back(); };
    container.appendChild(backButton);

    const header = document.createElement("h1");
    header.textContent = title;
    container.appendChild(header);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.title = "Slet";
    deleteButton.textContent = "🗑️";
    if (onDelete === null) {
        deleteButton.className = "hidden";
    } else {
        deleteButton.onclick = () => {
            if (confirm("Er du sikker på, at du vil slette?")) {
                onDelete();
            }
        };
    }
    container.appendChild(deleteButton);

    return container;
}