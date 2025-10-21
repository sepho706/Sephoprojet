import "./Accueil.css";
import logo from "../assets/UNIVERSITE.png";
import { Link } from "react-router-dom";


import accueilData from "../data/accueil.json";

function Accueil() {
  const { hero, features, footer } = accueilData;

  return (
    <div className="accueil-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo Université+" className="logo" />
        <nav>
          <Link to="/universites" className="btn-primary">
            Commencer la recherche
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <Link to="/universites" className="btn-primary">
            {hero.buttonText}
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        {features.map((f, index) => (
          <div key={index} className="feature-card no-image">
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <p>{footer.text}</p>
        <small>{footer.contact}</small>
      </footer>
    </div>
  );
}

export default Accueil;
