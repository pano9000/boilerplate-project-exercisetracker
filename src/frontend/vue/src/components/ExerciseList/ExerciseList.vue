<template>
  <h3>User Exercise Log</h3>
  Number of Exercises: {{ exerciseList.value.count }}
  exercise log
 <div> {{ currentUser }} </div> 
  <form>
    <label>Date From</label>
    <input type="date" v-model="filterProps.dateFrom">
    <label>Date To</label>
    <input type="date" v-model="filterProps.dateTo">

    <label>Limit</label>
    <select v-model="filterProps.limit">
      <option v-for="limit in [5, 10, 25, 50]" :key="limit">{{ limit }}</option>
    </select>
    <button @click="loadExerciseHandler(currentUser, filterProps, exerciseList)">Load Exercises</button>
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
          <tr v-for="(exercise, index) in exerciseList.value.log" :key="`exercise_${index}`">
            <td>{{ exercise.date }}</td>
            <td>{{ exercise.description }}</td>
            <td>{{ exercise.duration }}</td>
          </tr>
        </tbody>
      </table>
    </section>
</template>

<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { sendToAPI } from "../../services/apiService";

const props = defineProps(["currentUser"])
const filterProps = ref({
    limit: 5
  });

  const exerciseList = reactive({
    value: ""
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

  async function loadExerciseHandler(currentUser, filterProps, exerciseList) {

      try {
        console.log("currentUser", currentUser)
        const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${currentUser}/logs?limit=${filterProps.limit}`)
        console.log(apiResponse)
        exerciseList.value = apiResponse.data
        //return apiResponse.data
      }
      catch(error) {
        console.log("error fetchexercise", error)
      }
  }


</script>

<style>

</style>