import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [nieuwetitel, setNieuwetitel] = useState('');
  const [prioriteit, setPrioriteit] = useState('normaal');
  const [fout, setFout] = useState('');

  function handleAdd() {
    const titel = nieuwetitel.trim();
    if (!titel) { setFout('Titel is verplicht.'); return; }
    if (titel.length < 3) { setFout('Titel moet minstens 3 tekens bevatten.'); return; }
    setFout('');
    onAdd(titel, prioriteit);
    setNieuwetitel('');
    setPrioriteit('normaal');
  }

  return (
    <div>
      <div className="add">
        <input value={nieuwetitel} onChange={(e) => setNieuwetitel(e.target.value)} placeholder="Nieuwe taak..." onKeyUp={(e) => e.key === 'Enter' && handleAdd()} />
        <select className="prioriteit-select" value={prioriteit} onChange={(e) => setPrioriteit(e.target.value)}>
          <option value="laag">Laag</option>
          <option value="normaal">Normaal</option>
          <option value="hoog">Hoog</option>
        </select>
        <button onClick={handleAdd}>Toevoegen</button>
      </div>
      {fout && <p className="error">{fout}</p>}
    </div>
  );
}

export default TaskForm;
