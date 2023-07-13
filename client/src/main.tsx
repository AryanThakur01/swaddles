import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import AuthProvider from "./context/AuthProvider.tsx";
import ProductProvider from "./context/ProductProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProductProvider>
  </React.StrictMode>
);
