import './assets/main.css'
import './css-extensions/vue-carousel-extension.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:5000/'

const app = createApp(App).use(Quasar, quasarUserOptions)

app.use(router)

app.mount('#app')
