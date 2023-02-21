<template>
  <div id="display-area">
    <!--<HelloWorld msg="Vite + Vue" />-->
    <MenuBar 
      :menuItems="menuItems"></MenuBar>
      <section v-show="menuItems.userList.visible">
        <UserList />
      </section>
      <section v-if="menuItems.exerciseList.visible">
        <ExerciseListAll>
        </ExerciseListAll>
      </section>
  </div>
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

</style>
