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
          :isValid="createUserForm.username.valid && createUserForm.username.available"
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
          @input="inputHandler($event, {
            'reactiveForm': createUserForm,
            'reactiveFormItem': 'username',
            'availabilityCheck': true,
            'availabilityFunc': checkUsernameAvailability,
            'inputTimeoutId': inputTimeoutId
          })"
        >
        <span class="ui-input-label_hint ui-input-label_reqs" v-if="createUserForm.username.valid && !createUserForm.username.available">
          The username is already taken. Please choose another one.
        </span>
        <span class="ui-input-label_hint ui-input-label_reqs" v-else>
          The username should have a length of minimum 3 and maximum 30 characters.
          It can consist of <span class="spanhighlight">0-9</span>&nbsp;(Numbers),
          <span class="spanhighlight">a-z</span>&nbsp;(lowercase letters),
          <span class="spanhighlight">-</span>&nbsp;(minus) and 
          <span class="spanhighlight">_</span>&nbsp;(underscore) characters.
        </span>
      </div>
  </div>
  <button 
    type="submit"
    :disabled="!isValidData && inputTimeoutId !== null"
    @click="submitFormHandler($event, createUserForm, addUser)"
  >
    Add User
  </button>
  </form>
</template>


<script setup>
  import { reactive, computed } from "vue";
  import InputStatusIcon from "../../Input-StatusIcon.vue";

  import { submitFormHandler, ReactiveFormItem, getIsValidData, inputHandler } from "../../../services/utils";
  import { addUser, checkUsernameAvailability } from "../../../services/apiEndpoints";

  const createUserForm = reactive( {
    username: ReactiveFormItem(),
  });

  const isValidData = computed( () => getIsValidData(createUserForm));

  const inputTimeoutId = reactive( { value: "" } );


</script>

<style>

.spanhighlight {
  background-color: #f1f1f1;
  padding: .25rem;
  border-radius: .25rem;
}

</style>