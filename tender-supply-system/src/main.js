import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Change this line
createApp(App).mount('#app')

// To this
createApp(App)
  .use(router)  // Add the router to your Vue application
  .mount('#app')
