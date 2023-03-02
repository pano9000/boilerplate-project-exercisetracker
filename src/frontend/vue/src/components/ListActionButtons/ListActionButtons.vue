<template>
  <div class="ui_list-action-buttons">
    <button type="button" @click="$emit('clickAddNew')">➕ {{ (textAddNew) ? textAddNew : 'Add New'}}</button>
    <button type="button" @click="$emit('clickSelection')">{{ (!hasSelection) ? "Select All" : "Clear Selection" }}</button>
    <button type="button" :disabled="!hasSelection" :class="hasSelection ? 'active' : 'inactive'" @click="$emit('clickDelSelected')">❌ Delete Selected</button>
  </div>
</template>

<script setup>

  defineEmits(["clickAddNew", "clickSelection", "clickDelSelected" ]);
  defineProps(["hasSelection", "textAddNew"]);

</script>

<style>

.ui_list-action-buttons {

  background-color: bisque;
  padding: 1rem;

}
</style>