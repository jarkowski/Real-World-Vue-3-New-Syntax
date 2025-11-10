<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
<div v-if="event" class="event-card">
  <RouterLink class="event-link" :to="{ name: 'event-details', params: { id: event.id, mode: 'normal' } }">
    <h2>{{ event.title }}</h2>
  </RouterLink>
  <RouterLink class="event-link" :to="{ name: 'event-details', params: { id: event.id, mode: 'more' } }">
    <h3>Klick here to show more</h3>
  </RouterLink>
  <span>@{{ event.time }} on {{ event.date }}</span>
</div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
