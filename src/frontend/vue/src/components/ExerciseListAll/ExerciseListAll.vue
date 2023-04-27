<template>
  <h2> {{ title }}</h2>

  <DataTableFilters
    :options="{
      actionButtonText: 'Load Exercises',
      sortByOptions: sortedDataTableKeys
    }"
    @click-action-button="(exerciseFilters) => loadExerciseHandler(exerciseFilters, exerciseList)"
  >
  </DataTableFilters>

  <Transition mode="out-in">

    <LoadingSpinner v-if="isLoading">
    </LoadingSpinner>

    <section v-else>
  
      <DataTable
        :table-options="{showSelection: true, showAction: true}"
        :list-action-buttons-options="{showBottom: true, showTop: false, showAdd: false}"
        :paginationbar-options="{allowSelection: true, showTop: true, showBottom: false}"
        :data-list="exerciseList"
        :data-keys="dataTableKeys"
        :data-key-id="'_id'"
        @update-current-item="(newValue) => updateValue(newValue, currentExercise)"
        @update-selected-items="(newValue) => updateValue(newValue, selectedExercises)"
        @click-del-selected="deleteExerciseHandler(selectedExercises.value, exerciseList.value)"
        @click-table-heading="(dataKeyId) => tableHeadingSortHandler(dataKeyId, dataTableKeys, filtersStore.filters, exerciseList, loadExerciseHandler)"

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

      <div class="ui-section-bgwrap"  v-if="messageBoxOptions.value.visible === true">
        <MessageBox
          :options="messageBoxOptions.value"
          >
        </MessageBox>
      </div>

    </section>
  
  </Transition>

</template>

<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { getAllExercises, deleteExerciseById } from "../../services/apiEndpoints";
  import { handleApiResponse } from "../../services/apiService";
  import DataTable from "../DataTable/DataTable.vue";
  import { uiVisibilityHandler, updateValue, tableHeadingSortHandler, DataTableKey } from "../../services/utils";
  import { IconX, IconPencil } from "@tabler/icons-vue"
  import ActionMenuEntry from "../ActionMenuEntry.vue";
  import LoadingSpinner from "../Loading-Spinner.vue";
  import DataTableFilters from "../DataTableFilters/DataTableFilters.vue";
  import MessageBox from "../MessageBox.vue";
  import { MessageBoxOptions } from "../MessageBox.functions";
  import { useDataTableFiltersStore } from "../../stores/DataTableFilterStore"

  const dataTableKeys = ref([
    new DataTableKey("Exercise Id", "_id"),
    new DataTableKey("User Id", "userId"),
    new DataTableKey("Date", "date", true, true),
    new DataTableKey("Description", "description"),
    new DataTableKey("Duration (min)", "duration"),
  ]);

  const sortedDataTableKeys = [...dataTableKeys.value].sort( (a, b) => {

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;

  });

  const sortByCurrent = computed( () => {
    return dataTableKeys.value.find(sortByOption => sortByOption.currentActive === true)?.key || dataTableKeys["value"][0]["key"]
  });

  const filtersStore = useDataTableFiltersStore();

  filtersStore.filters = {
    limit: 0,
    dateFrom: "",
    dateTo: "",
    sortBy: sortByCurrent,
    sortOrder: "1",
  };

  const isLoading = ref(true)

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

  const messageBoxOptions = reactive({value: ""});


  /**
   * 
   * @param {*} exerciseFilters filters from DataTableFilters
   * @param {*} exerciseList reactive list
   */
  async function loadExerciseHandler(exerciseFilters, exerciseList) {

      try {
        messageBoxOptions.value = MessageBoxOptions(null, null, null, false);
        isLoading.value = true;
        const apiResponse = await getAllExercises(exerciseFilters);
        isLoading.value = false;
        console.log(apiResponse)
        handleApiResponse(apiResponse);
        exerciseCount.value = apiResponse.data.count
        exerciseList.value = apiResponse.data.log.map(entry => {
          entry.date = new Date(entry.date).toLocaleDateString()
          return entry
        });
        if (apiResponse.data.log.length < 1) {
          messageBoxOptions.value = MessageBoxOptions("No Exercises Found", "There were no exercises found with your current filters", "info");
          return
        }
        //return apiResponse.data
      }
      catch(error) {
        console.log("error fetchexercise", error)
        messageBoxOptions.value = MessageBoxOptions("Getting ExerciseList failed", "Error fetching ExerciseList " + error);
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

  onMounted( async () => {
    await loadExerciseHandler(filtersStore.filters, exerciseList);
  })



</script>

<style>
</style>