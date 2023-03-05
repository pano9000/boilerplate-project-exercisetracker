<template>


  <section>
    <h2>User Details</h2>
    <div>
      <label for="userId">User ID</label>
      <input id="userId" disabled type="text" :value="currentUser.value._id">
    </div>
    <div>
      <label>Username</label>
      <input disabled type="text" :value="currentUser.value.username">
      <button @click="">✏️</button>
    </div>

  </section>

</template>



<script setup>
  import { ref, onBeforeUpdate, onMounted, onUpdated } from "vue";
  const props = defineProps(["currentUser"]);


</script>