<template>
  <h3>Add New Exercise</h3>
  <form class="ui-createexercise_form ui-form">
    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-userid">User Id</label>
      <input
        id="ui-createexercise_input-userid"
        type="text"
        name="userId"
        placeholder=""
        required
        readonly
        pattern="^[a-zA-Z]{1,5}_[0-9a-f]{24}$"
        v-model="createExerciseForm.userId"
      >
    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-description">
        <span class="ui-input-label_title">Description</span>
        <span class="ui-input-label_hint">Please enter a description for the exercise</span>
      </label>
      <input 
        id="ui-createexercise_input-description"
        type="text"
        name="description"
        placeholder=""
        required
        minlength="3"
        maxlength="50"
        v-model="createExerciseForm.description"
        @input="formValidityCheck($event, isValidData)"
      >
      <span class="ui-input-label_hint">Format: Minimum Length 3, Maximum Length 50</span>
    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-duration">
        <span class="ui-input-label_title">Duration</span>
        <span class="ui-input-label_hint">Please enter the duration of the exercise in minutes</span>
      </label>
      <input
        id="ui-createexercise_input-duration"
        type="number"
        name="duration"
        placeholder=""
        required
        min="1"
        max="999"
        v-model="createExerciseForm.duration"
        @input="formValidityCheck($event, isValidData)"
      >
      <span class="ui-input-label_hint ui-input-label_reqs">Format: A Number between 1 and 999</span>
    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-date">
        <span class="ui-input-label_title">Date</span>
        <span class="ui-input-label_hint">Please enter the date of the exercise</span>
      </label>
      <input
        id="ui-createexercise_input-date"
        type="date"
        name="date"
        placeholder=""
        required
        v-model="createExerciseForm.date"
        @input="formValidityCheck($event, isValidData)"
      >
    </div>
    <button 
      type="submit" 
      @click.prevent="submitFormHandler($event, createExerciseForm, addExercise)"
      :disabled="!isValidData.value"
    >Create Exercise</button>
  </form>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { submitFormHandler, formValidityCheck } from "../../services/utils";
  import { addExercise } from "../../services/apiEndpoints";

  const props = defineProps(["currentUser"]);

  const createExerciseForm = reactive( {
    userId: props.currentUser.value._id,
    description: "",
    duration: "",
    date: new Date().toISOString().slice(0,10),
  });

  const isValidData = reactive( { value: false } );

</script>

<style>

.ui-input_wrap {
  margin-bottom: 1.5rem;
  text-align: left;
}

.ui-input_wrap input {
  width: 100%;
}


.ui-input_wrap label {
  font-weight: 600;
  font-size: 1rem;
}

.ui-input-label_hint {
  font-weight: 400;
  font-size: 0.8rem;
  display: block;
}

.ui-input_wrap_required .ui-input-label_title::after {
  content: "*";
  font-size: 1rem;
}

</style>