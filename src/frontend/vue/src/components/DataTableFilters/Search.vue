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


</template>

<script setup>

  defineProps(["modelValue"])
  defineEmits(['update:modelValue'])

</script>


<style>

</style>