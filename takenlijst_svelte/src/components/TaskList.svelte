<script>
  import TaskItem from './TaskItem.svelte';

  export let taken = [];
  export let onToggle;
  export let onRemove;
  export let onUpdate;
</script>

<div>
  <ul>
    {#each taken as taak (taak.id)}
      <TaskItem {taak} {onToggle} {onRemove} {onUpdate}/>
    {/each}
  </ul>
  {#if taken.length === 0}
    <p>Nog geen taken.</p>
  {/if}
</div>
