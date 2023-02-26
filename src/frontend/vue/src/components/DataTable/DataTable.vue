<template>
avc
  {{ tableHeadings }}
  {{ tableOptions }}
  {{ dataList }}
  {{ selectedItem }}
  <table>
    <thead>
      <tr>
        <td v-if="tableOptions.showSelection === true" class="list-header list-header-narrow">Selection</td>
        <td v-for="tableHeading in tableHeadings" :key="tableHeading" class="list-header list-header-flex">{{ tableHeading }}</td>
        <td v-if="tableOptions.showAction === true" class="list-header list-header-medium">Actions</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in dataList.value" :key="data[dataKeyId]">
        <td><input type="checkbox" v-model="data.selected"></td>
        <td v-for="dataKey in dataKeys" :key="dataKey">{{ data[dataKey] }}</td>
        <td @mouseenter="selectedItem.value = data">
          <slot name="actionButtons"></slot>
        </td>
      </tr>

    </tbody>
  </table>

</template>


<script setup>

import { ref, reactive, watch } from "vue";

  const props = defineProps([
    "tableOptions", 
    "tableHeadings", 
    "dataList", 
    "dataKeyId",
    "dataKeys", 
    "dataActions",

  ])
  const emit = defineEmits(["updateSelectedItem"])
  const selectedItem = reactive({
    value: ""
  });

  watch(selectedItem, () => {
    emit("updateSelectedItem", selectedItem)

  })


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

</style>