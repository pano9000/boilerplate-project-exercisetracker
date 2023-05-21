<template>

  <div>
    <label for="ui-searchFor">Search For</label>
    <input 
      id="ui-searchFor" 
      type="search" 
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
  </div>

  <button type="button">
    <IconSearch></IconSearch>
  </button>

  <div>
    <label for="ui-searchFor">Search In</label>
    <select>
      <option v-for="option in searchInOptions"> {{ option.name }}</option>
    </select>
  </div>

</template>

<script setup>

  import { IconSearch } from '@tabler/icons-vue';

  defineProps(["modelValue", "searchInOptions"])
  defineEmits(['update:modelValue'])

</script>


<style>

</style>