import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import App from "./pages/App";
import Contact from "./pages/Contact";
import Apropos from "./pages/Apropos";
function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil/>}  />
        <Route path="/universites" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<Apropos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
