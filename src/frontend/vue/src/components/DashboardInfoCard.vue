<template>

  <div class="ui-dashboard-card_wrap">
    <div class="ui-dashboard-card_heading">
      <slot name="cardHeading"></slot>
    </div>
    <div class="ui-dashboard-card_description">
      <slot name="cardDescription"></slot>
    </div>
  </div>


</template>

<script setup>
</script>

<style>
.ui-dashboard-card_wrap {
  background-color: #069;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.ui-dashboard-card_heading {
  font-size: 2rem;
  font-weight: 600;
}
</style>