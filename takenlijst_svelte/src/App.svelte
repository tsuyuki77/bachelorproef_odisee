<script>
  import "./style.css";
  import { onMount } from "svelte";

  const STORAGE_KEY = "taken";

  let nieuwetitel = "";
  let taken = []; // { id: number, titel: string, done: boolean }

  let bewerkId = null;
  let bewerktitel = "";

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
  function addtaak() {
    const titel = nieuwetitel.trim();
    if (!titel) return;

    taken.push({ 
      id: Date.now(), 
      titel: titel, 
      done: false 
    });
    
    nieuwetitel = "";

    opslaan();
    taken = taken; // trigger update
  }

  // Delete
  function removetaak(id) {
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) {
        taken.splice(i, 1);
        break;
      }
    }
    opslaan();
    taken = taken;
  }

  // Done toggle
  function toggleDone(id) {
    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) {
        taken[i].done = !taken[i].done;
        break;
      }
    }
    opslaan();
    taken = taken;
  }

  // Annuleer Update
  function AnnuleerUpdate() {
    bewerkId = null;
    bewerktitel = "";
  }

  // opslaan Update
  function opslaanUpdate(id) {
    const titel = bewerktitel.trim();
    if (!titel) return;

    for (let i = 0; i < taken.length; i++) {
      if (taken[i].id == id) {
        taken[i].titel = titel;
        break;
      }
    }

    AnnuleerUpdate();
    opslaan();
    taken = taken;
  }
</script>

<div class="page">
  <h1>Takenlijst</h1>

  <div class="add">
    <input bind:value={nieuwetitel} placeholder="Nieuwe taak..."/>
    <button on:click={addtaak}>Toevoegen</button>
  </div>

  <ul>
    {#each taken as taak (taak.id)}
      <li class="row">
        <input type="checkbox" checked={taak.done} on:change={() => toggleDone(taak.id)}/>

        {#if bewerkId != taak.id}
          <span class="titel" class:done={taak.done}>
            {taak.titel}
          </span>

          <div class="actions">
            <button on:click={() => { bewerkId = taak.id; bewerktitel = taak.titel; }}>Bewerk</button>            
            <button on:click={() => removetaak(taak.id)}>Verwijder</button>
          </div>
        {:else}
          <input bind:value={bewerktitel}/>

          <div class="actions">
            <button on:click={() => opslaanUpdate(taak.id)}>Opslaan</button>
            <button on:click={AnnuleerUpdate}>Annuleer</button>
          </div>
        {/if}
      </li>
    {/each}
  </ul>

  {#if taken.length == 0}
    <p>Nog geen taken.</p>
  {/if}
</div>