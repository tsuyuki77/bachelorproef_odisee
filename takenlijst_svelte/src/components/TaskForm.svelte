<script>
  export let onAdd;

  let nieuwetitel = '';
  let prioriteit = 'normaal';
  let fout = '';

  function handleAdd() {
    const titel = nieuwetitel.trim();
    if (!titel) { fout = 'Titel is verplicht.'; return; }
    if (titel.length < 3) { fout = 'Titel moet minstens 3 tekens bevatten.'; return; }
    fout = '';
    onAdd(titel, prioriteit);
    nieuwetitel = '';
    prioriteit = 'normaal';
  }
</script>

<div>
  <div class="add">
    <input bind:value={nieuwetitel} placeholder="Nieuwe taak..." on:keyup={(e) => e.key === 'Enter' && handleAdd()}/>
    <select class="prioriteit-select" bind:value={prioriteit}>
      <option value="laag">Laag</option>
      <option value="normaal">Normaal</option>
      <option value="hoog">Hoog</option>
    </select>
    <button on:click={handleAdd}>Toevoegen</button>
  </div>
  {#if fout}
    <p class="error">{fout}</p>
  {/if}
</div>
