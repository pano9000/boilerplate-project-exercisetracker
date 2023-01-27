<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>
  <label for="admin-ui_showentryqty">Show max. entries</label>
  <select id="admin-ui_showentryqty" v-model="ui_showentryqty">
    <option v-for="value in [5, 10, 25, 50]" :key="value"> {{value}}</option>
  </select>

  <p>Showing {{ ui_showentryqty }} entries of total {{ userList.length }}</p>
  <p>{{ totalPages }} Pages</p>
  <table>
    <thead>
      <tr>
        <td>UserId</td>
        <td>Username</td>
        <td>Edit</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in paginatedList" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
        <td>
          <span>✏️</span>
          <span @click="delUser(user.username)">❌</span>
        </td>
      </tr>
      <tr>+</tr>
    </tbody>
  </table>

</template>


<script setup>
import { ref, onMounted, computed } from 'vue';

  const title = "User List"
  const userList = ref({})
  const ui_showentryqty = ref(5)
  const paginatedList = userList
  const totalPages = computed( () => Math.ceil(userList.value.length / ui_showentryqty.value) )

  onMounted(  async () => {
    userList.value = await fetchUsers();
    console.log(userList.value.slice(0, 4))
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

  async function delUser(username) {
    if (confirm(`Are you sure you want to delete ${username}`)) {
      // api call -> delete user
      // TODO

      // ui-update: -> delete user from list
      const indexToDelete = userList.value.findIndex( (userEntry) => userEntry.username === username)
      userList.value.splice(indexToDelete, 1)
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