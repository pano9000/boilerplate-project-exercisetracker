<template>
  <h2> {{ title }}</h2>

  <DataTableFilters
    :options="{
      actionButtonText: 'Load Exercises',
      sortByOptions: dataTableFiltersSortByOptions
    }"
    @click-action-button="(exerciseFilters) => loadExerciseHandler(exerciseFilters, exerciseList)"
  >
  </DataTableFilters>

  <Transition mode="out-in">

    <LoadingSpinner v-if="isLoading">
    </LoadingSpinner>

    <section v-else-if="exerciseList.value.length > 0">
  
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
        @click-del-selected="deleteExerciseHandler(selectedExercises.value, exerciseList.value)"
      >
        <template v-slot:actionMenuEntries>
          <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'exerciseDetails')">
            <IconPencil></IconPencil>
            Edit Exercise
          </ActionMenuEntry>
          
          <ActionMenuEntry @action-menu-event="deleteExerciseHandler([currentExercise.value], exerciseList.value)">
            <IconX></IconX> Delete Exercise
          </ActionMenuEntry>
        </template>

      </DataTable>



    </section>
  
  </Transition>

</template>

<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { getAllExercises, deleteExerciseById } from "../../services/apiEndpoints";
  import DataTable from "../DataTable/DataTable.vue";
  import { uiVisibilityHandler, updateValue } from "../../services/utils";
  import { IconX, IconPencil } from "@tabler/icons-vue"
  import ActionMenuEntry from "../ActionMenuEntry.vue";
import LoadingSpinner from "../Loading-Spinner.vue";

  const isLoading = ref(false)

  const title = "User Exercise Logs";

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
        isLoading.value = true;
        const apiResponse = await getAllExercises(exerciseFilters);
        isLoading.value = false;
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

  async function deleteExerciseHandler(selectedExercisesP, exerciseListP) {

    const confirmMessage = (!(selectedExercisesP.length > 1)) ?
    `Are you sure you want to delete the exercise '${selectedExercisesP[0]._id}' of '${selectedExercisesP[0].userId}'` :
    `Are you sure you want to delete the ${selectedExercisesP.length} selected users?`;
    //TODO: replace by some fancy "popup"
    if (confirm(confirmMessage)) {

      await Promise.all(
        selectedExercisesP.map(async (selectedItem) => {
          const indexToDelete = exerciseListP.findIndex( (listEntry) => listEntry["_id"] === selectedItem["_id"]);
          
          const { _id: exercIdForDeletion, userId } = exerciseListP[indexToDelete];
          //console.log(exercIdForDeletion, userId, indexToDelete, exerciseListP)
          const apiResponse = await deleteExerciseById(userId, exercIdForDeletion);
          if (apiResponse.statusOK) {
            exerciseListP.splice(indexToDelete, 1);
          }
        })
      );

    }
  }



</script>

<style>
</style>