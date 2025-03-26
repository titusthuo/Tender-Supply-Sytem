import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'

// To this
createApp(App)
  .use(router)  // Add the router to your Vue application
  .mount('#app')
  .use(Icon)  // Add the Iconify plugin to your Vue application
