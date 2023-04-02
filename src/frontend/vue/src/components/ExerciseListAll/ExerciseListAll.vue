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
        :data-list="exerciseList"
        :data-keys="[
          {name: 'User Id', key: 'userId'},
          {name: 'Exercise Id', key: '_id'},
          {name: 'Date', key: 'date'},
          {name: 'Description', key: 'description'},
          {name: 'Duration (min)', key: 'duration'},
        ]"
        :data-key-id="'_id'"
        @update-current-item="(newValue) => updateValue(newValue, currentExercise)"
        @update-selected-items="(newValue) => updateValue(newValue, selectedExercises)"
        @click-del-selected="deleteExerciseHandler(selectedExercises.value, exerciseList.value)"
        @click-table-heading="(dataKeyId) => tableHeadingSortHandler(dataKeyId)"

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
  import { uiVisibilityHandler, updateValue, tableHeadingSortHandler } from "../../services/utils";
  import { IconX, IconPencil } from "@tabler/icons-vue"
  import ActionMenuEntry from "../ActionMenuEntry.vue";
  import LoadingSpinner from "../Loading-Spinner.vue";
  import DataTableFilters from "../DataTableFilters/DataTableFilters.vue";

  const dataTableFiltersSortByOptions = [
    { name: "Date", value: "date" },
    { name: "Description", value: "description" },
    { name: "Duration", value: "duration" },
    { name: "User Id", value: "userId" },
    { name: "Exercise Id", value: "_id" },
  ]


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


  /**
   * 
   * @param {*} exerciseFilters filters from DataTableFilters
   * @param {*} exerciseList reactive list
   */
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