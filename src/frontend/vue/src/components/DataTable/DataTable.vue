<template>

  <ListActionButtons v-if="listActionButtonsOptions.showTop === true"
    @click-addNew="$emit('click-addNew')"
    @click-selection="((!hasSelectedItems) ? selectionHandler(dataList.value, true) : selectionHandler(dataList.value, false))"
    @click-delSelected="$emit('click-delSelected')"
    :hasSelection="hasSelectedItems"
    :textAddNew="listActionButtonsOptions.textAddNew"
  >
  </ListActionButtons>

  <table>
    <thead>
      <tr>
        <td v-if="tableOptions.showSelection === true" class="list-header list-header-narrow">
          <input type="checkbox" :checked="hasSelectedItems" :key="toggleSelection"  @click.prevent="toggleSelectionHandler(dataList.value, allItemsSelected)" :title="(!allItemsSelected) ? 'Select All' : 'Deselect All'">
        </td>
        <td v-for="tableHeading in tableHeadings" :key="tableHeading" class="list-header list-header-flex">{{ tableHeading }}</td>
        <td v-if="tableOptions.showAction === true" class="list-header list-header-narrow">Actions</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in dataList.value" :key="data[dataKeyId]">
        <td><input type="checkbox" v-model="data.selected"></td>
        <td v-for="dataKey in dataKeys" :key="dataKey">{{ data[dataKey] }}</td>
        <td @click="selectedItem.value = data">
          <button class="actionMenu_btn" @click="actionButtonHandler(selectedItem, actionMenuVisible, data, dataKeyId)">☰</button>
          <menu class="actionMenu_menu" v-show="actionMenuVisible.value === data._id">
            <slot name="actionMenuEntries"></slot>
          </menu>
        </td>
      </tr>

    </tbody>
  </table>

  <ListActionButtons v-if="listActionButtonsOptions.showBottom === true"
    @click-addNew="$emit('click-addNew')"
    @click-selection="((!hasSelectedItems) ? selectionHandler(dataList.value, true) : selectionHandler(dataList.value, false))"
    @click-delSelected="$emit('click-delSelected')"
    :hasSelection="hasSelectedItems"
    :textAddNew="listActionButtonsOptions.textAddNew"
  >
  </ListActionButtons>
</template>


<script setup>

import { ref, reactive, watch, computed, onMounted, onBeforeUnmount } from "vue";
import ListActionButtons from "../ListActionButtons/ListActionButtons.vue";

  const props = defineProps([
    "tableOptions", 
    "tableHeadings", 
    "dataList", 
    "dataKeyId",
    "dataKeys", 
    "listActionButtonsOptions"
  ]);

  const emit = defineEmits(["updateSelectedItem", "click-addNew", "click-delSelected"]);

  const selectedItem = reactive({ value: "" });
  const actionMenuVisible = reactive({ value: {} });
  const toggleSelection = ref(Date.now());

  const selectedItems = computed( () => props.dataList.value.filter(item => item.selected === true) );
  const allItemsSelected = computed( () => (selectedItems.value.length === props.dataList.value.length) ? true : false )
  const hasSelectedItems = computed( () => (selectedItems.value.length > 0) ? true : false );

  watch( hasSelectedItems, () => {
    toggleSelection.value = Date.now();
    //https://michaelnthiessen.com/force-re-render/
  });

  function toggleSelectionHandler(dataList, allItemsSelected) {
    const valueToSet = (allItemsSelected.value === true) ? false : true;
    dataList.forEach(item => item.selected = valueToSet)
  }

  function selectionHandler(dataList, mode) {
    dataList.forEach(item => item.selected = mode)
  }

  /**
   * 
   * @param {Object} selectedItem - reactive object to store the currently selected/active data to
   * @param {Object} data - data object from the data list of the current row
   * @param {Object} actionMenuVisible - reactive object to toggle which action menu is currently visible
   * @param {String} dataKeyId the data lists key Id prop name
   */
  function actionButtonHandler(selectedItem, actionMenuVisible, data, dataKeyId) {
    selectedItem.value = data;
    actionMenuVisible.value = selectedItem.value[dataKeyId];
  }
  
  watch(selectedItem, () => {
    emit("updateSelectedItem", selectedItem)

  })

  function actionMenuDisableVisibility(actionMenuVisible) {
    if (actionMenuVisible.value !== "") {
      actionMenuVisible.value = ""
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
  table {
    width: 100%;
    border: 1px solid gray;
    border-collapse: collapse;
    background-color: beige;
    table-layout: fixed;
    word-break: break-all;
  }

  thead {
    background-color: bisque;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border: 1px solid gray;
  }

  button:disabled {
    pointer-events: none;
  }

  .list-header-narrow {
    width: 5rem;
  }

  .list-header-medium {
    width: 10rem;
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