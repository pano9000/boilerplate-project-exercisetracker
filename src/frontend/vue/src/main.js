import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import UiAdmin from "./UiAdmin.vue"
import UserList from "./components/UserList/UserList.vue";
import ExerciseList from "./pages/ExerciseList.vue";
import Start from "./pages/Start.vue";

const routes = [
  { path: '/', component: Start },
  { path: "/userlist", component: UserList },
  { path: "/exerciselist", component: ExerciseList }
]

const router = createRouter( {
  history: createWebHistory(),
  routes: routes
} )

const pinia = createPinia();

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')