<template>


  <section>
    <h2>User Details</h2>
    <div>
      <label for="userId">User ID</label>
      <input id="userId" disabled type="text" :value="userData.value._id">
    </div>
    <div>
      <label>Username</label>
      <input disabled type="text" :value="userData.value.username">
      <button @click="">✏️</button>
    </div>

  </section>

</template>



<script setup>
  import { onBeforeMount, reactive } from "vue";
  import { fetchUser } from "../../services/apiEndpoints";
  const props = defineProps(["currentUser"]);

  const userData = reactive( {
    value: {}
  });

  onBeforeMount( async () => {
    userData.value = await fetchUser(props.currentUser.value._id);
  });

</script>