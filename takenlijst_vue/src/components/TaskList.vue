<template>
  <div>
    <ul>
      <TaskItem v-for="taak in taken" :key="taak.id" :taak="taak" @toggle="$emit('toggle', $event)" @remove="$emit('remove', $event)" @update="$emit('update', $event)"/>
    </ul>
    <p v-if="taken.length === 0">Nog geen taken.</p>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue';
defineProps(['taken']);
defineEmits(['toggle', 'remove', 'update']);
</script>
