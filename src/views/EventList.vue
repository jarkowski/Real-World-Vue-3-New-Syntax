<script setup>
import EventCard from '@/components/EventCard.vue'
import { onMounted, ref, watch, computed } from 'vue'
import EventService from '@/services/EventService'

const props = defineProps(['page'])

const events = ref(null);
const totalEvents = ref(0);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages;
})

const pageSize = 2; // keep same page size as EventService.getEvents
const totalPages = computed(() => Math.ceil((Number(totalEvents.value) || 0) / pageSize));

// optional: log when totalEvents changes (for debugging)
watch(totalEvents, (val) => {
  console.log('totalEvents updated ->', val);
  console.log('totalPages now ->', totalPages.value);
});



const fetchEvents = () => {
  EventService.getEvents(2, props.page)
    .then((response) => {
      events.value = response.data;
      totalEvents.value = response.headers["x-total-count"]
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  fetchEvents()
})

watch(
  () => props.page,
  () => {
    events.value = null
    fetchEvents()
  }
)


</script>

<template>
<h1>Events For Good</h1>
<div class="events">
  <EventCard v-for="event in events" :key="event.id" :event="event" />
  <div class="pagination">
    <router-link class="active" id="page-prev" :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev"
      v-if="page != 1">
      &#60; Previos</router-link> |

    <span v-for="n in totalPages">
      <router-link :to="{ name: 'event-list', query: { page: n } }">
        <span :id="`page-${n}`" :class="page === n ? 'active' : 'inactive'">
          {{ n }}
        </span> |
      </router-link>
    </span>

    <router-link class="active" id="page-next" :to="{ name: 'event-list', query: { page: page + 1 } }"
      v-if="hasNextPage" rel="next">
      Next &#62;
    </router-link>
    <p>Total Pages: {{ totalPages }}
      | Total Events: {{ totalEvents }} | Current page: {{ page }}</p>

  </div>
</div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.active {
  font-weight: bold;
  color: red;
  border-style: solid;
  border-radius: 4px;
  border-spacing: 4px;
  padding: 6px;
}

.inactive {

  color: rgb(0, 0, 0);
  border-style: solid;
  border-radius: 4px;
  border-spacing: 4px;
  padding: 6px;
}
</style>
