<template>
  <div class="blurry-backdrop" @click="$emit('close-modal')"></div>
  <div class="ui_modal">
    <button 
      class="ui_modal_btn_close" 
      type="submit" 
      title="Close"
      @click="$emit('close-modal')"
    >
      ✖
    </button>
    <slot></slot>

  </div>

</template>


<script setup>
  defineEmits(['close-modal']);
</script>

<style>

.blurry-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.ui_modal {
  border-radius: .5rem;
  position: fixed;
  background-color: aliceblue;
  padding: 2rem;
  max-width: 50%;
  top: 50%;
  left: 50%; /* move to the middle of the screen (assumes relative parent is the body/viewport) */
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 10px 8px rgb(0,0,0,0.2);
}

.ui_modal_btn_close {
  position: absolute;
  right: 0;
  top: 0;
  padding: .25rem;
  line-height: 1rem;
}

</style>