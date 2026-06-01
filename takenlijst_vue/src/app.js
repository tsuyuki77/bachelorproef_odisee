import { ref, onMounted, watch, nextTick } from "vue";

const STORAGE_KEY = "taken";

export function usetaken() {
  const taken = ref([]); // { id: number, titel: string, done: boolean }

  // Load from localStorage
  onMounted(() => {
    const localstore = localStorage.getItem(STORAGE_KEY);
    taken.value = localstore ? JSON.parse(localstore) : [];
  });

  // Auto-save
  watch(taken, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true });

  // Create
  function addtaak(titel, prioriteit) {
    const start = performance.now();

    taken.value.push({ id: Date.now(), titel, done: false, prioriteit });

    nextTick(() => {
    const einde = performance.now();
    console.log(`[Vue] Toevoegen: ${(einde - start).toFixed(2)} ms`);
  });
  }

  // Delete
  function removetaak(id) {
    const start = performance.now();

    taken.value = taken.value.filter((t) => t.id != id);

    nextTick(() => {
    const einde = performance.now();
    console.log(`[Vue] Verwijderen: ${(einde - start).toFixed(2)} ms`);
  });
  }

  // Done toggle
  function toggleDone(id) {
    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.done = !taak.done;
  }

  // Update
  function updateTaak(id, titel) {
    const start = performance.now();

    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.titel = titel;

    nextTick(() => {
    const einde = performance.now();
    console.log(`[Vue] Aanpassen: ${(einde - start).toFixed(2)} ms`);
  });
  }

  return { taken, addtaak, removetaak, toggleDone, updateTaak };
}
