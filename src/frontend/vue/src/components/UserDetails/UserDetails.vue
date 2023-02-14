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
    <h3>User Exercise Log</h3>
    Number of Exercises: {{ exercises.count }}
    exercise log
    <form>
      <label>Date From</label>
      <input type="date" v-model="filterProps.dateFrom">
      <label>Date To</label>
      <input type="date" v-model="filterProps.dateTo">

      <label>Limit</label>
      <select v-model="filterProps.limit">
        <option v-for="limit in [5, 10, 25, 50]" :key="limit">{{ limit }}</option>
      </select>
      <button @click="loadExerciseHandler(userId)">Load Exercises</button>
    </form>
      <section>
        {{ filterProps }}

        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Description</td>
              <td>Duration</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exercise, index) in exercises.logs" :key="`exercise_${index}`">
              <td>{{ exercise.date }}</td>
              <td>{{ exercise.description }}</td>
              <td>{{ exercise.duration }}</td>
            </tr>
          </tbody>
        </table>
      </section>
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
  const props = defineProps(["currentUser"]);

  const filterProps = ref({
    limit: 5
  });

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
    }
  });

  const exercises = {
    _id: "123456789",
    username: "username",
    count: 3,
    logs: [
      {
        description: "test1",
        duration: 1,
        date: "Sat Feb 04 2023"
      },
      {
        description: "test2",
        duration: 53,
        date: "Sat Feb 04 2023"
      },
      {
        description: "test3",
        duration: 24,
        date: "Sat Feb 04 2023"
      },
    ]
  }

  const a = ref({})
  onMounted( async () => {
    //console.log(currentUser)

  });

  onBeforeUpdate(
    async () => {
      console.log("yoo on before", props.currentUser);



    })



</script>