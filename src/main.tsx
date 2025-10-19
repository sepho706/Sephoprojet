import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./mayn"; // 👉 le fichier où tu as mis ton BrowserRouter
import "./index.css"; // ou ton fichier de style global

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
