import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// > css
import "@/styles/globals.css";
// > components
import App from "@/App.tsx";

const rootNode = document.getElementById("react-app");
createRoot(rootNode!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
