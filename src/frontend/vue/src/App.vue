<template>
  <!-- User UI
  <div>
    <label>Select UI</label>
    <select v-model="active_ui">
      <option v-for="ui in ['Admin', 'User']" :key="ui" :value="ui.toLowerCase()">{{ ui }}</option>
    </select>
  </div>
-->

  <section v-if="active_ui==='admin'">
    <UiAdmin
      :userList="userList">
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
  import { fetchUsers } from "./components/UserList/UserList.functions";

  const active_ui = ref("admin")

  const userList = ref([]);

  onMounted(  async () => {
    //todo: remove from final / only for dev
    //userList.value = await fetchUsers();
  })


</script>

<style scoped>

</style>
