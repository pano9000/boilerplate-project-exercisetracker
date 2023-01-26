<template>
  <h2> {{ title }} </h2>
  <div id="">
    <input type="text" placeholder="Username">
    <button @click="submitUser">Add new user</button>

  </div>

  <h3>mockup</h3>
  <label for="admin-ui_showentryqty">Show max. entries</label>
  <select id="admin-ui_showentryqty">
    <option  v-for="value in [5, 10, 25, 50]" :key="value"> {{value}}</option>
  </select>
  <table>
    <thead>
      <tr>
        <td>UserId</td>
        <td>Username</td>
        <td>Edit</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userList" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
        <td>Edit</td>
      </tr>
      <tr>+</tr>
    </tbody>
  </table>

</template>


<script setup>
import { ref, onMounted } from 'vue';

  const title = "Create New User"
  const userList = ref({})

  
  onMounted(  async () => {
    userList.value = await fetchUsers();
  })
  userList.value = fetchUsers();

  function submitUser() {
    console.log("yo")
  }

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3002/api/users");
      if (!response.ok) {
        throw new Error("fetching failed")
      }
      return await response.json()
    }
    catch(error) {
      const createDummyData = () => {
        const dummyData = []
        for (let i=0; i<100; i++) {
          dummyData.push( { 
            _id: `user_${i}`,
            username: `username_${i}`
          })
        }
        return dummyData
      }
      return createDummyData()
    }
    
  }

</script>







<style>
table {
  width: 100%;
  border: 1px solid gray;
  border-collapse: collapse;
}

td {
  border: 1px solid gray;
}

</style>