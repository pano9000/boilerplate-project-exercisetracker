<template>

<h2> {{ title }}</h2>
  <DataTablePage
    :options="{
      listName: `Exercises`,
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
        textAddNew: `Add New Exercise`,
        showAdd: true,
        showSelect: true,
        showDelete: true,
      },
      apiFunc: {
        load: getAllExercises,
        delete: deleteExerciseById
      },
      dataProcessing: dataProcessing
    }"

  >

  </DataTablePage>


</template>


<script setup>
  import { ref, onMounted } from 'vue';
  import DataTablePage from '../components/DataTablePage.vue';
  import { DataTableKey } from "../services/utils";
  import { useDataListStore } from "../stores/DataListStore";

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