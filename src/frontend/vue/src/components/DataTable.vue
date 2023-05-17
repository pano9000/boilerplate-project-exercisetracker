<template>
  <table class="ui-datatable">
    <thead>
      <tr>
        <th v-if="tableOptions.showSelection === true" class="list-header list-header-narrow list-cell_center">
          <div class="list-selection-toggle"
            tabindex="0"
            :title="(!props.dataList.allItemsSelected) ? 'Select All' : 'Deselect All'"
            @keyup.enter="$emit('clickSelection')"
            @keyup.space="$emit('clickSelection')"
            @click.prevent="$emit('clickSelection')"
          >
            <IconSquareCheck v-if="!props.dataList.hasSelectedItems"></IconSquareCheck>
            <IconSquareOff v-else></IconSquareOff>  

          </div>
        </th>

        <th 
          v-for="dataKey in dataKeys" 
          :key="dataKey.key" 
          class="list-header list-header-flex list-header-sortable"
          @click="$emit('clickTableHeading', dataKey.key)"
          :title="`${dataKey.name}${(dataKey.key == props.dataList.filters.sortBy) ? (props.dataList.filters.sortOrder == '1') ? ', Ascending' : ', Descending' : ''}`"
          :aria-description="`${dataKey.name}${(dataKey.key == props.dataList.filters.sortBy) ? (props.dataList.filters.sortOrder == '1') ? ': Currently sorted by, Ascending Order' : ': Currently sorted by, Descending Order' : ''}`"
        >
          <span>{{ dataKey.name }}</span>
          <span v-if="(dataKey.key == props.dataList.filters.sortBy)"
            :class="[
             'list-header-sorting',
             (props.dataList.filters.sortOrder == '1') ? 'list-header-sorting_asc' : 'list-header-sorting_dsc'
            ]"
          >
            <IconSortDescending></IconSortDescending>
          </span>
        </th>

        <th v-if="tableOptions.showAction === true" class="list-header list-header-medium list-cell_center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in props.dataList.data" :key="data[dataKeyId]">
        <td v-if="tableOptions.showSelection === true" class="list-cell_center"><input type="checkbox" v-model="data.selected"></td>
        <td v-for="dataKey in dataKeys" :key="dataKey.key">{{ data[dataKey.key] }}</td>
        <td class="list-cell_center" @click="$emit('updateCurrentItem', data)">
          <div class="actionMenu_wrap">
            <button 
              class="actionMenu_btn" 
              @click="actionButtonHandler($event, actionMenuVisible, actionMenu)" 
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

</template>


<script setup>

import { reactive } from "vue";
import ActionMenu from "./ActionMenu.vue";
import { actionButtonHandler } from "./ActionMenu.functions.js";
import { IconSquareCheck, IconSquareOff, IconSortDescending } from '@tabler/icons-vue';


  const props = defineProps([
    "tableOptions", 
    "dataList", 
    "dataKeyId",
    "dataKeys", 
    "listActionButtonsOptions",
    "paginationbarOptions"
  ]);

  const emit = defineEmits(["updateCurrentItem", "clickTableHeading", "clickSelection"]);

  const actionMenu = reactive({ value: {} });
  const actionMenuVisible = reactive({ value: false });

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

  .list-selection-toggle {
    cursor: pointer;
  }

  .list-selection-toggle:focus,
  .list-selection-toggle:hover {
    color:#646cff;
  }

  .list-selection-toggle svg {
    width: 100%;
    height: auto;
    transition: all 0.25s;
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

  .list-header-sorting_asc svg {
    transform: scaleY(-1);
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