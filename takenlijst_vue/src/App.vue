<template>
  <div class="page">
    <h1>Takenlijst</h1>

    <div class="add">
      <input v-model="newTitle" placeholder="Nieuwe taak..." @keyup.enter="addtaak"/>
      <button @click="addtaak">Toevoegen</button>
    </div>

    <ul>
      <li v-for="taak in taken" :key="taak.id" class="row">
        <input type="checkbox" :checked="taak.done" @change="toggleDone(taak.id)"/>

        <span v-if="editingId != taak.id" :class="{ done: taak.done }" class="title">
          {{ taak.title }}
        </span>

        <input v-else v-model="editingTitle" @keyup.enter="saveEdit(taak.id)" @keyup.esc="cancelEdit"/>

        <div class="actions" v-if="editingId != taak.id">
          <button @click="startEdit(taak)">Bewerk</button>
          <button @click="removetaak(taak.id)">Verwijder</button>
        </div>

        <div class="actions" v-else>
          <button @click="saveEdit(taak.id)">Opslaan</button>
          <button @click="cancelEdit">Annuleer</button>
        </div>
      </li>
    </ul>

    <p v-if="taken.length == 0">Nog geen taken.</p>
  </div>
</template>

<script setup>
import { usetaken } from "./app.js";

const {
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
} = usetaken();
</script>

<style scoped src="./style.css"></style>