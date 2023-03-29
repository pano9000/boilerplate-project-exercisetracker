<template>

  <div class="ui-loading">
    <IconLoader></IconLoader>
    Loading...
  </div>

</template>


<script setup>

  import { IconLoader } from "@tabler/icons-vue"

</script>


<style>

  .ui-loading svg {
    width: 5rem;
    height: auto;
    /*animation: rotate-spinner 20s linear infinite;*/
    display: block;
    margin: 0 auto;
  }

  .ui-loading svg path {
    transition: all .25s;
    animation-name: pulsate;
    animation-duration: 1s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }

  .ui-loading svg > path:nth-of-type(1) {
    animation-delay: 0s;
  }

  .ui-loading svg > path:nth-of-type(2) {
    animation-delay: 0.25s;
  }

  .ui-loading svg > path:nth-of-type(3) {
    animation-delay: 0.5s;
  }

  .ui-loading svg > path:nth-of-type(4) {
    animation-delay: 0.75s;
  }

  .ui-loading svg > path:nth-of-type(5) {
    animation-delay: 1.0s;
  }

  .ui-loading svg > path:nth-of-type(6) {
    animation-delay: 1.25s;
  }

  .ui-loading svg > path:nth-of-type(7) {
    animation-delay: 1.5s;
  }

  .ui-loading svg > path:nth-of-type(8) {
    animation-delay: 1.75s;
  }

  @keyframes rotate-spinner {
    from { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  }

  @keyframes pulsate {
    from {
      stroke-opacity: 0.4;
      /*transform: translateY(-1px);*/
    }

    to {
      stroke-opacity: 1;
    }

  }


</style>