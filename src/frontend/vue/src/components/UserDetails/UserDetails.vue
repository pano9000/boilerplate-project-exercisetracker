<template>
  <!-- show user details, + exercise log-->
  <MenuBar
    :menuItems="menuItems">
  </MenuBar>


  <section v-if="menuItems.userDetails.visible">
    <h2>User Details</h2>
    <div>
      <label for="userId">User ID</label>
      <input id="userId" disabled type="text" :value="currentUser._id">
    </div>
    <div>
      <label>Username</label>
      <input disabled type="text" :value="currentUser.username">
      <button @click="">✏️</button>
    </div>

  </section>

  <section v-if="menuItems.userExerciseList.visible">
    <ExerciseList
    :currentUser="currentUser._id"
    ></ExerciseList>

  </section>

  <section v-if="menuItems.userCreateExercise.visible">
    <CreatExercise
    :currentUser="currentUser._id"
    ></CreatExercise>
  </section>

</template>



<script setup>
  import MenuBar from "../MenuBar.vue";
  import { ref, onBeforeUpdate, onMounted, onUpdated } from "vue";
  import CreatExercise from "../CreateExercise/CreatExercise.vue";
  import ExerciseList from "../ExerciseList/ExerciseList.vue";
  const props = defineProps(["currentUser"]);



  const menuItems = ref({
    userDetails: {
      title: "User Details",
      visible: true,
      id: "userDetails",
    },
    userExerciseList: {
      title: "User Exercise List",
      visible: false,
      id: "userExerciseList"
    },
    userCreateExercise: {
      title: "Create Exercise",
      visible: false,
      id: "userCreateExercise"
    }
  });



</script>