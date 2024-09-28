import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext"; // Correct import for the default export
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
