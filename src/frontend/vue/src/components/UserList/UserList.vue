<template>
  <h2> {{ title }} </h2>

  <DataTableFilters
    :options="{
      showDateRange: false,
      showLimit: false,
      actionButtonText: 'Load Users',
      sortByOptions: sortedDataTableKeys,
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
        :data-list="dataListStore"
        :data-keys="dataTableKeys"
        :data-key-id="'_id'"
        @update-current-item="(newValue) => updateValue(newValue, currentUser)"
        @update-selected-items="(newValue) => updateValue(newValue, selectedUsers)"
        @click-add-new="uiVisibility.value.createUser = true"
        @click-del-selected="deleteUserHandler(selectedUsers.value, userList.value)"
        @click-table-heading="(dataKeyId) => tableHeadingSortHandler(dataKeyId, dataTableKeys, filtersStore.filters, userList, loadUsersHandler)"

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

      <div class="ui-section-bgwrap"  v-if="messageBoxOptions.value.visible === true">
        <MessageBox
          :options="messageBoxOptions.value"
          >
        </MessageBox>
      </div>

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

import { ref, reactive, onMounted, computed } from "vue";
import { deleteUserHandler } from "./UserList.functions";
import { getAllUsers } from "../../services/apiEndpoints";
import ModalWindow from "../ModalWindow/ModalWindow.vue";
import { uiVisibilityHandler, updateValue, tableHeadingSortHandler, DataTableKey } from "../../services/utils";
import { IconX, IconPlus, IconPencil, IconListDetails } from "@tabler/icons-vue"
import LoadingSpinner from "../Loading-Spinner.vue";

import ActionMenuEntry from "../ActionMenuEntry.vue";
import DataTableFilters from "../DataTableFilters/DataTableFilters.vue";
import MessageBox from "../MessageBox.vue";
import { MessageBoxOptions } from "../MessageBox.functions";
import { useDataTableFiltersStore } from "../../stores/DataTableFilterStore";
import { useDataListStore } from "../../stores/DataListStore";

  const filtersStore = useDataTableFiltersStore();
  const dataListStore = useDataListStore();

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

  const dataTableKeys = ref([
    new DataTableKey("User Id", "_id", false),
    new DataTableKey("Username", "username", true, true)
  ]);

  const sortedDataTableKeys = [...dataTableKeys.value].sort( (a, b) => {

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;

  });

  const sortByCurrent = computed( () => {
    return dataTableKeys.value.find(sortByOption => sortByOption.currentActive === true)?.key || dataTableKeys["value"][0]["key"]
  });

  filtersStore.filters = {
    sortBy: sortByCurrent,
    sortOrder: "1"
  };


  const messageBoxOptions = reactive( { value: ""});

  async function loadUsersHandler(userFilters, store) {
    try {
      messageBoxOptions.value = MessageBoxOptions(null, null, null, false);
      isLoading.value = true;
      const apiResponse = await getAllUsers(userFilters);
      store.data = apiResponse.response.data
      store.pagination = apiResponse.response.pagination
      isLoading.value = false;
      console.log(apiResponse)
      if (store.data.length < 1) {
        messageBoxOptions.value = MessageBoxOptions("No Users Found", "Sorry, there are no users to be displayed", "info");
      }
      //return apiResponse.response
    }
    catch(error) {
      console.log("error fetch users", error)
      messageBoxOptions.value = MessageBoxOptions("Getting UserList failed", "Error fetching users" + apiResponse.msg);
    }
  }

  onMounted( async () => {
    await loadUsersHandler(filtersStore.filters, dataListStore);
  })

</script>







<style>

</style>