import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// To this
createApp(App)
  .use(router)  // Add the router to your Vue application
  .mount('#app')
