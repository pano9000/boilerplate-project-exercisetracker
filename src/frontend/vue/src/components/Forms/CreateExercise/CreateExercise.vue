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
        v-model="createExerciseForm.userId.value"
      >
    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-description">
        <span class="ui-input-label_title">Description</span>
        <span class="ui-input-label_hint">Please enter a description for the exercise</span>
      </label>

      <div class="ui-input_line">
        <InputStatusIcon
          :isValid="createExerciseForm.description.valid"
          :required="createExerciseForm.description.required"
        >
        </InputStatusIcon>
        <input 
          type="text"
          name="description"
          placeholder=""
          required
          minlength="3"
          maxlength="50"
          v-model="createExerciseForm.description.value"
          @input="inputHandler($event, { reactiveForm: createExerciseForm, reactiveFormItem: 'description' })"
        >

        <span class="ui-input-label_hint ui-input-label_reqs">Format: minimum length 3, maximum length 50</span>
      </div>
    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-duration">
        <span class="ui-input-label_title">Duration</span>
        <span class="ui-input-label_hint">Please enter the duration of the exercise in minutes</span>
      </label>

      <div class="ui-input_line">
        <InputStatusIcon
          :isValid="createExerciseForm.duration.valid"
          :required="createExerciseForm.duration.required"
        >
        </InputStatusIcon>

        <input
          id="ui-createexercise_input-duration"
          type="text"
          name="duration"
          required
          placeholder=""
          pattern="\d{1,3}"
          v-model="createExerciseForm.duration.value"
          @input="inputHandler($event, { reactiveForm: createExerciseForm, reactiveFormItem: 'duration' })"
          
        >

        <span class="ui-input-label_hint ui-input-label_reqs">Format: A number between 1 and 999</span>
      </div>

    </div>

    <div class="ui-input_wrap ui-input_wrap_required">
      <label for="ui-createexercise_input-date">
        <span class="ui-input-label_title">Date</span>
        <span class="ui-input-label_hint">Please enter the date of the exercise</span>
      </label>

      <div class="ui-input_line">
        <InputStatusIcon
          :isValid="createExerciseForm.date.valid"
          :required="createExerciseForm.date.required"
        >
        </InputStatusIcon>

        <input
          id="ui-createexercise_input-date"
          type="date"
          name="date"
          placeholder=""
          required
          v-model="createExerciseForm.date.value"
          @input="inputHandler($event, { reactiveForm: createExerciseForm, reactiveFormItem: 'date' })"
        >
        <span class="ui-input-label_hint ui-input-label_reqs">Format: A valid date</span>

      </div>

    </div>
    <button 
      type="submit" 
      @click.prevent="submitFormHandler($event, createExerciseForm, addExercise)"
      :disabled="!isValidData"
    >Create Exercise</button>
  </form>
</template>

<script setup>
  import { ref, reactive, computed } from "vue";
  import { submitFormHandler, ReactiveFormItem, getIsValidData, inputHandler } from "../../../services/utils";
  import { addExercise } from "../../../services/apiEndpoints";
  import InputStatusIcon from "../../Input-StatusIcon.vue";
  const props = defineProps(["currentUser"]);

  const createExerciseForm = reactive( {
    userId: ReactiveFormItem(props.currentUser._id),
    description: ReactiveFormItem(),
    duration: ReactiveFormItem(),
    date: ReactiveFormItem(new Date().toISOString().slice(0,10))
  });


  const isValidData = computed( () => getIsValidData(createExerciseForm));




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
  line-height: 1rem;
  display: block;
}

.ui-input_wrap_required .ui-input-label_title::after {
  content: "*";
  font-size: 1rem;
}

.ui-input_line {
  position: relative;
}

</style>