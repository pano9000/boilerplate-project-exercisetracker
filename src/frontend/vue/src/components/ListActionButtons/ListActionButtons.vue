<template>
  <div class="ui_list-action-buttons">
    <button type="button" @click="$emit('click-addNew')">➕ Add New</button>
    <button type="button" @click="$emit('click-selection')">{{ (!hasSelection) ? "Select All" : "Clear Selection" }}</button>
    <button type="button" :disabled="!hasSelection" :class="hasSelection ? 'active' : 'inactive'" @click="$emit('click-delSelected')">❌ Delete Selected</button>
  </div>
</template>

<script setup>

  defineEmits(["click-addNew", "click-selection", "click-delSelected" ])
  defineProps(["hasSelection"])

</script>

<style>

.ui_list-action-buttons {

  background-color: bisque;
  padding: 1rem;

}
</style>