<template>

  <div class="ui-sortorder">

  <input 
    id="ui-sortorder_input-asc"
    type="radio"
    v-model="dataListStore.filters.sortOrder"
    value="1"
  >
  <label 
    for="ui-sortorder_input-asc"
    class="ui-sortorder_label-asc"
    title="Ascending"
    aria-label="Sort Order: Ascending"
  >
    <IconSortDescending></IconSortDescending>
  </label>

  <input 
    id="ui-sortorder_input-dsc" 
    type="radio"
    v-model="dataListStore.filters.sortOrder"
    value="-1"
  >
  <label 
    for="ui-sortorder_input-dsc"
    class="ui-sortorder_label-dsc"
    title="Descending"
    aria-label="Sort Order: Descending"
  >
    <IconSortDescending></IconSortDescending>
  </label>

  </div>

</template>

<script setup>
  import { IconSortDescending } from '@tabler/icons-vue';
  import { useDataListStore } from '../../stores/DataListStore';

  const dataListStore = useDataListStore(); //check if we can get around needing to import this here?

  defineProps(["modelValue"]);
  defineEmits(['update:modelValue']);


</script>


<style>

  .ui-sortorder_label-asc svg {
    transform: scaleY(-1);
  }

  .ui-sortorder input[type=radio] {
    display: none;
  }

  .ui-sortorder label {
    display: inline-flex;
    padding: 0rem .25rem;
    cursor: pointer;
  }

  .ui-sortorder label svg {
    width: 2rem;
    height: auto;
    stroke-width: 1px;
    transition: all 0.25s;
  }

  .ui-sortorder input:checked + label svg {
    color: darkblue;
    stroke-width: 2px;
  }


</style>