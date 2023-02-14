<template>
  <form action="" method="post">
    <h3>Add new User</h3>

    <section>
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
      <li>Length: <span class="spanhighlight">3–30</span> characters</li>
    </ul>
    </section>

    <section>
      <fieldset>
        <legend>User Information</legend>
        <label for="input_username">Username:</label>
        <input
          id="input_username"
          name="username"
          type="text"
          v-model="username.value"
          @input="formValidityCheck($event, isValidData)"
          required
          pattern="^[a-z0-9_\-]{3,30}$"
          autocomplete="false"
        >
      </fieldset>
    </section>

    <section>
      <button 
        type="submit"
        :disabled="!isValidData.value"
        @click="addUser($event, username)"
        >
        Add User
      </button>
    </section>
  </form>

</template>


<script setup>

  import { addUser } from "./CreateUser.functions";
  import { formValidityCheck } from "../../services/utils"
  import { ref, reactive } from "vue";
  defineEmits(['close-modal']);

  const isValidData = reactive({
    value: false
  });

  const username = reactive({
    value: ""
  });

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
  background-color: rgba(255, 255, 255, 0.8);
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