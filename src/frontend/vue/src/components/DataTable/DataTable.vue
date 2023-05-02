<template>
  <PaginationBar
    v-if="paginationbarOptions.showTop === true && props.dataList.data.length > 0"
    :list-to-paginate="dataList.pagination"
    :list-filters="dataList.filters"
   >

  </PaginationBar>

  <section class="ui-datatable_wrap" v-if="props.dataList.data.length > 0">

  <ListActionButtons v-if="listActionButtonsOptions.showTop === true"
    @click-add-new="$emit('clickAddNew')"
    @click-selection="toggleSelectionHandler(props.dataList.data, allItemsSelected)"
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
            @click.prevent="toggleSelectionHandler(props.dataList.data, allItemsSelected)"
          >
        </th>

        <th 
          v-for="dataKey in dataKeys" 
          :key="dataKey.key" 
          class="list-header list-header-flex list-header-sortable"
          @click="$emit('clickTableHeading', dataKey.key)"

        >
          {{ dataKey.name }}
        </th>

        <th v-if="tableOptions.showAction === true" class="list-header list-header-medium list-cell_center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in props.dataList.data" :key="data[dataKeyId]">
        <td v-if="tableOptions.showSelection === true" class="list-cell_center"><input type="checkbox" v-model="data.selected"></td>
        <td v-for="dataKey in dataKeys" :key="dataKey.key">{{ data[dataKey.key] }}</td>
        <td class="list-cell_center" @click="currentItem.value = data">
          <div class="actionMenu_wrap">
            <button 
              class="actionMenu_btn" 
              @click="DataTableActionButtonHandler($event, actionMenuVisible, currentItem, data, actionMenu)" 
              title="Show Actions"
            >
              ☰
            </button>
          </div>
        </td>
      </tr>
    </tbody>

  </table>

  <ActionMenu
    @update-actionMenuRef="(ref) => actionMenu.value = ref"
    @update-actionMenuVisible="(value) => actionMenuVisible.value = value"
    :action-menu-visible="actionMenuVisible"
  >
    <slot name="actionMenuEntries"></slot>
  </ActionMenu>

  <ListActionButtons v-if="listActionButtonsOptions.showBottom === true"
    @click-add-new="$emit('clickAddNew')"
    @click-selection="toggleSelectionHandler(props.dataList.data, allItemsSelected)"
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

  </section>

</template>


<script setup>

import { ref, reactive, watch, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import ListActionButtons from "./ListActionButtons.vue";
import PaginationBar from "../PaginationBar/PaginationBar.vue";
import ActionMenu from "../ActionMenu.vue";
import { actionButtonHandler } from "../ActionMenu.functions.js";


  const props = defineProps([
    "tableOptions", 
    "dataList", 
    "dataKeyId",
    "dataKeys", 
    "listActionButtonsOptions",
    "paginationbarOptions"
  ]);

  const emit = defineEmits(["updateCurrentItem", "updateSelectedItems", "clickAddNew", "clickDelSelected", "clickTableHeading"]);

  const actionMenu = reactive({ value: {} });

  const currentItem = reactive({ value: {} });
  const actionMenuVisible = reactive({ value: false });

  const toggleSelection = ref(Date.now());

  const selectedItems = computed( () => {
    if (!Array.isArray(props.dataList.data)) return [];
    return props.dataList.data.filter(item => item.selected === true)
  });
  const allItemsSelected = computed( () => (selectedItems.value.length === props.dataList.data.length) ? true : false )
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
  function DataTableActionButtonHandler(event, actionMenuVisible, currentItem, currentData, actionMenu) {
    currentItem.value = currentData;
    actionButtonHandler(event, actionMenuVisible, actionMenu)
  }


  watch(currentItem, () => {
    emit("updateCurrentItem", currentItem)
  });

  watch(selectedItems, () => {
    emit("updateSelectedItems", selectedItems)
  });


</script>


<style>

  .ui-datatable_wrap {
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .ui-datatable_wrap > *:first-child {
    border-radius: var(--border-radius-top);
  }

  .ui-datatable_wrap > *:last-child {
    border-radius:  var(--border-radius-bottom);
  }

  .ui-datatable_message {
    padding: 2rem;
    font-weight: 400;
    background-color: azure;
  }

  .ui-datatable {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    word-break: break-all;
    text-align: left;
  }

  .ui-datatable thead th {
    background-color: hsl(33, 100%, 80%);
    font-weight: 600;
  }

  .ui-datatable tbody td {
    transition: background-color 0.2s;
  }

  .ui-datatable_wrap > .ui-datatable:first-child tr:first-child th:first-child {
    border-radius: 8px 0px 0px 0px;
  }

  .ui-datatable_wrap > .ui-datatable:first-child tr:first-child th:last-child {
    border-radius: 0px 8px 0px 0px;
  }

  .ui-datatable_wrap > .ui-datatable:last-child tr:last-child td:last-child {
    border-radius: 0px 0px 8px 0px;
  }

  .ui-datatable_wrap > .ui-datatable:last-child tr:last-child td:first-child {
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

  .actionMenu_wrap {
    position: relative;
    width: max-content;
    margin: 0 auto;
  }

  .list-header-sortable {
    cursor: pointer;
    transition: all .25s;
  }

  .list-header-sortable:focus,
  .list-header-sortable:hover {
    color: #646cff;
  }

  .actionMenu_btn {
    margin: 0;
    padding: 0.4rem 0.8rem;
  }

  .actionMenu_btn > * {
    pointer-events: none;
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
    right: 0;
    top: 0;
    width: max-content;
    z-index: 999;
  }

  .actionMenu_menu li {
    transition: background-color 0.2s;
    border-radius: var(--border-radius);
    padding: .25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

  }

  .actionMenu_menu li:hover {

    background-color: #646cff;
    cursor: pointer;

  }


</style>