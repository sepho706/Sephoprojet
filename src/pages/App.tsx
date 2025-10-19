import {useState} from "react";
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
}

function App() {
  const [score, setScore] = useState(200);
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [maxTuition, setMaxTuition] = useState(120000);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedSerie, setSelectedSerie] = useState("Toutes");

  const allPrograms = ["Informatique", "Architecture", "Sport", "Droit","Comptabilité"];
  const allTags = ["Logement", "Bourse", "Cafétéria"];
  const cities = ["Abidjan", "Bondoukou", "Yamoussoukro"];
  const series = ["A", "C", "D"];

  // Associer les images importées avec les données JSON
  const imageMap: Record<string, string> = {
    "ucao.jpg": UCAOimg,
    "injs.jpg": INJSimg,
    "inp.jpg": INPHBimg,
    "bondoukou.jpg": BONDimg,
    "cpdec.jpg": CPDECimg,
    "ufhb.jpg": UFHBimg,
  };

  const universities: University[] = universitiesData.map((u) => ({
    ...u,
    image: imageMap[u.image] || "", // remplace le nom par le vrai chemin importé
  }));

  const toggleProgram = (p: string) =>
    setSelectedPrograms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const toggleTag = (t: string) =>
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const resetFilters = () => {
    setSelectedPrograms([]);
    setSelectedTags([]);
    setSelectedCity("Toutes");
    setMaxTuition(120000);
    setScore(200);
    setSelectedSerie("");
  };

  const filtered = universities
    .filter(
      (u) =>
        (selectedCity === "Toutes" || u.city === selectedCity) &&
        u.minScore <= score &&
        u.tuition <= maxTuition &&
        (selectedPrograms.length === 0 ||
          selectedPrograms.some((p) => u.programs.includes(p))) &&
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
            <Link to="/" className="btn-primary">
              Accueil
            </Link>
            <Link to="/contact" className="btn-primary">
              Contact
            </Link>
            <Link to="/apropos" className="btn-primary">
              A propos
            </Link>
          </nav>
        </header>

              <main className="main-grid">
                {/* Filtres */}
                <aside className="sidebar">
                  <h2>🔍 Filtres</h2>

                  <label>Score au Bac : {score}</label>
                  <input
                    type="range"
                    min="200"
                    max="400"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                  />

                  <label>Série</label>
                  <select
                    value={selectedSerie}
                    onChange={(e) => setSelectedSerie(e.target.value)}
                  >
                    {series.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <label>Ville</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>

                  <label>Votre budget (FCFA)</label>
                  <input
                    type="number"
                    min="0"
                    value={maxTuition}
                    onChange={(e) => setMaxTuition(Number(e.target.value))}
                  />

                  <div className="filters">
                    <h3>Programmes</h3>
                    <div className="tags">
                      {allPrograms.map((p) => (
                        <button
                          key={p}
                          onClick={() => toggleProgram(p)}
                          className={selectedPrograms.includes(p) ? "active" : ""}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <h3>Vie du campus</h3>
                    <div className="tags">
                      {allTags.map((t) => (
                        <button
                          key={t}
                          onClick={() => toggleTag(t)}
                          className={
                            selectedTags.includes(t) ? "active yellow" : ""
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="reset">
                    <button onClick={resetFilters}>Réinitialiser</button>
                    <span>⭐ Favoris : {favorites.length}</span>
                  </div>
                </aside>

                {/* Résultats */}
                <section className="results">
                  <div className="search-bar">
                    <input
                      placeholder="🔎 Rechercher une université..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="relevance">Pertinence</option>
                      <option value="score">Score maximum</option>
                      <option value="tuition">Frais</option>
                    </select>
                  </div>

                  <div className="cards">
                    {filtered.slice(0).map((u) => (
                      <div key={u.id} className="card">
                        <img src={u.image} alt={u.name} />
                        <div className="card-content">
                          <div className="card-header">
                            <h3>{u.name}</h3>
                            <button
                              onClick={() => toggleFavorite(u.id)}
                              className={
                                favorites.includes(u.id)
                                  ? "fav active"
                                  : "fav"
                              }
                            >
                              {favorites.includes(u.id) ? "★" : "☆"}
                            </button>
                          </div>
                          <p>
                            {u.city} • Min score : {u.minScore}
                          </p>
                          <p>{u.description}</p>
                          <div className="programs">
                            {u.programs.map((p) => (
                              <span key={p}>{p}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </main>
            
        {/* Footer */}
        <footer className="footer">
          Université+, l'app qui te guide.
          <br />
          Contact : +225 0505972127 — Email: sephorayao225@gmail.com
        </footer>
      </div>
  
  );
}

export default App;
