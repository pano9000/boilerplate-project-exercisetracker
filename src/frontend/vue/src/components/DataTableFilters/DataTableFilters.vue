<template>

  <section class="ui-filter_section ui-filter_section-wrap">
    <div
      tabindex="0"
      class="ui-filter_toggle"
      :class="(filtersVisible) ? 'ui-filter_toggle-active' : null"
      @click="filtersVisible = !filtersVisible"
      @keydown.enter="filtersVisible = !filtersVisible"
      @keydown.space="filtersVisible = !filtersVisible"
    >
      <h3>Filter</h3>
      <IconChevronDown></IconChevronDown>
    </div>

    <form class="ui-filter_wrap" v-show="filtersVisible === true">

      <section class="ui-filter_section" v-if="(options.showDateRange !==  undefined) ? options.showDateRange : true">

        <div class="ui-filter-flex_wrap">
          <DateRange
            v-model:dateFrom="filtersStore.filters.from"
            v-model:dateTo="filtersStore.filters.to"
          >
          </DateRange>
        </div>

      </section>

      <section class="ui-filter_section" v-if="(options.showSort !== undefined) ? options.showSort : true">

        <div class="ui-filter-flex_wrap">

          <div>
            <SortBy 
              v-model="filtersStore.filters.sortBy"
              :sort-by-options="options.sortByOptions"
            >
            </SortBy>
          </div>

          <div>
            <span>Sort Order</span>
            <SortOrder 
              v-model="filtersStore.filters.sortOrder"
            >
            </SortOrder>
          </div>



        </div>
      </section>

      <section class="ui-filter_section" v-if="(options.showLimit !== undefined) ? options.showLimit : true">

        <div class="ui-filter-flex_wrap">

          <div>
            <Limit v-model="filtersStore.filters.limit"></Limit>
          </div>

        </div>

      </section>

    </form>
  </section> 
    
</template>


<script setup>
  import { ref } from 'vue';
  import { IconChevronDown, IconSortDescending } from '@tabler/icons-vue';
  import SortOrder from './SortOrder.vue';
  import SortBy from "./SortBy.vue";
  import DateRange from "./DateRange.vue";
  import Limit from "./Limit.vue";
  import { useDataTableFiltersStore } from "../../stores/DataTableFilterStore"

  const props = defineProps(["options"])

  const filtersStore = useDataTableFiltersStore();
  const filtersVisible = ref(true);

</script>

<style>
  .ui-filter_wrap {
    padding: 0.5rem;
    background-color: lightgrey;
    border-radius: var(--border-radius);
    box-shadow: inset var(--box-shadow);
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .ui-filter-flex_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

  }

  .ui-filter_section {
    background-color: azure;
    padding: .75rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    position: relative;
  }

  .ui-filter_section-wrap {

    margin: .75rem 0rem;

  }

  .ui-filter_toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  /** increase hit area via ::after/::before */
  .ui-filter_toggle::after,
  .ui-filter_toggle::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1rem;
    left: 0;
  }

  .ui-filter_toggle::after {
    bottom: 0;
  }

  .ui-filter_toggle::before {
    top: 0;
  }

  .ui-filter_toggle h3 {
    margin: 0;
    font-size: 1rem;
  }

  .ui-filter_toggle svg {
    transition: transform 0.25s;
  }

  .ui-filter_toggle-active svg {
    transform: rotate(-90deg);
  }


  @media screen and (max-width: 600px)  {
    .ui-filter_wrap {
      flex-direction: column;
    }
  }

</style>