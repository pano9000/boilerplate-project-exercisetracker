<template>
  <div class="blurry-backdrop">

  </div>
  <div class="ui_modal">
    <button class="ui_modal_btn_close" type="submit" @click="$emit('close-modal')">X</button>
    <form action="" method="post">
      <h4>Username Requirements </h4>
      <ul class="list_requirements">
        <li>Allowed characters:
          <ul>
          <li>Numbers: <span class="spanhighlight">0-9</span></li>
          <li>Letters: <span class="spanhighlight">a-z</span> (lowercase)</li>
          <li>Hyphen: <span class="spanhighlight">-</span></li>
          <li>Underscore: <span class="spanhighlight">_</span></li>
        </ul>
      </li>
        <li>Minimum length: 3 characters</li>
        <li>Maximum length: 30 characters</li>
      </ul>
      <div>
        <label for="input_username">Username:</label>
        <input
          id="input_username"
          name="username"
          type="text"
          v-model="newusername"
          pattern="^[a-z0-9_\-]{3,30}$"
        >
      </div>
      <button type="submit" @click="addUser($event, this.newusername)">Add User</button>
    </form>

  </div>

  {{ newusername }}
</template>


<script setup>

  import { addUser } from "./CreateUser.functions";

  import { ref } from "vue";
  defineEmits(['close-modal'])
  const newusername = ref("")

</script>

<style>

input:valid {
  background-color: green;
}

input:invalid {
  background-color: #fe5050;
}

.blurry-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}

.ui_modal {
  position: fixed;
  background-color: aliceblue;
  padding: 2rem;
  max-width: 50%;
  top: 50%;
  left: 50%; /* move to the middle of the screen (assumes relative parent is the body/viewport) */
  transform: translate(-50%, -50%);
}

.ui_modal_btn_close {
  position: absolute;
  right: 0;
  top: 0;
  padding: .25rem;
}

.spanhighlight {
  background-color: honeydew;
  padding: .25rem;
  border-radius: .25rem;
  box-shadow: 1px 1px 5px 1px rgb(0,0,0,0.1);
}

.list_requirements {
  text-align: left;
}

</style>