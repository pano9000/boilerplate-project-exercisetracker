<template>
  <div class="blurry-backdrop">

  </div>
  <div class="ui_modal">
    <button class="ui_modal_btn_close" type="submit" @click="$emit('close-modal')">X</button>
    <form action="" method="post">
      <div>
        <label for="username">Username:</label>
        <input id="username" type="text" v-model="newusername">
      </div>
      <button type="submit" @click="apiAddUser">Add User</button>
    </form>

  </div>

  {{ newusername }}
</template>


<script setup>
  import { ref } from "vue";
  defineEmits(['close-modal'])
  const newusername = ref("")
</script>

<style>
.blurry-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}

.ui_modal {
  position: absolute;
  background-color: aliceblue;
  padding: 2rem;
  max-width: 50%;
  top: 50vh;
  left: 50vw; /* move to the middle of the screen (assumes relative parent is the body/viewport) */
  transform: translateX(-50%);
}

.ui_modal_btn_close {
  position: absolute;
  right: 0;
  top: 0;
  padding: .25rem;
}

</style>