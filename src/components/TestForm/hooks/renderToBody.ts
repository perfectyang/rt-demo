import React from "react";
import { createRoot } from "react-dom/client";


export function renderToBody(el: React.ReactNode) {
  const container: any = document.createElement("div");
  container.id = "FMDialog";
  document.body.appendChild(container);
  const root = createRoot(container);
  function unmount() {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    if (root) {
      Promise.resolve().then(() => {
        root?.unmount();
      });
    }
  }
  root.render(el);
  return unmount;
}
