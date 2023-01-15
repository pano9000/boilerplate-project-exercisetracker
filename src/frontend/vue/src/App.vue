<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MenuBar from "./components/MenuBar.vue"
import CreateUser from "./components/CreateUser.vue"

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div>
    <button>Create</button>
    <button>Read</button>
    <button>Update</button>
    <button>Delete</button>
  </div>

  <div id="display-area">
    <HelloWorld msg="Vite + Vue" />
    <MenuBar />
    <CreateUser />

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
