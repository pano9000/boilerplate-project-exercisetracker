<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>
  <label for="admin-ui_showentryqty">Show max. entries</label>
  <select id="admin-ui_showentryqty" v-model="ui_showentryqty">
    <option v-for="value in [5, 10, 25, 50]" :key="value"> {{value}}</option>
  </select>

  <p>Showing {{ ui_showentryqty }} entries of total {{ userList.length }}</p>
  
  <nav>
    
    <p>{{ totalPages }} Pages</p>
    
  </nav>
  <table>
    <thead>
      <tr>
        <td>UserId</td>
        <td>Username</td>
        <td>Selection</td>
        <td>Edit</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in paginatedList" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
        <td><input type="checkbox" v-model="selectedUsers[user.username]"></td>
        <td>
          <button>✏️</button>
          <button @click="delUser([user.username], userList)">❌</button>
        </td>
      </tr>

      
    </tbody>
  </table>

  <div>
    <button type="button">➕ Add New</button>
    <button type="button" @click="selectAll()">O Select All</button>
    <button type="button" @click="delUser([], userList)">❌ Delete Selected</button>
  </div>

  <div>
    {{ selectedUsers }}
  </div>

  <div>
    {{ paginatedList }}
  </div>


</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import {fetchUsers, delUser} from "./UserList.functions";

  const title = "User List"
  const userList = ref([])
  const ui_showentryqty = ref(5)
  const selectedUsers = ref({});
  const paginatedList = computed( () => userList.value.slice(0,ui_showentryqty.value));

  const totalPages = computed( () => Math.ceil(userList.value.length / ui_showentryqty.value) )

  onMounted(  async () => {
    userList.value = await fetchUsers();
  })

  function selectAll(selectedUsers) {

    console.log("sad", this.selectedUsers)
    
  }

  function submitUser() {
    console.log("yo")
  }

</script>







<style>
table {
  width: 100%;
  border: 1px solid gray;
  border-collapse: collapse;
  background-color: beige;

}

td {
  padding: 1rem;
  border: 1px solid gray;
}

</style>