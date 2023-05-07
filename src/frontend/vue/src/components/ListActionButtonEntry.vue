<template>
  <button
    @click="$emit('listActionButtonEvent')"
  >
    <slot></slot>
</button>

</template>

<script setup>
  defineEmits(["listActionButtonEvent"])
  const props = defineProps(["options"])

</script>
