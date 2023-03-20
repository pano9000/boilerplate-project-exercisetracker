<template>
  <form action="" method="post" autocomplete="off">
    <h3>Add New User</h3>
    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createuser_input-username">
        <span class="ui-input-label_title">Username</span>
        <span class="ui-input-label_hint">Please enter the username for the new user</span>
      </label>
      <input
        id="ui-createuser_input-username"
        name="username"
        type="text"
        placeholder=""
        required
        pattern="^[a-z0-9_\-]{3,30}$"
        autocomplete="false"
        v-model="username.value"
        @input="formValidityCheck($event, isValidData)"
      >
      <span class="ui-input-label_hint ui-input-label_reqs">The username should have a length of minimum 3 and maximum 30 characters.</span>
      <span class="ui-input-label_hint ui-input-label_reqs"> It and can consist of <span class="spanhighlight">0-9</span> (Numbers), <span class="spanhighlight">a-z</span> (lowercase letters), <span class="spanhighlight">-</span> (minus) and <span class="spanhighlight">_</span> (underscore) characters.
      </span>
  </div>
  <button 
    type="submit"
    :disabled="!isValidData.value"
    @click="submitFormHandler($event, username, addUser)"
  >
    Add User
  </button>
  </form>
</template>


<script setup>

  import { formValidityCheck } from "../../../services/utils"
  import { reactive } from "vue";
  import { submitFormHandler } from "../../../services/utils.js";
  import { addUser } from "../../../services/apiEndpoints";


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
  box-shadow: var(--box-shadow);
}

.list_requirements {
  text-align: left;
}

</style>