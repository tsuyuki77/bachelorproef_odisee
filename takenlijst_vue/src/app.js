import { ref, onMounted, watch } from "vue";

const STORAGE_KEY = "taken";

export function usetaken() {
  const newTitle = ref("");
  const taken = ref([]); // { id: number, title: string, done: boolean }

  const editingId = ref(null);
  const editingTitle = ref("");

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
    const title = newTitle.value.trim();
    if (!title) return;

    taken.value.push({
      id: Date.now(),
      title,
      done: false,
    });

    newTitle.value = "";
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
    editingTitle.value = taak.title;
  }

  // Cancel edit
  function cancelEdit() {
    editingId.value = null;
    editingTitle.value = "";
  }

  // Save edit
  function saveEdit(id) {
    const title = editingTitle.value.trim();
    if (!title) return;

    const taak = taken.value.find((t) => t.id == id);
    if (taak) taak.title = title;

    cancelEdit();
  }

  return {
    newTitle,
    taken,
    editingId,
    editingTitle,
    addtaak,
    removetaak,
    toggleDone,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}