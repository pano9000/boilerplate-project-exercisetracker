<template>
  <section class="ui_list-action-btn_wrap">

    <slot name="listActionButtons">
    </slot>

  </section>
</template>

<script setup>
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