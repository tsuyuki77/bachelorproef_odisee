import { ref, onMounted, watch } from "vue";

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
    taken.value.push({ id: Date.now(), titel, done: false, prioriteit });
  }

  // Delete
  function removetaak(id) {
    taken.value = taken.value.filter((t) => t.id != id);
  }

  // Done toggle
  function toggleDone(id) {
    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.done = !taak.done;
  }

  // Update
  function updateTaak(id, titel) {
    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.titel = titel;
  }

  return { taken, addtaak, removetaak, toggleDone, updateTaak };
}
