<template>
  <MenuBar 
    :menuItems="menuItems"
    :options="{ showLogin: true }"
  >
  </MenuBar>

  <h1>Exercise Tracker</h1>

  <section class="ui_section" v-show="menuItems.userList.visible">
    <UserList/>
  </section>

  <section class="ui_section" v-if="menuItems.exerciseList.visible">
    <ExerciseListAll>
    </ExerciseListAll>
  </section>

</template>

<script setup>
  import MenuBar from "./components/MenuBar.vue";
  import UserList from "./components/UserList/UserList.vue";
  import ExerciseListAll from "./components/ExerciseListAll/ExerciseListAll.vue";
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
