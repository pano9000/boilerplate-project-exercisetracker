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
    <div><button v-for="(pg, pgIndex) in totalPages">{{ pg + 1 }}</button></div>

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
        <td><input type="checkbox" v-model="user.selected"></td>
        <td>
          <button>✏️</button>
          <button @click="delUser([user], userList)">❌</button>
        </td>
      </tr>

      
    </tbody>
  </table>

  <div>
    <button type="button" @click="ui_createUserVisible = true">➕ Add New</button>
    <button type="button" v-if="!hasSelectedUsers" @click="selectionHandler(paginatedList, true)">O Select All</button>
    <button type="button" v-if="hasSelectedUsers" @click="selectionHandler(paginatedList, false)">O Clear Selection</button>
    <button type="button" :disabled="!hasSelectedUsers" :class="hasSelectedUsers ? 'active' : 'inactive'" @click="delUser(selectedUsers, userList)">❌ Delete Selected</button>
  </div>

  <div v-if="ui_createUserVisible">
    <CreateUser
      @close-modal="ui_createUserVisible=false"
    ></CreateUser>
  </div>

  <div>
    {{ selectedUsers }} // {{ selectedUsers.length }}
  </div>

  <div>
    {{ paginatedList }}
  </div>


</template>


<script setup>
import CreateUser from "../CreateUser/CreateUser.vue";

import { ref, onMounted, computed } from "vue";
import {fetchUsers, delUser, selectionHandler} from "./UserList.functions";

  const title = "User List"
  const userList = ref([])
  const ui_showentryqty = ref(5)
  const ui_createUserVisible = ref(false);
  const paginatedList = computed( () => {
    return userList.value.slice(0,ui_showentryqty.value).map(user => {
      user.selected = false;
      return user
    })
  });
  const selectedUsers = computed( () => paginatedList.value.filter(user => user.selected === true) );
  const hasSelectedUsers = computed( () => selectedUsers.value.length > 0 ? true : false)
  const totalPages = computed( () => Math.ceil(userList.value.length / ui_showentryqty.value) )

  onMounted(  async () => {
    userList.value = await fetchUsers();
  })

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