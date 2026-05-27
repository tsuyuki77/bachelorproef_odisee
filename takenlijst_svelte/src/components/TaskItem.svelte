<script>
  export let taak;
  export let onToggle;
  export let onRemove;
  export let onUpdate;

  let bewerkModus = false;
  let bewerktitel = '';

  function startBewerk() { bewerkModus = true; bewerktitel = taak.titel; }

  // Annuleer Update
  function AnnuleerUpdate() { bewerkModus = false; bewerktitel = ''; }

  // opslaan Update
  function opslaanUpdate() {
    const titel = bewerktitel.trim();
    if (!titel) return;
    onUpdate(taak.id, titel);
    bewerkModus = false;
    bewerktitel = '';
  }
</script>

<li class="row prioriteit-{taak.prioriteit}">
  <input type="checkbox" checked={taak.done} on:change={() => onToggle(taak.id)}/>
  {#if !bewerkModus}
    <span class="titel" class:done={taak.done}>{taak.titel}</span>
    <div class="actions">
      <button on:click={startBewerk}>Bewerk</button>
      <button on:click={() => onRemove(taak.id)}>Verwijder</button>
    </div>
  {:else}
    <input bind:value={bewerktitel} on:keyup={(e) => e.key === 'Enter' && opslaanUpdate()}/>
    <div class="actions">
      <button on:click={opslaanUpdate}>Opslaan</button>
      <button on:click={AnnuleerUpdate}>Annuleer</button>
    </div>
  {/if}
</li>
