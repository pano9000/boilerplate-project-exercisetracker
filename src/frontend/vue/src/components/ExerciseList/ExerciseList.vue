<template>
  <h3>User Exercise Log</h3>
  Number of Exercises: {{ exerciseCount.value }}
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
  {{ filterProps }}
  {{ paginatedList }}

    <section>


     <PaginationBar
     v-if="exerciseList.value.length > 0"
     :listToPaginate="exerciseList.value"
      :allowSelection="false"
      @updatePaginatedList="paginatedListFunc"
    >
    </PaginationBar>


      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Description</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exercise, index) in exerciseList.value" :key="`exercise_${index}`">
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
  import PaginationBar from "../PaginationBar/PaginationBar.vue";

const props = defineProps(["currentUser"])
const filterProps = ref({
    limit: 5
  });

  const exerciseCount = reactive({
    value: ""
  });
  const exerciseList = reactive({
    value: []
  });



  function paginatedListFunc(value) {
    console.log("exercissss", value)
    paginatedList.value = value
  }
  const paginatedList = reactive({ value: []});

  async function loadExerciseHandler(currentUser, filterProps, exerciseList) {

      try {
        console.log("currentUser", currentUser)
        const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${currentUser}/logs?limit=${filterProps.limit}`)
        console.log(apiResponse)
        exerciseCount.value = apiResponse.data.count
        exerciseList.value = apiResponse.data.log
        //return apiResponse.data
      }
      catch(error) {
        console.log("error fetchexercise", error)
      }
  }


</script>

<style>

</style>