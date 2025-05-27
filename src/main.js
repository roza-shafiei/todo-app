import './assets/main.css'
import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin } from '@formkit/vue'
import formkitConfig from './formkit.config'


const app = createApp(App)
app.use(plugin, formkitConfig)
app.use(router)
app.mount('#app')
