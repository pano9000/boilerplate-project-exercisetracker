import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import UiAdmin from "./UiAdmin.vue"


const routes = [
  { path: '/', component: UiAdmin },
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes: routes
} )


const app = createApp(App)
app.use(router)
app.mount('#app')