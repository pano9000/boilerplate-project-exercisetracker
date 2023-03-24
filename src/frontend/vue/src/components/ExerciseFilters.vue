<template>

  <form>
    <h4>Filter for Exercises</h4>
    <div class="ui-exercise-filter_wrap">

      <section class="ui-exercise-filter_section">

        <div class="ui-exercise-filter-flex_wrap">
          <div>
            <label for="filter-dateFrom">Date From</label>
            <input id="filter-dateFrom" type="date" v-model="exerciseFilters.dateFrom">
          </div>

          <div>
            <label for="filter-dateTo">Date To</label>
            <input id="filter-dateTo" type="date" v-model="exerciseFilters.dateTo">
          </div>
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
      </section>


      <section class="ui-exercise-filter_section">

        <div class="ui-exercise-filter-flex_wrap">

          <div>
            <label for="filter-sortby">Sort By</label>
            <select id="filter-sortby" v-model="exerciseFilters.sortBy">
              <option select v-for="sortby in ['Date']" :key="sortby">{{ sortby }}</option>
            </select>
          </div>

          <div> <!-- TODO: replace this with a button -->
            <label for="filter-sortorder">Sort Order</label>
            <select id="filter-sortorder" v-model="exerciseFilters.sortOrder">
              <option v-for="sortOrder in sortOrders" :key="sortOrder" :value="sortOrder.value">{{ sortOrder.name }}</option>
            </select>
          </div>

          <div>
            <label for="filter-limit">Limit</label>
            <select id="filter-limit" v-model="exerciseFilters.limit">
              <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit == 'Show All')? 0 : limit">{{ limit }}</option>
            </select>
          </div>

        </div>
      </section>

    </div>
    <section class="ui-exercise-filter_section">

      <button @click="$emit('clickLoadExercises', exerciseFilters)">Load Exercises</button>
    </section>

  </form>
  <hr>

</template>


<script setup>
import { ref } from 'vue';
  defineEmits(["clickLoadExercises"])


  const exerciseFilters = ref({
    limit: 0,
    dateFrom: "",
    dateTo: (new Date()).toISOString().slice(0,10),
    sortBy: "Date",
    sortOrder: "asc"
  });

  const sortOrders = [
    {
      value: "asc",
      name: "Ascending"
    },
    {
      value: "desc",
      name: "Descending"
    }
  ]


</script>

<style>
.ui-exercise-filter_wrap {
  margin-bottom: 2rem;
  padding: 0.5rem;
  background-color: lightgrey;
  border-radius: var(--border-radius);
  box-shadow: inset var(--box-shadow);
  display: flex;
  gap: 1.5rem;
}

.ui-exercise-filter-flex_wrap {

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

}

.ui-exercise-filter_section h5 {
  margin: .75rem;
}

</style>