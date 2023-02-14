<template>
  <p>User UI</p>

  <div>
    <input type="text" v-model="currentUser" list="userlist">
    <datalist id="userlist">

      <option v-for="userId in userList" :key="userList"> {{ userId.username }}</option>
    </datalist>

    <p>
      {{ currentUser }}
    </p>
  </div>

  <UserDetails 
  :currentUser="currentUser">
  </UserDetails>
  Welcome, {{  }}

  
  
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import MenuBar from "./components/MenuBar.vue"
  import UserDetails from "./components/UserDetails/UserDetails.vue";
  defineProps(["userList"])
  const currentUser = ref("");
  const menuItems = ref({
    userList: {
      title: "User Details",
      visible: true,
      id: "userList",
    },
    exerciseList: {
      title: "Exercise List",
      visible: false,
      id: "exerciseList",
    }
  })

  onMounted( () => {
    console.log("userUI mounted")
  })

</script>

<style>

</style>
