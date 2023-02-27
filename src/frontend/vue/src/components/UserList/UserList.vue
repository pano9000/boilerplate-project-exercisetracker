<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>

  <PaginationBar
   :listToPaginate="userList.value"
   :allowSelection="true"
   @updatePaginatedList="paginatedListFunc"
   >

  </PaginationBar>

<DataTable
  :tableOptions="{showSelection: true, showAction: true}"
  :listActionButtonsOptions="{showBottom: true, showTop: true, textAddNew: 'Add New User'}"
  :tableHeadings="['UserId', 'Username']"
  :dataList="paginatedList"
  :dataKeys="['_id', 'username']"
  :dataKeyId="'_id'"
  @updateSelectedItem="updateSelectedItemFunc"
  @click-addNew="ui_createUserVisible = true"
  @click-delSelected="delUser(selectedUsers, userList.value)"
>
  <template v-slot:actionMenuEntries>
    <li @click="showUserDetailsHandler(currentUser.value, currentUser, ui_UserDetailsVisible)" title="Edit">✏️ Edit</li>
    <li @click="delUser([currentUser.value], userList.value)" title="Delete">❌ Delete</li>
  </template>

</DataTable>

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

import { ref, reactive, onMounted } from "vue";
import {fetchUsers, delUser, selectionHandler, showUserDetailsHandler} from "./UserList.functions";
import ModalWindow from "../ModalWindow/ModalWindow.vue";

  const title = "User List";
  const userList = reactive({ value: [] });
  const paginatedList = reactive({ value: [] });
  const currentUser = reactive({ value: {} });

  const ui_UserDetailsVisible = reactive({ value: false });
  const ui_createUserVisible = ref(false);

  function paginatedListFunc(updatedValue) {
    paginatedList.value = updatedValue
  };

  function updateSelectedItemFunc(updatedValue) {
    currentUser.value = updatedValue.value
  };

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