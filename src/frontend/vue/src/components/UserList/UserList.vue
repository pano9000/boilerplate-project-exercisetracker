<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>

  <PaginationBar
   :list-to-paginate="userList.value"
   :allow-selection="true"
   @update-paginated-list="updatePaginatedListFunc"
   >

  </PaginationBar>

<DataTable
  :table-options="{showSelection: true, showAction: true}"
  :list-action-buttons-options="{showBottom: true, showTop: true, textAddNew: 'Add New User'}"
  :table-headings="['UserId', 'Username']"
  :data-list="paginatedList"
  :data-keys="['_id', 'username']"
  :data-key-id="'_id'"
  @update-current-item="(newValue) => updateValue(newValue, currentUser)"
  @update-selected-items="(newValue) => updateValue(newValue, selectedUsers)"
  @click-add-new="ui_createUserVisible = true"
  @click-del-selected="delUser(selectedUsers.value, userList.value)"
>
  <template v-slot:actionMenuEntries>
    <li @click="showUserDetailsHandler(currentUser.value, currentUser, ui_UserDetailsVisible)" title="Edit User">✏️ Edit User</li>
    <li @click="delUser([currentUser.value], userList.value)" title="Delete User">❌ Delete User</li>
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
        :current-user="currentUser"
      ></UserDetails>
    </ModalWindow>

  </div>
</template>


<script setup>
import CreateUser from "../CreateUser/CreateUser.vue";
import UserDetails from "../UserDetails/UserDetails.vue";
import PaginationBar from "../PaginationBar/PaginationBar.vue";
import DataTable from "../DataTable/DataTable.vue";

import { ref, reactive, onMounted } from "vue";
import {fetchUsers, delUser, showUserDetailsHandler} from "./UserList.functions";
import ModalWindow from "../ModalWindow/ModalWindow.vue";

  const title = "User List";
  const userList = reactive({ value: [] });
  const paginatedList = reactive({ value: [] });
  const currentUser = reactive({ value: {} });
  const selectedUsers = reactive({ value: [] });

  const ui_UserDetailsVisible = reactive({ value: false });
  const ui_createUserVisible = ref(false);

  //TODO: Check if we can change it to work with the value instead, then we could use the "updateValue" func here as well
  function updatePaginatedListFunc(updatedValue) {
    paginatedList.value = updatedValue
  };

  function updateValue(newValue, itemToUpdate) {
    itemToUpdate.value = newValue.value
  };

  onMounted(  async () => {
    userList.value = await fetchUsers();
  })

</script>







<style>

</style>