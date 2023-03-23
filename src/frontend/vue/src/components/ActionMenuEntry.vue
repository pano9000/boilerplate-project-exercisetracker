<template>
  <li
    tabindex="0" 
    @click="$emit('actionMenuEvent')"
    @keyup.enter="$emit('actionMenuEvent')"
    @keyup.space="$emit('actionMenuEvent')"
  >
    <slot></slot>
  </li>

</template>

<script setup>

</script>
