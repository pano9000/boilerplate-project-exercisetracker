<template>
  <h2> {{ title }}</h2>
  <ExerciseFilters
    @click-load-exercises="(exerciseFilters) => loadExerciseHandler(exerciseFilters, exerciseList)"
  >

  </ExerciseFilters>

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
      <li @click="uiVisibilityHandler(uiVisibility, 'exerciseDetails')" title="Edit Exercise">✏️ Edit Exercise</li>
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
  import { getAllExercises } from "../../services/apiEndpoints";
  import CreateExercise from "../CreateExercise/CreateExercise.vue";
  import DataTable from "../DataTable/DataTable.vue";
  import ExerciseFilters from "../ExerciseFilters.vue";
  import { uiVisibilityHandler } from "../../services/utils";

  const title = "User Exercise Logs";
  const userList = reactive({ value: [] });
  const currentExercise = reactive({ value: {} });
  const selectedExercises = reactive({ value: [] });

  const exerciseCount = reactive({
    value: ""
  });
  const exerciseList = reactive({
    value: []
  });

  const ui_createExerciseVisible = ref(false);

  const uiVisibility = reactive( {
    value: {
      exerciseDetails: false,
    }
  });


  async function loadExerciseHandler(exerciseFilters, exerciseList) {

      try {
        const apiResponse = await getAllExercises(exerciseFilters);
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
</style>