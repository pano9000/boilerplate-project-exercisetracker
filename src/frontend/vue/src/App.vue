<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MenuBar from "./components/MenuBar.vue"
import UserList from "./components/UserList/UserList.vue"
import { ref } from 'vue';
const menuItems = ref({
  userList: {
    title: "User List",
    visible: true,
    id: "userList",
  },
  exerciseList: {
    title: "Exercise List",
    visible: false,
    id: "exerciseList",
  }
})


</script>

<template>
  <!--
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
-->

  <div id="display-area">
    <!--<HelloWorld msg="Vite + Vue" />-->
    <MenuBar 
      :menuItems="menuItems"></MenuBar>
      <section v-show="menuItems.userList.visible">
        <UserList />
      </section>
      <section v-show="menuItems.exerciseList.visible">
        <h2>Todo</h2>
      </section>

  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
