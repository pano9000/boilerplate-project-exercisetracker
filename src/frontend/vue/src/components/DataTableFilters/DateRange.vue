<template>
  <div>
    <label for="ui-dateFrom_input">Date From</label>
    <input id="ui-dateFrom_input" type="date" :value="dateFrom.value" @input="updateDateValue($event, 'update:dateFrom', dateFrom)">
  </div>

  <div>
    <label for="ui-dateTo_input">Date To</label>
    <input id="ui-dateTo_input" type="date" :value="dateTo.value" @input="updateDateValue($event, 'update:dateTo', dateTo)">
  </div>

  <div>
    <button type="button" title="Quick Set Date Range"  aria-label="Quick Set Date Range">
      <IconCalendarCode></IconCalendarCode>
    </button>
    <menu class="actionMenu_menu">
      <li @click="quickDateButtonsHandler('currentDay')"><IconCalendarCode></IconCalendarCode>Today</li>
      <li @click.prevent="quickDateButtonsHandler('currentWeek')"><IconCalendarCode></IconCalendarCode>This Week</li>
      <li @click.prevent="quickDateButtonsHandler('currentMonth')"><IconCalendarCode></IconCalendarCode>This Month</li>
      <li @click.prevent="quickDateButtonsHandler('currentYear')"><IconCalendarCode></IconCalendarCode>This Year</li>
      <li @click.prevent="quickDateButtonsHandler('showAll')"><IconCalendarCode></IconCalendarCode>Show All</li>
    </menu>

  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import DateRange from '../../services/DateRange';
  import { IconCalendarCode } from '@tabler/icons-vue';

  const dateRange = new DateRange();

  const props = defineProps([
    "dateFrom",
    "dateTo"
  ]);

  const emit = defineEmits([
    "update:dateFrom",
    "update:dateTo",
  ]);

  const dateFrom = reactive({});
  const dateTo = reactive({});


  function quickDateButtonsHandler(mode, dateFromP = dateFrom, dateToP = dateTo, dateRangeP = dateRange) {
    dateFromP.value = (mode !== "showAll") ? dateRangeP[mode].start.toISOString().slice(0,10) : '';
    dateToP.value = (mode !== "showAll") ? dateRangeP[mode].end.toISOString().slice(0,10) : '';

    emit('update:dateTo', dateToP.value)
    emit('update:dateFrom', dateFromP.value)
  }


  function updateDateValue(event, emitName, reactiveElement) {
    const newValue = event.target.value;
    emit(emitName, newValue);
    reactiveElement.value = newValue
  }

</script>

<style>

</style>