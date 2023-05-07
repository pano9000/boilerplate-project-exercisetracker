<template>

<h2> {{ title }}</h2>
  <DataTablePage
    :options="{
      dataTableKeys: dataTableKeys,
      dataStore: dataListStore,
      tableFilters: {
        showDateRange: true
      },
      paginationBar: {
        showTop: true
      },
      listActionButtons: {
        showTop: true,
      },
      apiFunc: {
        load: getAllExercises,
        delete: deleteExerciseById
      },
      dataProcessing: dataProcessing
    }"

  >

    <template v-slot:actionMenuEntries>
      <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'exerciseDetails')">
        <IconPencil></IconPencil> Edit Exercise
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="deleteExerciseHandler([currentExercise.value], dataListStore, loadExerciseHandler)">
        <IconX></IconX> Delete Exercise
      </ActionMenuEntry>

    </template>

    <template v-slot:listActionButtons>

      <ListActionButtonEntry
        :options="{disabled: !dataListStore.hasSelectedItems}"
        @list-action-button-event="'#todo'"
      >
        <IconX></IconX>
        Delete Selected Exercises
      </ListActionButtonEntry>

    </template>

  </DataTablePage>


</template>


<script setup>
  import { ref } from 'vue';
  import DataTablePage from '../components/DataTablePage.vue';
  import { DataTableKey } from "../services/utils";
  import { useDataListStore } from "../stores/DataListStore";
  import ActionMenuEntry from "../components/ActionMenuEntry.vue";
  import ListActionButtonEntry from '../components/ListActionButtonEntry.vue';
  import { IconX, IconPencil,  } from "@tabler/icons-vue"

  import { getAllExercises, deleteExerciseById } from '../services/apiEndpoints';
  const dataListStore = useDataListStore();
  
  const title = "Exercise List";

  const dataTableKeys = ref([
    new DataTableKey("Exercise Id", "_id"),
    new DataTableKey("User Id", "userId"),
    new DataTableKey("Date", "date", true, true),
    new DataTableKey("Description", "description"),
    new DataTableKey("Duration (min)", "duration"),
  ]);

  dataListStore.name  = {
      list: "Exercise List",
      item: "Exercise",
      items: "Exercises"
    };

  dataListStore.pagination.currentPage = 1;

  dataListStore.filters = {
    limit: 10,
    from: "",
    to: "",
    sortBy: dataTableKeys.value.find(sortByOption => sortByOption.defaultSortBy === true)?.key || dataTableKeys["value"][0]["key"],
    sortOrder: "1",
  };

  function dataProcessing(store, apiResponse) {
    store.data = apiResponse.response.data.log.map(entry => {
      entry.date = new Date(entry.date).toLocaleDateString()
      return entry
    });
  }
  
  



</script>