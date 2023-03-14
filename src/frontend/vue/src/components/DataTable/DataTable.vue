<template>
  <PaginationBar
   v-if="paginationbarOptions.showTop === true"
   :list-to-paginate="dataList.value"
   :allow-selection="paginationbarOptions.allowSelection"
   @update-paginated-list="updatePaginatedListFunc"
   >

  </PaginationBar>

  <ListActionButtons v-if="listActionButtonsOptions.showTop === true"
    @click-add-new="$emit('clickAddNew')"
    @click-selection="toggleSelectionHandler(paginatedList.value, allItemsSelected)"
    @click-del-selected="$emit('clickDelSelected')"
    :hasSelection="hasSelectedItems"
    :options="{ 
      textAddNew: listActionButtonsOptions.textAddNew, 
      showAdd: listActionButtonsOptions.showAdd,
      showSelect: listActionButtonsOptions.showSelect,
      showDelete: listActionButtonsOptions.showDelete
    }"
  >
  </ListActionButtons>
  <table class="ui-datatable">
    <thead>
      <tr>
        <th v-if="tableOptions.showSelection === true" class="list-header list-header-narrow list-cell_center">
          <input
            type="checkbox"
            :checked="hasSelectedItems"
            :key="toggleSelection"
            :title="(!allItemsSelected) ? 'Select All' : 'Deselect All'"
            @click.prevent="toggleSelectionHandler(paginatedList.value, allItemsSelected)"
          >
        </th>
        <th v-for="tableHeading in tableHeadings" :key="tableHeading" class="list-header list-header-flex">{{ tableHeading }}</th>
        <th v-if="tableOptions.showAction === true" class="list-header list-header-medium list-cell_center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in paginatedList.value" :key="data[dataKeyId]">
        <td v-if="tableOptions.showSelection === true" class="list-cell_center"><input type="checkbox" v-model="data.selected"></td>
        <td v-for="dataKey in dataKeys" :key="dataKey">{{ data[dataKey] }}</td>
        <td class="list-cell_center" @click="currentItem.value = data">
          <button 
            class="actionMenu_btn" 
            @click="actionButtonHandler($event, actionMenuVisible, currentItem, data)" 
            title="Show Actions"
          >
            ☰
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <menu ref="actionMenu" class="actionMenu_menu" v-show="actionMenuVisible.value === true">
    <slot name="actionMenuEntries"></slot>
  </menu>

  <ListActionButtons v-if="listActionButtonsOptions.showBottom === true"
    @click-add-new="$emit('clickAddNew')"
    @click-selection="toggleSelectionHandler(paginatedList.value, allItemsSelected)"
    @click-del-selected="$emit('clickDelSelected')"
    :hasSelection="hasSelectedItems"
    :options="{ 
      textAddNew: listActionButtonsOptions.textAddNew, 
      showAdd: listActionButtonsOptions.showAdd,
      showSelect: listActionButtonsOptions.showSelect,
      showDelete: listActionButtonsOptions.showDelete
    }"
  >
  </ListActionButtons>
</template>


<script setup>

