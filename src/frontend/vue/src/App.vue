<template>
  <h1>Exercise Tracker</h1>
  

  <section v-if="active_ui==='admin'">
    <UiAdmin>
    </UiAdmin>
  </section>
  <!-- User UI
  <section v-if="active_ui==='user'">
    <UiUser
     :userList="userList">
    </UiUser>
  </section>
  -->
  <footer>
    <p>Boilerplate By <a href="https://www.freecodecamp.org/">freeCodeCamp</a></p>
    <p>Solution by <a href="https://github.com/pano9000">pano9000</a></p>
  </footer>
</template>

<script setup>
  import UiAdmin from "./UiAdmin.vue"
  import UiUser from "./UiUser.vue"
  import { ref, onMounted } from 'vue';

  const active_ui = ref("admin")

</script>

<style scoped>

</style>
