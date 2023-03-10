<template>

  <form>
    <h4>Filter for Exercises</h4>
    <div class="ui-exercise-filter_wrap">

      <section class="ui-exercise-filter_section">
        <h5>Date Range</h5>

        <div>
          <label for="filter-dateFrom">Date From</label>
          <input id="filter-dateFrom" type="date" v-model="exerciseFilters.dateFrom">
        </div>

        <div>
          <label for="filter-dateTo">Date To</label>
          <input id="filter-dateTo" type="date" v-model="exerciseFilters.dateTo">
        </div>

        <div>
        <!-- TODO: add funct-->
        Set Date To:
          <button type="button">Today</button>
          <button type="button">This Week</button>
          <button type="button">This Month</button>
          <button type="button">This Year</button>
        </div>

      </section>


      <section class="ui-exercise-filter_section">
        <h5>Sorting</h5>
        <div>
          <label for="filter-sortby">Sort By</label>
          <select id="filter-sortby" v-model="exerciseFilters.sortBy">
            <option v-for="sortby in ['TODO']" :key="sortby">{{ sortby }}</option>
          </select>
        </div>

        <div> <!-- TODO: replace this with a button -->
          <label for="filter-sortorder">Sort Order</label>
          <select id="filter-sortorder" v-model="exerciseFilters.sortOrder">
            <option v-for="sortOrder in ['Ascending', 'Descending']" :key="sortOrder">{{ sortOrder }}</option>
          </select>
        </div>

      </section>

    </div>
    <section class="ui-exercise-filter_section">
      <h5>as</h5>
      <div>
      <label for="filter-limit">Limit</label>
      <select id="filter-limit" v-model="exerciseFilters.limit">
        <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit == 'Show All')? 0 : limit">{{ limit }}</option>
      </select>
      </div>
      <hr>
      <button @click="$emit('clickLoadExercises', exerciseFilters)">Load Exercises</button>
    </section>

  </form>


</template>


<script setup>
import { ref } from 'vue';
  defineEmits(["clickLoadExercises"])


  const exerciseFilters = ref({
    limit: 0,
    dateFrom: "",
    dateTo: (new Date()).toISOString().slice(0,10),
    sortBy: "TODO",
    sortOrder: "Ascending"
  });


</script>

<style>
.ui-exercise-filter_wrap {
  margin-bottom: 2rem;
}

</style>