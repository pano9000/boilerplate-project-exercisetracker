<template>
  <h3>User Exercise Log</h3>
  Number of Exercises: {{ exerciseCount.value }}
  exercise log
 <div> {{ currentUser }} </div> 
  <form>
    <h4>Filter for Exercises</h4>
    <div class="ui_filterwrap">

      <div>
        <label>Date From</label>
        <input type="date" v-model="filterProps.dateFrom">
      </div>
      <div>
        <label>Date To</label>
        <input type="date" v-model="filterProps.dateTo">
      </div>

      <div>

        <label>Limit</label>
        <select v-model="filterProps.limit">
          <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit == 'Show All')? 0 : limit">{{ limit }}</option>
        </select>
      </div>
    </div>
    <button @click="loadExerciseHandler(filterProps, exerciseList)">Load Exercises</button>
  </form>
  {{ filterProps }}
  {{ paginatedList }}

    <section v-if="exerciseList.value.length > 0">


     <PaginationBar
     :listToPaginate="exerciseList.value"
      :allowSelection="false"
      @updatePaginatedList="paginatedListFunc"
    >
    </PaginationBar>

    

    {{ selectedExercises }}

    <table>
    <thead>
      <tr>
        <td class="list-header list-header-narrow">Selection</td>
        <td class="list-header list-header-flex">User Id</td>
        <td class="list-header list-header-flex">Exercise Id</td>
        <td class="list-header list-header-flex">Date</td>
        <td class="list-header list-header-flex">Description</td>
        <td class="list-header list-header-flex">Duration (min)</td>
        <td class="list-header list-header-medium">Edit</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exercise in paginatedList.value" :key="exercise._id">
        <td><input type="checkbox" v-model="exercise.selected"></td>
        <td>{{ exercise.userId }}</td>
        <td>{{ exercise._id }}</td>
        <td>{{ exercise.date }}</td>
        <td>{{ exercise.description }}</td>
        <td>{{ exercise.duration }}</td>
        <td>
          <!--<button @click="showUserDetailsHandler(user, currentUser, ui_UserDetailsVisible)">✏️</button>-->
          <!--<button @click="delUser([user], userList.value)">❌</button>-->
        </td>
      </tr>

    </tbody>
  </table>

</section>





</template>

<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { sendToAPI } from "../../services/apiService";
  import PaginationBar from "../PaginationBar/PaginationBar.vue";

  const props = defineProps(["currentUser"])
  const filterProps = ref({
    limit: 0,
    dateFrom: "",
    dateTo: (new Date()).toISOString().slice(0,10)
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

  const selectedExercises = computed( () => paginatedList.value.filter(exercise => exercise.selected === true) );

  async function loadExerciseHandler(filterProps, exerciseList) {

      try {
        const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/logs?limit=${filterProps.limit}&from=${filterProps.dateFrom}&to=${filterProps.dateTo}`)
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