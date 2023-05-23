<template>
  <Transition mode="out-in">
    <span 
      class="ui-input-statusicon_wrap" 
      :class="(isValid === true) ? 'ui-input-statusicon_wrap-valid' : (isValid === false) ? 'ui-input-statusicon_wrap-invalid' : 'ui-input-statusicon_wrap-empty'" 
      v-if="isValid !== null">
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
    transition: all var(--transition-time-short) ease;
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

  .ui-input-statusicon_wrap + input {
    border-left: var(--input-border);
    border-left-color: lightgray;
  }

  .ui-input-statusicon_wrap-valid + input:not(:focus) {
    border-left: var(--input-border);
    border-left-color: lightgreen;
  }

  .ui-input-statusicon_wrap-invalid + input:not(:focus) {
    border-left: var(--input-border);
    border-left-color: #fe5050;
  }

  .ui-input-statusicon_wrap-invalid + input:not(:focus) {
    border-left: var(--input-border);
    border-left-color: #fe5050;
  }

  .ui-input-statusicon_wrap-invalid + input + .ui-input-label_hint {
    color: #fe5050;
    opacity: 1;
    visibility: visible;
  }

  .ui-input-label_reqs {
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-time-short);
    cursor: default;
    max-width: 60ch;
    width: 100%;
    position: absolute;
    background-color: lightgray;
    border-radius: var(--border-radius);
    padding: .25rem;
    box-shadow: var(--box-shadow);
  }

  .ui-form input:focus + .ui-input-label_reqs {
    opacity: 1;
    visibility: visible;
  }



</style>