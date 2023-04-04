import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import UiAdmin from "./UiAdmin.vue"
import UserList from "./components/UserList/UserList.vue";
import ExerciseListAll from "./components/ExerciseListAll/ExerciseListAll.vue";
import Start from "./pages/Start.vue";

const routes = [
  { path: '/', component: Start },
  { path: "/userlist", component: UserList },
  { path: "/exerciselist", component: ExerciseListAll }
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes: routes
} )


const app = createApp(App)
app.use(router)
app.mount('#app')