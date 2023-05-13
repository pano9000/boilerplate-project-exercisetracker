<template>

  <DataTableFilters
    :options="{
      sortByOptions: sortedDataTableKeys,
      showDateRange: props.options.tableFilters.showDateRange
    }"
  >
  </DataTableFilters>

  <section class="ui-section-bgwrap"  v-if="messageBoxOptions.value.visible === true">
    <MessageBox
      :options="messageBoxOptions.value"
      >
    </MessageBox>
  </section>


  <section v-else>

    <PaginationBar
      v-if="options.paginationBar.showTop === true && options.dataStore.data.length > 0"
      :list-to-paginate="options.dataStore.pagination"
      :list-filters="options.dataStore.filters"
      @update-current-page="loadDataAndHandleMessage()"
    >
    </PaginationBar>

    <LoadingSpinner v-if="options.dataStore.isLoading">
    </LoadingSpinner>

    <section class="ui-datatable_wrap" v-else-if="options.dataStore.data.length > 0">

      <ListActionButtons v-if="options.listActionButtons.showTop === true">
        <template v-slot:listActionButtons>
          <slot name="listActionButtons"></slot>
        </template>
      </ListActionButtons>

      <DataTable
        :table-options="{showSelection: true, showAction: true}"
        :data-list="options.dataStore"
        :data-key-id="'_id'"
        :data-keys="options.dataTableKeys"
        @update-current-item="(newValue) => props.options.dataStore.currentItem = newValue"
        @click-table-heading="(dataKeyId) => tableHeadingSortHandler(dataKeyId, options.dataStore)"
        @click-selection="toggleSelectionHandler(props.options.dataStore.data, props.options.dataStore.allItemsSelected)"
      >
        <template v-slot:actionMenuEntries>
          <slot name="actionMenuEntries"></slot>
        </template>
      </DataTable>

      <ListActionButtons v-if="options.listActionButtons.showBottom === true">
        <template v-slot:listActionButtons>
          <slot name="listActionButtons"></slot>
        </template>
      </ListActionButtons>

    </section>

  </section>

</template>



<script setup>
  import { reactive, onMounted, watch } from 'vue';
  import DataTableFilters from './DataTableFilters/DataTableFilters.vue';
  import PaginationBar from './PaginationBar/PaginationBar.vue';
  import ListActionButtons from './DataTable/ListActionButtons.vue';
  import DataTable from './DataTable/DataTable.vue'

  import MessageBox from "./MessageBox.vue";
  import LoadingSpinner from './Loading-Spinner.vue';
  import { MessageBoxOptions } from "./MessageBox.functions";

  import loadDataHandler from "../services/loadDataHandler";
  import { tableHeadingSortHandler } from "../services/utils";

  const props = defineProps(["options"]);

  const messageBoxOptions = reactive({value: ""});

  const sortedDataTableKeys = [...props.options.dataTableKeys].sort( (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });


  function toggleSelectionHandler(dataList, allItemsSelected) {
    dataList.forEach(item => item.selected = !allItemsSelected);
  }

  function messageBoxHandler(loadDataResp, messageBoxOptions, store) {
    messageBoxOptions.value = MessageBoxOptions(null, null, null, false);

    if (loadDataResp[0] === false) {
      messageBoxOptions.value = MessageBoxOptions(`Loading ${store.name.list} failed`, `Error fetching ${store.name.list}: ${loadDataResp[1]}`);
      return;
    }
    if (store.data.length < 1) {
      messageBoxOptions.value = MessageBoxOptions(`No ${store.name.items} Found`, `There were no ${store.name.items} found with your current filters`, "info");
    }
  }

  async function loadDataAndHandleMessage() {
    const loadStatus = await props.options.dataStore.loadData(props.options.apiFunc.load, props.options.dataProcessing);
    messageBoxHandler(loadStatus, messageBoxOptions, props.options.dataStore)
  }

  onMounted( async () => {
    await loadDataAndHandleMessage()
  })



  const filtersStoreWatchList = (() => {
    const filterKeys = Object.keys(props.options.dataStore.filters);
    return filterKeys.map(filter => () => props.options.dataStore.filters[filter])
  })();

  watch([...filtersStoreWatchList], async (newValue, oldValue) => {
    props.options.dataStore.pagination.currentPage = 1;
    await loadDataAndHandleMessage();
  });



</script>