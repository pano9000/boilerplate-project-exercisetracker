<template>
  

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
</template>

<script setup>
  import UiAdmin from "./UiAdmin.vue"
  import UiUser from "./UiUser.vue"
  import { ref, onMounted } from 'vue';

  const active_ui = ref("admin")

</script>

<style scoped>

</style>
