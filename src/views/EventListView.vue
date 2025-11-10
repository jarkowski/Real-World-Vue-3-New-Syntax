<script setup>
import EventCard from '@/components/EventCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const events = ref(null)


onMounted(() => {
  axios.get('https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events')
    .then((response) => {
      console.log('events:', response.data);
      events.value = response.data
    }).catch((error) => {
      console.log(error)
    })
})

</script>

<template>
<h1>Events For Good</h1>
<div class="events">
  <EventCard v-for="event in events" :key="event.id" :event="event" />
</div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
