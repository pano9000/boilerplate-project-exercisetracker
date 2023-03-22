<template>
  <Transition mode="out-in">
    <span class="ui-input-statusicon_wrap" v-if="isValid !== null">
      <Transition mode="out-in">
        <IconCircleCheck v-if="isValid"></IconCircleCheck>
        <IconCircleX v-else></IconCircleX>
      </Transition>
    </span>

    <span class="ui-input-statusicon_wrap" v-else>
      <IconCircle v-if="required===true"></IconCircle>
      <IconCircleDotted v-else></IconCircleDotted>
    </span>
  </Transition>
</template>


<script setup>
  import { IconCircleCheck, IconCircleX, IconCircleDotted, IconCircle } from '@tabler/icons-vue';
  const props = defineProps(["isValid", "required"]);

</script>

<style>

  .v-enter-active, .v-leave-active {
    transition: all .25s ease;
  }

  .v-enter-from, .v-leave-to {
    opacity: 0;
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