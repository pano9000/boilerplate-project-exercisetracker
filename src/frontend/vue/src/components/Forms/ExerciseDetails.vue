<template>

  <section>
    <h2>Exercise Details</h2>
    <div>
      <label for="exerciseId">Exercise ID</label>
      <input id="exerciseId" disabled type="text" :value="exerciseData.value._id">
    </div>
    <div>
      <label for="userId">User ID</label>
      <input id="userId" disabled type="text" :value="exerciseData.value.userId">
    </div>

    <div>
      <label for="description">Description</label>
      <input id="description" disabled type="text" :value="exerciseData.value.description">
    </div>

    <div>
      <label for="duration">Duration (min)</label>
      <input id="duration" disabled type="text" :value="exerciseData.value.duration">
    </div>

    <div>
      <label for="date">Date</label>
      <input id="date" disabled type="text" :value="exerciseData.value.date">
    </div>

  </section>

</template>



<script setup>
  import { onBeforeMount, reactive } from "vue";
  import { getExerciseById } from "../../services/apiEndpoints";
  const props = defineProps(["currentExercise"]);

  const exerciseData = reactive( {
    value: {}
  });

  onBeforeMount( async () => {
    exerciseData.value = (await getExerciseById(props.currentExercise.value.userId, props.currentExercise.value._id)).data;
  });

</script>