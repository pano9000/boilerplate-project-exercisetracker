<template>
  <div class="ui-modal_backdrop" @click="$emit('closeModal')"></div>
  <div class="ui-modal_wrap">

    <button 
      ref="closeBtn"
      class="ui-modal_btn-close"
      type="button" 
      title="Close"
      @click="$emit('closeModal')"
      @keydown.esc="$emit('closeModal')"
    >
      <IconX></IconX>
    </button>

    <section class="ui-modal_content">
      <slot></slot>
    </section>

  </div>

</template>


<script setup>
import { onMounted, ref } from "vue";
import { IconX } from "@tabler/icons-vue";

  defineEmits(['closeModal']);
  const closeBtn = ref(null);

  onMounted(() => {
    closeBtn.value.focus()
  })

</script>

<style>

.ui-modal_backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.ui-modal_wrap {
  border-radius: .5rem;
  position: absolute;
  background-color: #f1f1f1;
  max-width: calc(1280px - 4rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 10px 8px rgb(0,0,0,0.2);
}

.ui-modal_content {
  padding: 2rem;
  max-height: calc(100vh - 10rem);
  overflow-y: scroll;
  border-radius: var(--border-radius);
}

.ui-modal_btn-close {
  position: absolute;
  right: 0;
  top: 0;
  padding: .25rem;
  margin: 0.5rem;
  display: flex;
}

</style>