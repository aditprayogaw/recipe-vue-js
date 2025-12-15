import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap.js"
import { store } from './store/index.js'
import router from './routes.js'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')