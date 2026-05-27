import { useState } from 'react';

function TaskItem({ taak, onRemove, onToggle, onUpdate }) {
  const [bewerkModus, setBewerkModus] = useState(false);
  const [bewerktitel, setBewerktitel] = useState('');

  // Annuleer Update
  function AnnuleerUpdate() { setBewerkModus(false); setBewerktitel(''); }

  // opslaan Update
  function opslaanUpdate() {
    const titel = bewerktitel.trim();
    if (!titel) return;
    onUpdate(taak.id, titel);
    setBewerkModus(false);
    setBewerktitel('');
  }

  return (
    <li className={`row prioriteit-${taak.prioriteit}`}>
      <input type="checkbox" checked={taak.done} onChange={() => onToggle(taak.id)} />
      {bewerkModus !== true ? (
        <>
          <span className={taak.done ? "titel done" : "titel"}>{taak.titel}</span>
          <div className="actions">
            <button onClick={() => { setBewerkModus(true); setBewerktitel(taak.titel); }}>Bewerk</button>
            <button onClick={() => onRemove(taak.id)}>Verwijder</button>
          </div>
        </>
      ) : (
        <>
          <input value={bewerktitel} onChange={(e) => setBewerktitel(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && opslaanUpdate()} />
          <div className="actions">
            <button onClick={opslaanUpdate}>Opslaan</button>
            <button onClick={AnnuleerUpdate}>Annuleer</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
