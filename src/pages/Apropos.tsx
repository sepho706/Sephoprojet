import "./apropos.css";
import aproposData from "../data/apropos.json";
import { Link } from "react-router-dom";
import logo from "../assets/UNIVERSITE.png";

function Apropos() {
  const { sections, footer } = aproposData;

  return (
    <div className="apropos-container">
       <header className="header">
        <img src={logo} alt="Logo Université+" className="logo" />
        <nav>
          <Link to="/" className="btn-primary">
            Accueil
          </Link>
          <Link to="/contact" className="btn-primary">
            Contact
          </Link>
        </nav>
      </header>

      {sections.map((section, index) => (
        <div key={index} className="apropos-section">
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}

      <footer className="apropos-footer">
        <p>{footer.text}</p>
      </footer>
    </div>
  );
}

export default Apropos;
