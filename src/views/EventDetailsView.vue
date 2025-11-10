<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../services/EventService'

const event = ref(null)
const id = ref(123)

onMounted(() => {
    EventService.getEvent(id.value)
        .then((response) => {

            event.value = response.data;
            console.log('id.value: ' + id.value);
            console.log('event.value: ' + event.value);
            console.log('response.data: ' + response.data);
        }).catch((error) => {
            console.log("Error: ");
            console.log(error)
        })
})

</script>
<template>
<RouterLink to="/event/123" class="event-link">
    <div class="event-card">
        <h2>{{ event.title }}</h2>
        <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
</RouterLink>
</template>

<style scoped>
.event-link {
    text-decoration: none;
    color: inherit;
    display: block;
    /* optional, makes the whole div clickable cleanly */
}
</style>