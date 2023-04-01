<template>

  <div>
    <label for="ui-sortby_input">Sort By</label>
    <select
      id="ui-sortby_input"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option select v-for="sortBy in sortByOptions" :key="sortBy.value" :value="sortBy.value">{{ sortBy.name }}</option>
    </select>
  </div>

</template>

<script setup>

  const props = defineProps(["sortByOptions"])

</script>


<style>

</style>