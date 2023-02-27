<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>

  <PaginationBar
   :listToPaginate="userList.value"
   :allowSelection="true"
   @updatePaginatedList="paginatedListFunc"
   >

  </PaginationBar>

  <ListActionButtons
    @click-addNew="ui_createUserVisible = true"
    @click-selection="((!hasSelectedUsers) ? selectionHandler(paginatedList.value, true) : selectionHandler(paginatedList.value, false))"
    @click-delSelected="delUser(selectedUsers, userList.value)"
    :hasSelection="hasSelectedUsers"
    :textAddNew="'Add New User'"
  >
  </ListActionButtons>
 

<DataTable
  :tableOptions="{showSelection: true, showAction: true}"
  :tableHeadings="['UserId', 'Username']"
  :dataList="paginatedList"
  :dataKeys="['_id', 'username']"
  :dataKeyId="'_id'"
  @updateSelectedItem="updateSelectedItemFunc"
>
  <template v-slot:actionMenuEntries>
    <li @click="showUserDetailsHandler(currentUser.value, currentUser, ui_UserDetailsVisible)" title="Edit">✏️ Edit</li>
    <li @click="delUser([currentUser.value], userList.value)" title="Delete">❌ Delete</li>
  </template>

</DataTable>

  <table>
    <thead>
      <tr>
        <td class="list-header list-header-narrow">Selection</td>
        <td class="list-header list-header-flex">UserId</td>
        <td class="list-header list-header-flex">Username</td>
        <td class="list-header list-header-medium">Edit</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in paginatedList.value" :key="user._id">
        <td><input type="checkbox" v-model="user.selected"></td>
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
        <td>
          <button @click="showUserDetailsHandler(user, currentUser, ui_UserDetailsVisible)">✏️</button>
          <button @click="delUser([user], userList.value)">❌</button>
        </td>
      </tr>

      
    </tbody>
  </table>

  <ListActionButtons
    @click-addNew="ui_createUserVisible = true"
    @click-selection="((!hasSelectedUsers) ? selectionHandler(paginatedList.value, true) : selectionHandler(paginatedList.value, false))"
    @click-delSelected="delUser(selectedUsers, userList.value)"
    :hasSelection="hasSelectedUsers"
    :textAddNew="'Add New User'"
  >
  </ListActionButtons>



  <div v-show="ui_createUserVisible">
    <ModalWindow @close-modal="ui_createUserVisible=false">
      <CreateUser></CreateUser>
    </ModalWindow>
  </div>

  <div v-show="ui_UserDetailsVisible.value === true">
    <ModalWindow @close-modal="ui_UserDetailsVisible.value=false">
      <UserDetails
        :currentUser="currentUser"
      ></UserDetails>
    </ModalWindow>

  </div>
</template>


<script setup>
import CreateUser from "../CreateUser/CreateUser.vue";
import UserDetails from "../UserDetails/UserDetails.vue";
import PaginationBar from "../PaginationBar/PaginationBar.vue";
import ListActionButtons from "../ListActionButtons/ListActionButtons.vue";
import DataTable from "../DataTable/DataTable.vue";

import { ref, reactive, onMounted, computed, isReactive } from "vue";
import {fetchUsers, delUser, selectionHandler, showUserDetailsHandler} from "./UserList.functions";
import ModalWindow from "../ModalWindow/ModalWindow.vue";

  const title = "User List";
  const userList = reactive( {
    value: []
  });

  const currentUser = reactive({value: {}
  });

  const ui_UserDetailsVisible = reactive({
    value: false
  });

  const ui_createUserVisible = ref(false);

  function paginatedListFunc(value) {
    console.log(value)
    paginatedList.value = value
  };

  function updateSelectedItemFunc(value) {
    console.log("updSel", value)
    currentUser.value = value.value
  };

  const paginatedList = reactive({ value: []});

  console.log("inUserList paginiated", paginatedList)

  const selectedUsers = computed( () => paginatedList.value.filter(user => user.selected === true) );
  const hasSelectedUsers = computed( () => selectedUsers.value.length > 0 ? true : false)

  onMounted(  async () => {
    userList.value = await fetchUsers();
  })

</script>







<style>
table {
  width: 100%;
  border: 1px solid gray;
  border-collapse: collapse;
  background-color: beige;
  table-layout: fixed;
  word-break: break-all;
}

td {
  padding: 1rem;
  border: 1px solid gray;
}

.activePg {
  font-weight: 700;
}

.btn-pagination {
  min-width: 4.25rem;
}

button:disabled {
  pointer-events: none;
}

.list-header-narrow {
  width: 5rem;
}

.list-header-medium {
  width: 10rem;
}


.ui-jumpToPage {
  width: 4ch;
}

.ui_pagination-nav {
  display: block;
}

.ui_pagination-row-actions {
  display: flex;
  justify-content: center;
}

</style>