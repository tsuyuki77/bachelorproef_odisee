<template>
  <div>
    <div class="add">
      <input v-model="nieuwetitel" placeholder="Nieuwe taak..." @keyup.enter="handleAdd"/>
      <select class="prioriteit-select" v-model="prioriteit">
        <option value="laag">Laag</option>
        <option value="normaal">Normaal</option>
        <option value="hoog">Hoog</option>
      </select>
      <button @click="handleAdd">Toevoegen</button>
    </div>
    <p v-if="fout" class="error">{{ fout }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['onAdd']);
const nieuwetitel = ref('');
const prioriteit = ref('normaal');
const fout = ref('');

function handleAdd() {
  const titel = nieuwetitel.value.trim();
  if (!titel) { fout.value = 'Titel is verplicht.'; return; }
  if (titel.length < 3) { fout.value = 'Titel moet minstens 3 tekens bevatten.'; return; }
  fout.value = '';
  props.onAdd(titel, prioriteit.value);
  nieuwetitel.value = '';
  prioriteit.value = 'normaal';
}
</script>
