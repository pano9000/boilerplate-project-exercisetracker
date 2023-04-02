<template>

  <label for="ui-sortby_input">Sort By</label>
  <select
    id="ui-sortby_input"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="sortBy in sortByOptions"
      :key="sortBy.key"
      :value="sortBy.key"
      :selected="sortBy.currentActive === true" 
      >
        {{ sortBy.name }}
    </option>
  </select>

</template>

<script setup>

  defineProps(["sortByOptions", "modelValue"])
  defineEmits(['update:modelValue'])

</script>


<style>

</style>