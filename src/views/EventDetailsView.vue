<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../services/EventService'

const event = ref(null)
const props = defineProps({
    id: {
        required: true,
    },
    mode: {
        required: true,
    },

})


onMounted(() => {
    EventService.getEvent(props.id, props.mode)
        .then((response) => {
            console.log(props.mode);
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
    <p v-if="props.mode == 'more'"> The mode: {{ props.mode }} </p>
</div>
</template>
