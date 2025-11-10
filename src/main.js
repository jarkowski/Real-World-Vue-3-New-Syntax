import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

console.log('All routes:', router.getRoutes().map(r => ({
    name: r.name,
    path: r.path
})))

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
