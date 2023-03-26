<template>

  <section class="ui-exercise-filter_section">
    <div
      tabindex="0"
      class="ui-exercise-filter_toggle"
      :class="(filtersVisible) ? 'ui-exercise-filter_toggle-active' : null"
      @click="filtersVisible = !filtersVisible"
      @keydown.enter="filtersVisible = !filtersVisible"
      @keydown.space="filtersVisible = !filtersVisible"
    >
      <h3>Filter</h3>
      <IconChevronDown></IconChevronDown>
    </div>

    <form class="ui-exercise-filter_wrap" v-show="filtersVisible === true">
      
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

          <div>

            <span>Sort Order</span>

            <div class="ui-exercise-filter_sortorder">

              <input 
                id="ui-exercise-filter-sortorder_input-asc"
                type="radio"
                v-model="exerciseFilters.sortOrder"
                value="asc"
              >
              <label 
                for="ui-exercise-filter-sortorder_input-asc"
                class="ui-exercise-filter_sortorder-asc"
                title="Ascending"
                aria-label="Sort Order: Ascending"
              >
                <IconSortDescending></IconSortDescending>
              </label>

              <input 
                id="ui-exercise-filter-sortorder_input-dsc" 
                type="radio"
                v-model="exerciseFilters.sortOrder"
                value="dsc"
              >
              <label 
                for="ui-exercise-filter-sortorder_input-dsc"
                class="ui-exercise-filter_sortorder-dsc"
                title="Descending"
                aria-label="Sort Order: Descending"
              >
                <IconSortDescending></IconSortDescending>
              </label>

            </div>


          </div>
          <div>
            <label for="filter-limit">Limit</label>
            <select id="filter-limit" v-model="exerciseFilters.limit">
              <option v-for="limit in ['Show All', 5, 10, 25, 50]" :key="limit" :value="(limit == 'Show All')? 0 : limit">{{ limit }}</option>
            </select>
          </div>
          
        </div>
      </section>
      
      <div class="ui-exercise-filter-flex_wrap">
        
        <button @click="() => { filtersVisible = false; $emit('clickLoadExercises', exerciseFilters) }">Load Exercises</button>
      </div>
    </form>
  </section> 
    
</template>


<script setup>
import { ref } from 'vue';
import { IconChevronDown, IconSortDescending } from '@tabler/icons-vue';
  defineEmits(["clickLoadExercises"])


  const exerciseFilters = ref({
    limit: 0,
    dateFrom: "",
    dateTo: (new Date()).toISOString().slice(0,10),
    sortBy: "Date",
    sortOrder: "asc"
  });

  const filtersVisible = ref(true)


</script>

<style>
.ui-exercise-filter_wrap {
  padding: 0.5rem;
  background-color: lightgrey;
  border-radius: var(--border-radius);
  box-shadow: inset var(--box-shadow);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.ui-exercise-filter-flex_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

}

.ui-exercise-filter_section {
  background-color: azure;
  padding: .75rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.ui-exercise-filter_toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.ui-exercise-filter_toggle h3 {
  margin: 0;
  font-size: 1rem;
}

.ui-exercise-filter_toggle svg {
  transition: transform 0.25s;
}

.ui-exercise-filter_toggle-active svg {
  transform: rotate(-90deg);
}

.ui-exercise-filter_sortorder-asc svg {
  transform: scaleY(-1);
}

.ui-exercise-filter_sortorder input[type=radio] {
  display: none;
}

.ui-exercise-filter_sortorder label {
  display: inline-flex;
  padding: 0rem .25rem;
  cursor: pointer;
}

.ui-exercise-filter_sortorder label svg {
  width: 2rem;
  height: auto;
  stroke-width: 1px;
  transition: all 0.25s;
}

.ui-exercise-filter_sortorder input:checked + label svg {
  color: darkblue;
  stroke-width: 2px;
}

@media screen and (max-width: 600px)  {
  .ui-exercise-filter_wrap {
    flex-direction: column;
  }
}

</style>