import { ref, reactive, watch, computed, onMounted, onBeforeUnmount } from "vue";
import ListActionButtons from "../ListActionButtons/ListActionButtons.vue";
import PaginationBar from "../PaginationBar/PaginationBar.vue";

  const props = defineProps([
    "tableOptions", 
    "tableHeadings", 
    "dataList", 
    "dataKeyId",
    "dataKeys", 
    "listActionButtonsOptions",
    "paginationbarOptions"
  ]);

  const emit = defineEmits(["updateCurrentItem", "updateSelectedItems", "clickAddNew", "clickDelSelected"]);

  const actionMenu = ref(null);
  const currentItem = reactive({ value: {} });
  const actionMenuVisible = reactive({ value: false });

  const toggleSelection = ref(Date.now());

  const paginatedList = reactive({ value: [] });

  const selectedItems = computed( () => paginatedList.value.filter(item => item.selected === true) );
  const allItemsSelected = computed( () => (selectedItems.value.length === paginatedList.value.length) ? true : false )
  const hasSelectedItems = computed( () => (selectedItems.value.length > 0) ? true : false );

  watch( hasSelectedItems, () => {
    toggleSelection.value = Date.now();
    //https://michaelnthiessen.com/force-re-render/
  });

  function toggleSelectionHandler(dataList, allItemsSelected) {
    dataList.forEach(item => item.selected = !allItemsSelected);
  }


  /**
   * 
   * @param {Object} currentItem - reactive object to store the currently selected/active data to
   * @param {Object} data - data object from the data list of the current row
   * @param {Object} actionMenuVisible - reactive object to toggle which action menu is currently visible
   * @param {String} dataKeyId the data lists key Id prop name
   */
  function actionButtonHandler(event, actionMenuVisible, currentItem, currentData) {
    currentItem.value = currentData;

    const actionButtonRect = event.target.getBoundingClientRect();
    const actionMenuRect = actionMenu.value.getBoundingClientRect();

    const x = (actionButtonRect.left - actionMenuRect.width + window.scrollX).toFixed();
    const y = (actionButtonRect.top + window.scrollY).toFixed();

    // Set the position for menu
    actionMenu.value.style.left = `${x}px`;
    actionMenu.value.style.top = `${y}px`;

    actionMenuVisible.value = true;

    actionMenu.value.firstElementChild.focus();

  }
  
  watch(currentItem, () => {
    emit("updateCurrentItem", currentItem)
  });

  watch(selectedItems, () => {
    emit("updateSelectedItems", selectedItems)
  });

  //TODO: Check if we can change it to work with the value instead, then we could use the "updateValue" func here as well
  function updatePaginatedListFunc(updatedValue) {
    paginatedList.value = updatedValue
  };


  function actionMenuDisableVisibility(actionMenuVisible) {
    if (actionMenuVisible.value !== false) {
      actionMenuVisible.value = false
    }
  }

  function actionMenuHandleEscKey(event) {
    if (event.key === "Escape") {
      actionMenuDisableVisibility(actionMenuVisible)
    }
  }

  function actionMenuHandleEmptyClick(event) {
    if (!event.target.classList.contains("actionMenu_btn")) {
      actionMenuDisableVisibility(actionMenuVisible)
    }
  }

  const windowEventListeners = {
    escapeKey: ["keydown", actionMenuHandleEscKey],
    emptyClick: ["click", actionMenuHandleEmptyClick]
  };

  onMounted( () => {
    for (const eventListener in windowEventListeners) {
      window.addEventListener(...windowEventListeners[eventListener])
    }
  });

  onBeforeUnmount( () => {
    for (const eventListener in windowEventListeners) {
      window.removeEventListener(...windowEventListeners[eventListener])
    }
  });

</script>


<style>
  .ui-datatable {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    word-break: break-all;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-align: left;
  }

  .ui-datatable thead th {
    background-color: hsl(33, 100%, 80%);
    font-weight: 600;
  }

  .ui-datatable tbody td {
    transition: background-color 0.2s;
  }

  .ui-datatable tr:first-child th:first-child {
    border-radius: 8px 0px 0px 0px;
  }

  .ui-datatable tr:first-child th:last-child {
    border-radius: 0px 8px 0px 0px;
  }

  .ui-datatable tr:last-child td:last-child {
    border-radius: 0px 0px 8px 0px;
  }

  .ui-datatable tr:last-child td:first-child {
    border-radius: 0px 0px 0px 8px;
  }

  .ui-datatable tbody tr:nth-child(even) td {
    background-color: hsl(60, 56%, 91%);
  }

  .ui-datatable tbody tr:nth-child(odd) td {
    background-color: hsl(60, 56%, 87%);
  }

  .ui-datatable tbody tr:hover td {
    background-color: hsl(60, 56%, 94%);
  }

  .ui-datatable td, .ui-datatable th {
    padding: .75rem;
    border-right: 1px dotted rgb(10,10,10,0.3);
  }

  .ui-datatable tr td:last-child, .ui-datatable tr th:last-child {
    border-right: none;
  }

  .ui-datatable input[type=checkbox] {
    margin: 0;
  }

  .list-cell_center {
    text-align: center;
  }

  .list-header-narrow {
    width: 3rem;
  }

  .list-header-medium {
    width: 6rem;
  }

  .actionMenu_btn {
    margin: 0;
    padding: 0.4rem 0.8rem;
  }

  .actionMenu_menu {
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    background-color: #fdfdfd;
    text-align: left;
    list-style: none;
    margin: 0;
    padding: 0.5rem;
    position: absolute;
  }

  .actionMenu_menu li {
    transition: background-color 0.2s;
    border-radius: var(--border-radius);
    padding: .25rem;

  }

  .actionMenu_menu li:hover {

    background-color: #646cff;
    cursor: pointer;

  }


</style>