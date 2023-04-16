<template>

  <div 
    class="ui-messagebox" 
    :class="(['info', 'alert'].includes(options.level)) ? `ui-messagebox-${options.level}` : null"
  >
    <div class="ui-messagebox_icon">
      <IconInfoSquare v-if="options.level === 'info'"></IconInfoSquare>
      <IconAlertTriangleFilled v-if="options.level === 'alert'"></IconAlertTriangleFilled>
    </div>
    <div class="ui-messagebox_text">
      <h3>{{ options.heading }}</h3>
      <p>{{ options.message }}</p>
    </div>
  </div>

</template>


<script setup>
  import { IconInfoSquare, IconAlertTriangleFilled } from '@tabler/icons-vue';
  const props = defineProps(["options"])

</script>

<style>

  .ui-messagebox_icon svg {
    width: 3rem;
    height: auto;
  }

  .ui-messagebox {
    padding: 2rem;
    font-weight: 400;
    background-color: azure;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .ui-messagebox-alert {
    border-left: 1rem solid #fe5050;
  }


  .ui-messagebox-alert .ui-messagebox_icon svg {
    color: #fe5050;
  }

  .ui-messagebox-info {
    border-left: 1rem solid burlywood;
  }



</style>