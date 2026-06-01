<script>
  import "./style.css";
  import { onMount } from "svelte";
  import TaskForm from "./components/TaskForm.svelte";
  import TaskList from "./components/TaskList.svelte";

  const STORAGE_KEY = "taken";

  let taken = []; // { id: number, titel: string, done: boolean }

  // ophalen uit localStorage
  onMount(() => {
    const localstore = localStorage.getItem(STORAGE_KEY);
    taken = localstore ? JSON.parse(localstore) : [];
  });

  // opslaan in localStorage
  function opslaan() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taken));
  }

  // Create
  function addtaak(titel, prioriteit) {
    const start = performance.now();

    taken.push({ id: Date.now(), titel, done: false, prioriteit });
    taken = taken;
    opslaan();

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[Svelte] Toevoegen: ${(einde - start).toFixed(2)} ms`);
  });
  }

  // Delete
  function removetaak(id) {
    const start = performance.now();
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) { taken.splice(i, 1); break; }
    }
    opslaan();
    taken = taken;

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[Svelte] Verwijderen: ${(einde - start).toFixed(2)} ms`);
  });
  }

  // Done toggle
  function toggleDone(id) {
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) { taken[i].done = !taken[i].done; break; }
    }
    opslaan();
    taken = taken;
  }

  // Update
  function updateTaak(id, titel) {
    const start = performance.now();
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) { taken[i].titel = titel; break; }
    }
    opslaan();
    taken = taken;

    requestAnimationFrame(() => {
    const einde = performance.now();
    console.log(`[Svelte] Aanpassen: ${(einde - start).toFixed(2)} ms`);
  });
  }
</script>

<div class="page">
  <h1>Takenlijst</h1>
  <TaskForm onAdd={addtaak}/>
  <TaskList {taken} onToggle={toggleDone} onRemove={removetaak} onUpdate={updateTaak}/>
</div>
