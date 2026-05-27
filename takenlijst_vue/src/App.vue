<template>
  <div class="page">
    <h1>Takenlijst</h1>
    <TaskForm :onAdd="addtaak"/>
    <ul>
      <TaskItem v-for="taak in taken" :key="taak.id" :taak="taak" :onToggle="toggleDone" :onRemove="removetaak" :onUpdate="updateTaak"/>
    </ul>
    <p v-if="taken.length === 0">Nog geen taken.</p>
  </div>
</template>

<script setup>
import TaskForm from './components/TaskForm.vue';
import TaskItem from './components/TaskItem.vue';
import { usetaken } from './app.js';
const { taken, addtaak, removetaak, toggleDone, updateTaak } = usetaken();
</script>

<style scoped src="./style.css"></style>
