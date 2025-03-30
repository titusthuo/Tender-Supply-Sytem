import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'

// Create the app instance
const app = createApp(App)

// Add plugins before mounting
app.use(router)
app.use(Icon)

// Mount after all plugins are added
app.mount('#app')