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

</template>

<script setup>

  import { IconSearch } from '@tabler/icons-vue';
  defineEmits(['update:modelValue'])

</script>


<style>

</style>