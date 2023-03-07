<template>
  <section class="ui_list-action-btn_wrap">
    <button v-if="(options.showAdd !== undefined) ? options.showAdd : true" type="button" @click="$emit('clickAddNew')">➕ {{ (textAddNew) ? textAddNew : 'Add New'}}</button>
    <button v-if="(options.showSelect !== undefined) ? options.showSelect : true" type="button" @click="$emit('clickSelection')">{{ (!hasSelection) ? "Select All" : "Clear Selection" }}</button>
    <button v-if="(options.showDelete !== undefined) ? options.showDelete : true" type="button" :disabled="!hasSelection" :class="hasSelection ? 'ui_list-action-btn_active' : 'ui_list-action-btn_inactive'" @click="$emit('clickDelSelected')">❌ Delete Selected</button>
  </section>
</template>

<script setup>

  defineEmits(["clickAddNew", "clickSelection", "clickDelSelected" ]);
  defineProps(["hasSelection", "options"]);

</script>

<style>
.ui_list-action-btn_wrap {
  padding: 1rem;
}
</style>