<template>
  <label for="ui-limit_select">Limit</label>
  <select
    id="ui-limit_select"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit === 'Show All') ? 0 : limit">{{ limit }}</option>
  </select>
</template>


<script setup>
  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<style>

</style>