export function loadController() {
  const controller = new AbortController();
  
  window.addEventListener("pagehide", () => {
    controller.abort();
  });

  return controller;
}