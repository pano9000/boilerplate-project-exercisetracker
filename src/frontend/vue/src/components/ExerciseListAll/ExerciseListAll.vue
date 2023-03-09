<template>
  <h2> {{ title }}</h2>
  <form>
    <h4>Filter for Exercises</h4>
    <div class="ui-exercise-filter_wrap">

      <div>
        <label for="filter-dateFrom">Date From</label>
        <input id="filter-dateFrom" type="date" v-model="exerciseFilters.dateFrom">
      </div>

      <div>
        <label for="filter-dateTo">Date To</label>
        <input id="filter-dateTo" type="date" v-model="exerciseFilters.dateTo">
      </div>

      <div>
        <label for="filter-limit">Limit</label>
        <select id="filter-limit" v-model="exerciseFilters.limit">
          <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit == 'Show All')? 0 : limit">{{ limit }}</option>
        </select>
      </div>

      <div>
        <label for="filter-sortby">Sort By</label>
        <select id="filter-sortby" v-model="exerciseFilters.sortBy">
          <option v-for="sortby in ['TODO']" :key="sortby">{{ sortby }}</option>
        </select>
      </div>

    </div>

    <button @click="loadExerciseHandler(exerciseFilters, exerciseList)">Show Exercises</button>
  </form>

  <section v-if="exerciseList.value.length > 0">
 
  <DataTable
    :table-options="{showSelection: true, showAction: true}"
    :list-action-buttons-options="{showBottom: true, showTop: false, textAddNew: 'Add New Exercise'}"
    :paginationbar-options="{allowSelection: true, showTop: true, showBottom: false}"
    :tableHeadings="['User Id', 'Exercise Id', 'Date', 'Description', 'Duration (min)']"
    :data-list="exerciseList"
    :dataKeys="[ 
      'userId',
      '_id',
      'date',
      'description',
      'duration',
    ]"
    :dataKeyId="'_id'"
    @update-current-item="(newValue) => updateValue(newValue, currentExercise)"
    @update-selected-items="(newValue) => updateValue(newValue, selectedExercises)"
    @click-add-new="uiVisibility.value.createUser = true"
    @click-del-selected="delUser(selectedExercises.value, userList.value)"
  >
    <template v-slot:actionMenuEntries>
      <li @click="uiVisibilityHandler(currentExercise.value, currentExercise, uiVisibility, 'userDetails')" title="Edit User">✏️ Edit User</li>
      <li @click="delUser([currentExercise.value], userList.value)" title="Delete Exercise">❌ Delete Exercise</li>
    </template>

  </DataTable>


  <section v-if="ui_createExerciseVisible">
    <CreateExercise
      :currentUser="currentUser.value"
    >

    </CreateExercise>

  </section>

</section>





</template>

<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { sendToAPI } from "../../services/apiService";
  import CreateExercise from "../CreateExercise/CreateExercise.vue";
  import DataTable from "../DataTable/DataTable.vue";


  const title = "User Exercise Logs";
  const userList = reactive({ value: [] });
  const currentExercise = reactive({ value: {} });
  const selectedExercises = reactive({ value: [] });


  const exerciseFilters = ref({
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

  const ui_createExerciseVisible = ref(false);


  async function loadExerciseHandler(exerciseFilters, exerciseList) {

    const { limit, dateFrom, dateTo} = exerciseFilters

      try {
        const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/logs?limit=${limit}&from=${dateFrom}&to=${dateTo}`)
        console.log(apiResponse)
        exerciseCount.value = apiResponse.data.count
        exerciseList.value = apiResponse.data.log
        //return apiResponse.data
      }
      catch(error) {
        console.log("error fetchexercise", error)
      }
  }



  function updateValue(newValue, itemToUpdate) {
    itemToUpdate.value = newValue.value
  };


</script>

<style>
.ui-exercise-filter_wrap {
  margin-bottom: 2rem;
}
</style>