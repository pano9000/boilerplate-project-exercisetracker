<template>
  <div>
    <label for="ui-dateFrom_input">Date From</label>
    <input id="ui-dateFrom_input" type="date" v-model="dateFrom" @input="$emit('update:dateFrom', dateFrom)">
  </div>

  <div>
    <label for="ui-dateTo_input">Date To</label>
    <input id="ui-dateTo_input" type="date" v-model="dateTo" @input="$emit('update:dateTo', dateTo)">
  </div>

  <!-- TODO: add funct
  <div>
    Set Date To:
    <button type="button" @click="quickDateButtonsHandler('D', exerciseFilters)">Today</button>
    <button type="button" @click="quickDateButtonsHandler('W', exerciseFilters)">This Week</button>
    <button type="button" @click="quickDateButtonsHandler('M', exerciseFilters)">This Month</button>
    <button type="button" @click="quickDateButtonsHandler('Y', exerciseFilters)">This Year</button>
  </div>
-->
</template>

<script setup>
  import { ref } from 'vue';

  defineProps([
    "dateFrom",
    "dateTo"
  ]);

  defineEmits([
    "update:dateFrom",
    "update:dateTo",
  ]);

  const dateFrom = ref()
  const dateTo = ref((new Date()).toISOString().slice(0,10))

</script>

<style>

</style>