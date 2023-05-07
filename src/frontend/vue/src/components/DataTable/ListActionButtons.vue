<template>
  <section class="ui_list-action-btn_wrap">

    <slot name="listActionButtons">

    </slot>

    <button 
      v-if="(options.showDelete !== undefined) ? options.showDelete : true" 
      type="button" 
      :disabled="!hasSelection" 
      :class="hasSelection ? 'ui_list-action-btn_active' : 'ui_list-action-btn_inactive'" 
      @click="$emit('clickDelSelected')"
    >
      <IconX></IconX>
      Delete Selected
    </button>

  </section>
</template>

<script setup>

  import { IconSquareCheck, IconSquareOff, IconPlus, IconX } from '@tabler/icons-vue';
  defineEmits(["clickDelSelected"]);
  defineProps(["hasSelection", "options"]);

</script>

<style>
.ui_list-action-btn_wrap {
  padding: 1rem;
  background-color: hsl(33, 100%, 60%);
}

.ui_list-action-btn_wrap button {
  display: inline-flex;
  align-items: center;
}

</style>