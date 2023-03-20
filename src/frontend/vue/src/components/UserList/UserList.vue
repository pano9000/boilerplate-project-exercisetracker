<template>
  <h2> {{ title }} </h2>

<DataTable
  :table-options="{showSelection: true, showAction: true}"
  :list-action-buttons-options="{showBottom: true, showTop: false, textAddNew: 'Add New User'}"
  :paginationbar-options="{allowSelection: true, showTop: true, showBottom: false}"
  :table-headings="['UserId', 'Username']"
  :data-list="userList"
  :data-keys="['_id', 'username']"
  :data-key-id="'_id'"
  @update-current-item="(newValue) => updateValue(newValue, currentUser)"
  @update-selected-items="(newValue) => updateValue(newValue, selectedUsers)"
  @click-add-new="uiVisibility.value.createUser = true"
  @click-del-selected="deleteUserHandler(selectedUsers.value, userList.value)"
>
  <template v-slot:actionMenuEntries>
    <li 
      tabindex="0" 
      @click="uiVisibilityHandler(uiVisibility, 'userDetails')"
      @keyup.enter="uiVisibilityHandler(uiVisibility, 'userDetails')"
      @keyup.space="uiVisibilityHandler(uiVisibility, 'userDetails')"
      title="Edit User"
    >
      <IconPencil></IconPencil>
      Edit User
    </li>
    <li 
      tabindex="0" 
      @click="deleteUserHandler([currentUser.value], userList.value)"
      @keyup.enter="deleteUserHandler([currentUser.value], userList.value)"
      @keyup.space="deleteUserHandler([currentUser.value], userList.value)"
      title="Delete User"
    >
      <IconX></IconX>
      Delete User
    </li>
    <li 
      tabindex="0" 
      @click="uiVisibilityHandler(uiVisibility, 'createExercise')"
      @keyup.enter="uiVisibilityHandler(uiVisibility, 'createExercise')"
      @keyup.space="uiVisibilityHandler(uiVisibility, 'createExercise')"
      title="Add Exercise"
    >
      <IconPlus></IconPlus>
      Add Exercise
    </li>
    <li 
      tabindex="0" 
      @click="uiVisibilityHandler(uiVisibility, 'exerciseLog')"
      @keyup.enter="uiVisibilityHandler(uiVisibility, 'exerciseLog')" 
      @keyup.space="uiVisibilityHandler(uiVisibility, 'exerciseLog')" 

      title="Show Exercise Log"
    >
      <IconListDetails></IconListDetails>
      Show Exercise Log
    </li>
  </template>

</DataTable>

  <div v-if="uiVisibility.value.createUser">
    <ModalWindow @close-modal="uiVisibility.value.createUser=false">
      <CreateUser></CreateUser>
    </ModalWindow>
  </div>

  <div v-if="uiVisibility.value.userDetails">
    <ModalWindow @close-modal="uiVisibility.value.userDetails = false">
      <UserDetails
        :current-user="currentUser"
      ></UserDetails>
    </ModalWindow>
  </div>

  <div v-if="uiVisibility.value.createExercise">
    <ModalWindow
      @close-modal="uiVisibility.value.createExercise = false"
    >
      <CreateExercise
        :current-user="currentUser"
      ></CreateExercise>
    </ModalWindow>
  </div>
</template>


<script setup>
import CreateUser from "../Forms/CreateUser/CreateUser.vue";
import UserDetails from "../Forms/UserDetails/UserDetails.vue";

import CreateExercise from "../Forms/CreateExercise/CreateExercise.vue";
import DataTable from "../DataTable/DataTable.vue";

import { ref, reactive, onMounted } from "vue";
import { deleteUserHandler } from "./UserList.functions";
import { getAllUsers } from "../../services/apiEndpoints";
import ModalWindow from "../ModalWindow/ModalWindow.vue";
import { uiVisibilityHandler, updateValue } from "../../services/utils";

  const title = "User List";
  const userList = reactive({ value: [] });
  const currentUser = reactive({ value: {} });
  const selectedUsers = reactive({ value: [] });

  const uiVisibility = reactive( {
    value: {
      userDetails: false,
      createUser: false,
      createExercise: false,
      exerciseLog: false
    }
  });

  onMounted( async () => {
    userList.value = await getAllUsers();
  })

</script>







<style>

</style>