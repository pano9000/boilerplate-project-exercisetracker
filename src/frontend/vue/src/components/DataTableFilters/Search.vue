<template>

  <div>
    <label for="ui-searchFor">Search For</label>
    <div class="ui-position-rel">
      <input 
      id="ui-searchFor" 
      type="search" 
      size="15"
      :value="searchForValue"
      @change="$emit('update:searchForValue', $event.target.value)"
      >
      <button v-if="searchForValue.length > 0"
        class="ui-clear-searchFor"
        type="button"
        title="Clear Text"
        @click="searchForValue = ''; $emit('update:searchForValue', $event.target.value)"
      >
        <IconSquareX></IconSquareX>
      </button>
    </div>
  </div>

  <div>
    <label for="ui-searchIn">Search In</label>
    <select
      id="ui-searchFor"
      :value="searchInValue"
      @change="$emit('update:searchInValue', $event.target.value)"
    >
      <option 
        v-for="option in searchInOptions"
        :value="option.key"
        :key="option.key"
      > {{ option.name }}</option>
    </select>
  </div>

  <button type="button">
    <IconSearch></IconSearch>
  </button>

</template>

<script setup>

  import { IconSearch, IconSquareX } from '@tabler/icons-vue';

  defineProps(["searchInOptions", "searchForValue", "searchInValue"])
  defineEmits(["update:searchForValue", "update:searchInValue"])

</script>


<style>
.ui-clear-searchFor {
  position: absolute;
  right: -1rem;
}

.ui-position-rel {
  position: relative;
}

</style>