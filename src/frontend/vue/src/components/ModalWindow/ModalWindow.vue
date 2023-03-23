<template>
  <div class="ui-modal_backdrop" @click="$emit('closeModal')"></div>
  <section class="ui-modal">
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
    <slot></slot>

  </section>

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

.ui-modal {
  border-radius: .5rem;
  position: fixed;
  background-color: aliceblue;
  padding: 2rem;
  max-width: 50%;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 2px 2px 10px 8px rgb(0,0,0,0.2);
}

.ui-modal_btn-close {
  position: absolute;
  right: 0;
  top: 0;
  padding: .25rem;
  line-height: 1rem;
  margin: 0.5rem;
}

</style>