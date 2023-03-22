<template>
  <span class="ui-input-statusicon_wrap" v-if="isValid !== null">
    <Transition>
      <IconCircleCheck v-if="isValid" :key="'valid'"></IconCircleCheck>
      <IconCircleX v-else :key="'invalid'"></IconCircleX>
    </Transition>
  </span>

  <span class="ui-input-statusicon_wrap" v-else>
    <Transition>
      <IconCircle v-if="required===true" :key="'required'"></IconCircle>
      <IconCircleDotted v-else :key="'optional'"></IconCircleDotted>
    </Transition>
  </span>
</template>


<script setup>
  import { IconCircleCheck, IconCircleX, IconCircleDotted, IconCircle } from '@tabler/icons-vue';
  const props = defineProps(["isValid", "required"]);

</script>

<style>

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .v-enter-from {
    opacity: 0;
    transform: translateY(-2rem);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateY(2rem);
  }

  .ui-input-statusicon_wrap svg {
    display: inline-block;
    line-height: 0;
    position: absolute;
    top: calc(1.5rem / 4);
    left: .25rem;
    height: auto;
    width: 1.5rem;
  }
</style>