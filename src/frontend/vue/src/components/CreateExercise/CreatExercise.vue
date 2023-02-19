<template>
  {{ currentUser }}
  {{ createExerciseForm }}
  <div id="admin-ui_section-createexercise" class="admin-ui_section_action admin-ui_section_subaction">
  <h3>Create New Exercise</h3>
  <form action="/api/users/:userId:/exercises" method="post" id="admin-ui_form-createexercise" class="admin-ui_form">
    <div class="admin-ui_form-input-wrap">
      <div>
        <label for="admin-ui_input-createexercise_userid">User Id</label>
        <input
          id="admin-ui_input-createexercise_userid" 
          type="text" 
          name="userId" 
          placeholder="User Id" 
          required 
          disabled
          pattern="^[a-zA-Z]{1,5}_[0-9a-f]{24}$"
          v-model="createExerciseForm.userId">
      </div>
      <div>
        <label for="admin-ui_input-createexercise_description">Description</label>
        <input id="admin-ui_input-createexercise_description" type="text" name="description" placeholder="Description" required min="3" max="50" v-model="createExerciseForm.description">
      </div>
      <div>
        <label for="admin-ui_input-createexercise_duration">Duration (in Minutes)</label>
        <input id="admin-ui_input-createexercise_duration" type="number" name="duration" placeholder="Duration" required min="1" max="999" v-model="createExerciseForm.duration">
      </div>
      <div>
        <label for="admin-ui_input-createexercise_date">Date</label>
        <input id="admin-ui_input-createexercise_date" type="date" name="date" placeholder="date" v-model="createExerciseForm.date">
      </div>
      <button type="submit" @click.prevent="addExercise($event, createExerciseForm)">Create Exercise</button>
    </div>
    <div class="admin-ui_form-input-wrap">
      <h4>Requirements</h4>
      <p>User Id</p>

      <p>Description</p> Length: 2-50
      Duration: between 1 and 999
      Date (optional)
    </div>
  </form>
  <div class="admin-ui_form-result-wrap" id="admin-ui_form-result-createexercise">
    <h4>Result</h4>
    <div>resulting stuff</div>
  </div>
  <p>REST: <span class="label-rest label-http-verb">POST</span> <span class="label-rest label-api-route">/api/users/:userId/exercises</span></p>
</div>
</template>

<script setup>
  import { addExercise } from "./CreateExercise.functions";
  import { ref, reactive } from "vue";
  const props = defineProps(["currentUser"]);
  console.log("props", props)
  const createExerciseForm = reactive( {
    userId: props.currentUser,
    description: "",
    duration: "",
    date: new Date().toLocaleDateString("fr-CA", {   year: "numeric",   month: "2-digit",   day: "2-digit" }).replace(/\//g, "-"),
  });

</script>

<style>

</style>