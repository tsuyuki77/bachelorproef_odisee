import { useState } from 'react';
import './App.css';

const STORAGE_KEY = "taken";

function App() {

  // useState in plaats van gewone let-variabelen
  const [nieuwetitel, setNieuwetitel] = useState("");
  const [taken, setTaken] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  );
  const [bewerkId, setBewerkId] = useState(null);
  const [bewerktitel, setBewerktitel] = useState("");

  // opslaan in localStorage
  function opslaan(nieuweTaken) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nieuweTaken));
  }

  // Create
  function addtaak() {
    const titel = nieuwetitel.trim();
    if (!titel) return;

    const nieuweTaken = [...taken, { id: Date.now(), titel: titel, done: false }];
    setTaken(nieuweTaken);
    setNieuwetitel("");
    opslaan(nieuweTaken);
  }

  // Delete
  function removetaak(id) {
    const nieuweTaken = taken.filter((taak) => taak.id !== id);
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);
  }

  // Done toggle
  function toggleDone(id) {
    const nieuweTaken = [];
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id === id) {
        nieuweTaken.push({ id: taken[i].id, titel: taken[i].titel, done: !taken[i].done });
      } else {
        nieuweTaken.push(taken[i]);
      }
    }
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);
  }

  // Annuleer Update
  function AnnuleerUpdate() {
    setBewerkId(null);
    setBewerktitel("");
  }

  // opslaan Update
  function opslaanUpdate(id) {
    const titel = bewerktitel.trim();
    if (!titel) return;

    const nieuweTaken = [];
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id === id) {
        nieuweTaken.push({ id: taken[i].id, titel: titel, done: taken[i].done });
      } else {
        nieuweTaken.push(taken[i]);
      }
    }

    setTaken(nieuweTaken);
    AnnuleerUpdate();
    opslaan(nieuweTaken);
  }

  return (
    <div className="page">
      <h1>Takenlijst</h1>

      <div className="add">
        <input value={nieuwetitel} onChange={(e) => setNieuwetitel(e.target.value)} placeholder="Nieuwe taak..." />
        <button onClick={addtaak}>Toevoegen</button>
      </div>

      <ul>
        {taken.map((taak) => (
          <li className="row" key={taak.id}>
            <input type="checkbox" checked={taak.done} onChange={() => toggleDone(taak.id)} />

            {bewerkId !== taak.id ? (
              <>
                <span className={taak.done ? "titel done" : "titel"}>
                  {taak.titel}
                </span>
                <div className="actions">
                  <button onClick={() => { setBewerkId(taak.id); setBewerktitel(taak.titel); }}>Bewerk</button>
                  <button onClick={() => removetaak(taak.id)}>Verwijder</button>
                </div>
              </>
            ) : (
              <>
                <input value={bewerktitel} onChange={(e) => setBewerktitel(e.target.value)} />
                <div className="actions">
                  <button onClick={() => opslaanUpdate(taak.id)}>Opslaan</button>
                  <button onClick={AnnuleerUpdate}>Annuleer</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {taken.length === 0 && <p>Nog geen taken.</p>}
    </div>
  );
}

export default App;