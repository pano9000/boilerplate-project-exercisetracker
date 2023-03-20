<template>
  <p>User UI</p>

  <div>
    <input type="text" v-model="currentUser" list="userlist">
    <datalist id="userlist">

      <option v-for="(userId, index) in userList" :key="`${userList}_${index}`"> {{ userId.username }}</option>
    </datalist>

    <p>

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
  import UserDetails from "./components/Forms/UserDetails/UserDetails.vue";
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
