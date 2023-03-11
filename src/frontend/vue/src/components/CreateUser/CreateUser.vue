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
        @click="addUserHandler($event, username)"
        >
        Add User
      </button>
    </section>
  </form>

</template>


<script setup>

  import { addUserHandler } from "./CreateUser.functions";
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