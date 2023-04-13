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
    <button
      class="actionMenu_btn"
      type="button"
      title="Quick Set Date Range"
      aria-label="Quick Set Date Range"
      @click="DateRangeActionButtonHandler($event, actionMenuVisible)"
    >
      <IconCalendarCode></IconCalendarCode>
    </button>
    <ActionMenu
      @update-actionMenuRef="(ref) => actionMenu.value = ref"
      @update-actionMenuVisible="(value) => actionMenuVisible.value = value"
      :action-menu-visible="actionMenuVisible"
    >
      <ActionMenuEntry @action-menu-event="quickDateButtonsHandler('currentDay')">
        <IconCalendarCode></IconCalendarCode> Today
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="quickDateButtonsHandler('currentWeek')">
        <IconCalendarCode></IconCalendarCode> This Week
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="quickDateButtonsHandler('currentMonth')">
        <IconCalendarCode></IconCalendarCode> This Month
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="quickDateButtonsHandler('currentYear')">
        <IconCalendarCode></IconCalendarCode> This Year
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="quickDateButtonsHandler('showAll')">
        <IconCalendarCode></IconCalendarCode> Show All
      </ActionMenuEntry>
    </ActionMenu>


  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import DateRange from '../../services/DateRange';
  import { IconCalendarCode } from '@tabler/icons-vue';
  import ActionMenuEntry from '../ActionMenuEntry.vue';
  import ActionMenu from '../ActionMenu.vue';
  import { actionButtonHandler } from '../ActionMenu.functions';


  const actionMenu = reactive({ value: {} });
  const actionMenuVisible = reactive({ value: false });

  function DateRangeActionButtonHandler(event, actionMenuVisible) {

    actionButtonHandler(event, actionMenuVisible, actionMenu)

  };

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