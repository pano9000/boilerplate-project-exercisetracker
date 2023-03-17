<template>
  <span class="ui-input-statusicon_wrap">
      <IconCircleCheck v-if="true"></IconCircleCheck>
      <IconCircleX v-else></IconCircleX>
      <IconCircle v-if="required"></IconCircle>
      <IconCircleDotted v-else></IconCircleDotted>
  </span>

  {{ inputElemRef?.validity.valid }} / {{ validInput }}

</template>


<script setup>
  import { IconCircleCheck, IconCircleX, IconCircleDotted, IconCircle } from '@tabler/icons-vue';
  import { nextTick, onMounted, watchEffect, isReactive, isRef, toRefs } from 'vue';
  const props = defineProps(["isValidData", "required", "inputElemRef"]);

  const { inputElemRef } = toRefs(props)

  nextTick( () => {

   console.log("inpelem not in mon", props.inputElemRef.validity.valid);
  });

  onMounted( () => {

    nextTick( () => {
      console.log(new Date(), "a")
      console.log("inpelem nexttick", props.inputElemRef.validity.valid);
      console.log(new Date(), "b")
      console.log(isReactive(inputElemRef), isRef(inputElemRef), inputElemRef.value)
    })

    console.log(new Date(), "c")

  })


  watchEffect(inputElemRef, () => {
    console.log("watcheff", props.inputElemRef?.validity) // => input
  })



</script>

<style>
  .ui-input-statusicon_wrap svg {
    height: auto;
    width: 1.5rem;
  }

  .ui-input-statusicon_wrap {
    display: inline-block;
    line-height: 0;
    position: relative;
    top: calc(1.5rem * 2 - 1.5rem / 2);
    left: .25rem;
  }
</style>