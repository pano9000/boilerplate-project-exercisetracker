<template>
  <h3>Add New User</h3>
  <form class="ui-createexercise_form ui-form" autocomplete="off">
    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createuser_input-username">
        <span class="ui-input-label_title">Username</span>
        <span class="ui-input-label_hint">Please enter the username for the new user</span>
      </label>

      <div class="ui-input_line">

        <InputStatusIcon
          :isValid="createUserForm.username.valid"
          :required="createUserForm.username.required"
        >
        </InputStatusIcon>

        <input
          id="ui-createuser_input-username"
          name="username"
          type="text"
          placeholder=""
          required
          pattern="^[a-z0-9_\-]{3,30}$"
          autocomplete="false"
          v-model="createUserForm.username.value"
          @input="inputHandler($event, 'username', createUserForm)"
        >
        <span class="ui-input-label_hint ui-input-label_reqs">The username should have a length of minimum 3 and maximum 30 characters. It and can consist of <span class="spanhighlight">0-9</span> (Numbers), <span class="spanhighlight">a-z</span> (lowercase letters), <span class="spanhighlight">-</span> (minus) and <span class="spanhighlight">_</span> (underscore) characters.</span>
      </div>
  </div>
  <button 
    type="submit"
    :disabled="!isValidData"
    @click="submitFormHandler($event, createUserForm, addUser)"
  >
    Add User
  </button>
  </form>
</template>


<script setup>
  import { reactive, computed } from "vue";
  import InputStatusIcon from "../../Input-StatusIcon.vue";

  import { ReactiveFormItem } from "../../../services/utils"
  import { submitFormHandler } from "../../../services/utils.js";
  import { addUser } from "../../../services/apiEndpoints";

  const createUserForm = reactive( {
    username: ReactiveFormItem(),
  });

  const isValidData = computed(() => {
    for (let item in createUserForm) {
      if (createUserForm[item]["valid"] !== true) {
        return false
      };
    }
    return true
   });

   function getInputStatus(elem, inputValue) {
    return (inputValue === "") ? null : elem?.validity?.valid
  }

  function inputHandler(event, item, statusObj) {
    statusObj[item].valid = getInputStatus(event.target, statusObj[item]["value"])
  }


</script>

<style>

.spanhighlight {
  background-color: #f1f1f1;
  padding: .25rem;
  border-radius: .25rem;
}

</style>