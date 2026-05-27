<template>
  <li class="row" :class="`prioriteit-${taak.prioriteit}`">
    <input type="checkbox" :checked="taak.done" @change="onToggle(taak.id)"/>
    <span v-if="!bewerkModus" :class="{ done: taak.done }" class="titel">{{ taak.titel }}</span>
    <input v-else v-model="bewerktitel" @keyup.enter="opslaanUpdate" @keyup.esc="AnnuleerUpdate"/>
    <div class="actions" v-if="!bewerkModus">
      <button @click="startEdit">Bewerk</button>
      <button @click="onRemove(taak.id)">Verwijder</button>
    </div>
    <div class="actions" v-else>
      <button @click="opslaanUpdate">Opslaan</button>
      <button @click="AnnuleerUpdate">Annuleer</button>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['taak', 'onToggle', 'onRemove', 'onUpdate']);
const bewerkModus = ref(false);
const bewerktitel = ref('');

function startEdit() { bewerkModus.value = true; bewerktitel.value = props.taak.titel; }

// Annuleer Update
function AnnuleerUpdate() { bewerkModus.value = false; bewerktitel.value = ''; }

// opslaan Update
function opslaanUpdate() {
  const titel = bewerktitel.value.trim();
  if (!titel) return;
  props.onUpdate(props.taak.id, titel);
  bewerkModus.value = false;
  bewerktitel.value = '';
}
</script>
