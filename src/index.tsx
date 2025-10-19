import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Accueil from "./pages/Accueil";
import "./index.css";
import Contact from "./pages/Contact";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/universites" element={<App />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);
