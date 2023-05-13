<template>
  <MenuBar 
    :menuItems="menuItems"
    :options="{ showLogin: true }"
  >
  </MenuBar>

  <section class="ui_section">
    <RouterView></RouterView>
  </section>

</template>

<script setup>
  import MenuBar from "./components/MenuBar.vue";
  import { ref } from 'vue';

  const menuItems = ref({
    userList: {
      title: "User List",
      visible: true,
      id: "userList",
      path: "/userlist"
    },
    exerciseList: {
      title: "Exercise List",
      visible: false,
      id: "exerciseList",
      path: "/exerciselist"
    }
  });

</script>

<style>
.ui_section {
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: inset var(--box-shadow);
  margin-top: 2rem;
}

.ui_section h2 {

  margin: 0;

}

</style>
