import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = "taken";

function App() {

  // useState in plaats van gewone let-variabelen
  const [taken, setTaken] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  );

  // opslaan in localStorage
  function opslaan(nieuweTaken) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nieuweTaken));
  }

  // Create
  function addtaak(titel, prioriteit) {
    const start = performance.now();

    const nieuweTaken = [];
    for (let i = 0; i < taken.length; i++) {
      nieuweTaken.push(taken[i]);
    }
    nieuweTaken.push({ id: Date.now(), titel, done: false, prioriteit });
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[React] Toevoegen: ${(einde - start).toFixed(2)} ms`);
  });
  };

  // Delete
  function removetaak(id) {
    const start = performance.now();

    const nieuweTaken = taken.filter((taak) => taak.id !== id);
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[React] Verwijderen: ${(einde - start).toFixed(2)} ms`);
  });
  };

  // Done toggle
  function toggleDone(id) {
    const nieuweTaken = [];
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id === id) {
        nieuweTaken.push({ id: taken[i].id, titel: taken[i].titel, done: !taken[i].done, prioriteit: taken[i].prioriteit });
      } else {
        nieuweTaken.push(taken[i]);
      }
    }
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);
  }

  // Update
  function updateTaak(id, titel) {
    const start = performance.now();

    const nieuweTaken = [];
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id === id) {
        nieuweTaken.push({ id: taken[i].id, titel, done: taken[i].done, prioriteit: taken[i].prioriteit });
      } else {
        nieuweTaken.push(taken[i]);
      }
    }
    setTaken(nieuweTaken);
    opslaan(nieuweTaken);

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[React] Aanpassen: ${(einde - start).toFixed(2)} ms`);
  });
  };

  return (
    <div className="page">
      <h1>Takenlijst</h1>
      <TaskForm onAdd={addtaak} />
      <TaskList taken={taken} onRemove={removetaak} onToggle={toggleDone} onUpdate={updateTaak} />
    </div>
  );
}

export default App;
