<template>
  <h2> {{ title }} </h2>

  <DataTableFilters
    :options="{
      showDateRange: false,
      showLimit: false,
      actionButtonText: 'Load Users',
      sortByOptions: dataTableFiltersSortByOptions,
    }"
    @click-action-button="(userFilters) => loadUsersHandler(userFilters, userList)"
  >
  </DataTableFilters>

  <Transition mode="out-in">

    <LoadingSpinner v-if="isLoading">
    </LoadingSpinner>
    <section v-else>

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
          <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'userDetails')">
            <IconPencil></IconPencil>
            Edit User
          </ActionMenuEntry>

          <ActionMenuEntry @action-menu-event="deleteUserHandler([currentUser.value], userList.value)">
            <IconX></IconX>
            Delete User
          </ActionMenuEntry>

          <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'createExercise')">
            <IconPlus></IconPlus>
            Add Exercise
          </ActionMenuEntry>

          <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'exerciseLog')">
            <IconListDetails></IconListDetails>
            Show Exercise Log
          </ActionMenuEntry>
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

    </section>
  </Transition>

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
import { IconX, IconPlus, IconPencil, IconListDetails } from "@tabler/icons-vue"
import LoadingSpinner from "../Loading-Spinner.vue";

import ActionMenuEntry from "../ActionMenuEntry.vue";
import DataTableFilters from "../DataTableFilters/DataTableFilters.vue";

  const title = "User List";
  const userList = reactive({ value: [] });
  const currentUser = reactive({ value: {} });
  const selectedUsers = reactive({ value: [] });

  const isLoading = ref(true);

  const uiVisibility = reactive( {
    value: {
      userDetails: false,
      createUser: false,
      createExercise: false,
      exerciseLog: false
    }
  });

  const dataTableFiltersSortByOptions = [
    { name: "User Id", value: "_id", default: false },
    { name: "Username", value: "username", default: true },
  ]


  async function loadUsersHandler(userFilters, userList) {
    try {
      isLoading.value = true;
      const apiResponse = await getAllUsers(userFilters);
      userList.value = apiResponse.data
      isLoading.value = false;
      console.log(apiResponse)
      //return apiResponse.data
    }
    catch(error) {
      console.log("error fetch users", error)
    }
  }

  onMounted( async () => {
    userList.value = (await getAllUsers()).data;
    isLoading.value = false;
  })

</script>







<style>

</style>