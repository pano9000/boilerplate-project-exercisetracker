<template>
  <h2> {{ title }}</h2>
  <ExerciseFilters
    @click-load-exercises="(exerciseFilters) => loadExerciseHandler(exerciseFilters, exerciseList)"
  >

  </ExerciseFilters>

  <section v-if="exerciseList.value.length > 0">
 
  <DataTable
    :table-options="{showSelection: true, showAction: true}"
    :list-action-buttons-options="{showBottom: true, showTop: false, showAdd: false}"
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
    @click-del-selected="deleteExerciseHandler(selectedExercises.value, userList.value)"
  >
    <template v-slot:actionMenuEntries>
      <li @click="uiVisibilityHandler(uiVisibility, 'exerciseDetails')" title="Edit Exercise"><IconPencil></IconPencil> Edit Exercise</li>
      <li @click="deleteExerciseHandler([currentExercise.value], userList.value)" title="Delete Exercise"><IconX></IconX> Delete Exercise</li>
    </template>

  </DataTable>



</section>





</template>

<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { getAllExercises } from "../../services/apiEndpoints";
  import DataTable from "../DataTable/DataTable.vue";
  import ExerciseFilters from "../ExerciseFilters.vue";
  import { uiVisibilityHandler, updateValue } from "../../services/utils";
  import { IconX, IconPencil } from "@tabler/icons-vue"


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
        exerciseList.value = apiResponse.data.log.map(entry => {
          entry.date = new Date(entry.date).toLocaleDateString()
          return entry
        });
        //return apiResponse.data
      }
      catch(error) {
        console.log("error fetchexercise", error)
      }
  }

  async function deleteExerciseHandler() {
    //#TODO
  }




</script>

<style>
</style>