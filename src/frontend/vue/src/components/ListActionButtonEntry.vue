<template>
  <button
    @click="$emit('listActionButtonEvent')"
    :disabled="props.options?.disabled === true"
  >
    <slot></slot>
</button>

</template>

<script setup>
  defineEmits(["listActionButtonEvent"])
  const props = defineProps(["options"])

</script>
