<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../services/EventService'

const event = ref(null)
const props = defineProps({
    id: {
        required: true,
    },

})


onMounted(() => {
    EventService.getEvent(props.id)
        .then((response) => {

            event.value = response.data;

        }).catch((error) => {
            console.log(error)
        })
})

</script>
<template>
<div v-if="event" class="event-card">
    <h2>{{ event.title }}</h2>
    <span>@{{ event.time }} on {{ event.date }}</span>
</div>
</template>
