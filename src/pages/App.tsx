import { useState } from "react";
import "./App.css";
import logo from "../assets/UNIVERSITE.png";
import { Link } from "react-router-dom";

// Images
import UCAOimg from "../assets/universites/ucao.jpg";
import INJSimg from "../assets/universites/injs.jpg";
import INPHBimg from "../assets/universites/inp.jpg";
import BONDimg from "../assets/universites/bondoukou.jpg";
import CPDECimg from "../assets/universites/cpdec.jpg";
import UFHBimg from "../assets/universites/ufhb.jpg";
import ULimg from "../assets/universites/ul.jpg";
import CERAPimg from "../assets/universites/cerap.jpg";
import IUAimg from "../assets/universites/iua.jpg";
import ESATICimg from "../assets/universites/esatic.jpg";
import ENSEAimg from "../assets/universites/ensea.jpg";
import UNSimg from "../assets/universites/uns.jpg";
import UPBimg from "../assets/universites/upb.jpg";
import ISPAimg from "../assets/universites/ispa.jpg";
import IIPEAimg from "../assets/universites/iipea.jpg";

// Données JSON
import universitiesData from "../data/universities.json";

interface University {
  id: number;
  name: string;
  city: string;
  minScore: number;
  tuition: number;
  description: string;
  programs: string[];
  serie: string[];
  image: string;
  link: string;
}

function App() {
  const [score, setScore] = useState(200);
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [maxTuition, setMaxTuition] = useState(120000);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedSerie, setSelectedSerie] = useState("Toutes");

  const allPrograms = ["Informatique", "Architecture", "Sport", "Droit", "Comptabilité"];
  const allTags = ["Logement", "Bourse", "Cafétéria"];
  const cities = ["Toutes", "Abidjan", "Bondoukou", "Yamoussoukro"];
  const series = ["Toutes", "A", "C", "D"];

  const imageMap: Record<string, string> = {
    "ucao.jpg": UCAOimg,
    "injs.jpg": INJSimg,
    "inp.jpg": INPHBimg,
    "bondoukou.jpg": BONDimg,
    "cpdec.jpg": CPDECimg,
    "ufhb.jpg": UFHBimg,
    "ul.jpg": ULimg,
    "cerap.jpg": CERAPimg,
    "iua.jpg": IUAimg,
    "esatic.jpg": ESATICimg,
    "upb.jpg": UPBimg,
    "iipea.jpg": IIPEAimg,
    "ensea.jpg": ENSEAimg,
    "uns.jpg": UNSimg,
    "ispa.jpg": ISPAimg,
  };

  const universities: University[] = universitiesData.map((u) => ({
    ...u,
    image: imageMap[u.image] || "",
    link: u.link || "#",
  }));

  const toggleProgram = (p: string) =>
    setSelectedPrograms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const toggleTag = (t: string) =>
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const resetFilters = () => {
    setSelectedPrograms([]);
    setSelectedTags([]);
    setSelectedCity("Toutes");
    setMaxTuition(120000);
    setScore(200);
    setSelectedSerie("Toutes");
  };

  const filtered = universities
    .filter(
      (u) =>
        (selectedCity === "Toutes" || u.city === selectedCity) &&
        u.minScore <= score &&
        u.tuition <= maxTuition &&
        (selectedPrograms.length === 0 || selectedPrograms.some((p) => u.programs.includes(p))) &&
        u.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return a.minScore - b.minScore;
      if (sortBy === "tuition") return a.tuition - b.tuition;
      return 0;
    });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Logo" style={{ width: "100px" }} />
        <nav>
          <Link to="/" className="btn-primary">Accueil</Link>
          <Link to="/contact" className="btn-primary">Contact</Link>
          <Link to="/apropos" className="btn-primary">À propos</Link>
        </nav>
      </header>

      {/* Main */}
      <main className="main-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>🔍 Filtres</h2>

          <label>Score au Bac : {score}</label>
          <input type="range" min="200" max="400" value={score}
                 onChange={(e) => setScore(Number(e.target.value))} />

          <label>Série</label>
          <select value={selectedSerie} onChange={(e) => setSelectedSerie(e.target.value)}>
            {series.map((s) => (<option key={s}>{s}</option>))}
          </select>

          <label>Ville</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {cities.map((c) => (<option key={c}>{c}</option>))}
          </select>

          <label>Votre budget (FCFA)</label>
          <input type="number" min="0" value={maxTuition}
                 onChange={(e) => setMaxTuition(Number(e.target.value))} />

          <div className="filters">
            <h3>Programmes</h3>
            <div className="tags">
              {allPrograms.map((p) => (
                <button key={p} onClick={() => toggleProgram(p)}
                        className={selectedPrograms.includes(p) ? "active" : ""}>{p}</button>
              ))}
            </div>

            <h3>Vie du campus</h3>
            <div className="tags">
              {allTags.map((t) => (
                <button key={t} onClick={() => toggleTag(t)}
                        className={selectedTags.includes(t) ? "active yellow" : ""}>{t}</button>
              ))}
            </div>
          </div>

          <div className="reset">
            <button onClick={resetFilters}>Réinitialiser</button>
          </div>
        </aside>

        {/* Résultats */}
        <section className="results">
          <div className="search-bar">
            <input placeholder="🔎 Rechercher une université..."
                   value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Pertinence</option>
              <option value="score">Score maximum</option>
              <option value="tuition">Frais</option>
            </select>
          </div>

          <div className="cards">
            {filtered.map((u) => (
              <div key={u.id} className="card">
                <div className="image-container">
                  <img src={u.image} alt={u.name} className="university-logo" />
                  <a href={u.link} target="_blank" rel="noopener noreferrer" className="hover-link">
                    🌐 Voir le site
                  </a>
                </div>

                <div className="card-content">
                  <p>{u.city} • Min score : {u.minScore}</p>
                  <p>{u.description}</p>
                  <div className="programs">
                    {u.programs.map((p) => (<span key={p}>{p}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        Université+, l'app qui te guide.<br />
        Contact : +225 0505972127 — Email : sephorayao225@gmail.com
      </footer>
    </div>
  );
}

export default App;
