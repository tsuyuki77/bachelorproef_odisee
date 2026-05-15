import { ref, onMounted, watch } from "vue";

const STORAGE_KEY = "taken";

export function usetaken() {
  const newtitel = ref("");
  const taken = ref([]); // { id: number, titel: string, done: boolean }

  const editingId = ref(null);
  const editingtitel = ref("");

  // Load from localStorage
  onMounted(() => {
    const localstore = localStorage.getItem(STORAGE_KEY);
    taken.value = localstore ? JSON.parse(localstore) : [];
  });

  // Auto-save
  watch(
    taken,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  );

  // Create
  function addtaak() {
    const titel = newtitel.value.trim();
    if (!titel) return;

    taken.value.push({
      id: Date.now(),
      titel,
      done: false,
    });

    newtitel.value = "";
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

  // Start edit
  function startEdit(taak) {
    editingId.value = taak.id;
    editingtitel.value = taak.titel;
  }

  // Cancel edit
  function cancelEdit() {
    editingId.value = null;
    editingtitel.value = "";
  }

  // Save edit
  function saveEdit(id) {
    const titel = editingtitel.value.trim();
    if (!titel) return;

    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.titel = titel;

    cancelEdit();
  }

  return {
    newtitel,
    taken,
    editingId,
    editingtitel,
    addtaak,
    removetaak,
    toggleDone,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}