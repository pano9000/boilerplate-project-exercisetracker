<template>

  <h2> {{ title }}</h2>
  <DataTablePage
    :options="{
      listName: `Users`,
      dataTableKeys: dataTableKeys,
      dataStore: dataListStore,
      tableFilters: {
        showDateRange: false
      },
      paginationBar: {
        showTop: true
      },
      listActionButtons: {
        showTop: true,
        textAddNew: `Add New User`,
        showSelect: true,
        showDelete: true,
      },
      apiFunc: {
        load: getAllUsers,
        delete: deleteUserById
      },
      dataProcessing: dataProcessing
    }"

  >

    <template v-slot:actionMenuEntries>
      <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'userDetails')">
        <IconPencil></IconPencil> Edit User
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="deleteUserHandler([currentUser.value], dataListStore, loadUsersHandler)">
        <IconX></IconX> Delete User
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'createExercise')">
        <IconPlus></IconPlus> Add Exercise
      </ActionMenuEntry>

      <ActionMenuEntry @action-menu-event="uiVisibilityHandler(uiVisibility, 'exerciseLog')">
        <IconListDetails></IconListDetails> Show Exercise Log
      </ActionMenuEntry>
    </template>


    <template v-slot:listActionButtons>
      <ListActionButtonEntry @list-action-button-event="uiVisibilityHandler(uiVisibility, 'createUser')">
        <IconUserPlus></IconUserPlus>
        Add New User
      </ListActionButtonEntry>

    </template>

  </DataTablePage>


  <div v-if="uiVisibility.value.createUser">
    <ModalWindow @close-modal="uiVisibility.value.createUser = false">
      <CreateUser></CreateUser>
    </ModalWindow>
  </div>

  <div v-if="uiVisibility.value.userDetails">
    <ModalWindow @close-modal="uiVisibility.value.userDetails = false">
      <UserDetails
        :current-user="dataListStore.currentItem"
      ></UserDetails>
    </ModalWindow>
  </div>

  <div v-if="uiVisibility.value.createExercise">
    <ModalWindow @close-modal="uiVisibility.value.createExercise = false">
      <CreateExercise
        :current-user="dataListStore.currentItem"
      ></CreateExercise>
    </ModalWindow>
  </div>


  </template>


  <script setup>
    import { ref, reactive } from 'vue';
    import DataTablePage from '../components/DataTablePage.vue';
    import { DataTableKey, uiVisibilityHandler } from "../services/utils";
    import { useDataListStore } from "../stores/DataListStore";
    import ActionMenuEntry from "../components/ActionMenuEntry.vue";
    import ListActionButtonEntry from '../components/ListActionButtonEntry.vue';
    import { IconX, IconPlus, IconPencil, IconListDetails, IconUserPlus } from "@tabler/icons-vue"
    import ModalWindow from '../components/ModalWindow/ModalWindow.vue';
    import { getAllUsers, deleteUserById } from '../services/apiEndpoints';

    import CreateUser from "../components/Forms/CreateUser/CreateUser.vue";
    import UserDetails from "../components/Forms/UserDetails/UserDetails.vue";
    import CreateExercise from "../components/Forms/CreateExercise/CreateExercise.vue";


    const dataListStore = useDataListStore();
    
    const title = "User List";
  
    const dataTableKeys = ref([
    new DataTableKey("User Id", "_id", false),
    new DataTableKey("Username", "username", true, true)
  ]);
  
  dataListStore.filters = {
    limit: 10,
    sortBy: dataTableKeys.value.find(sortByOption => sortByOption.defaultSortBy === true)?.key || dataTableKeys["value"][0]["key"],
    sortOrder: "1",
  };

  const uiVisibility = reactive( {
    value: {
      userDetails: false,
      createUser: false,
      createExercise: false,
      exerciseLog: false
    }
  });

  function dataProcessing(store, apiResponse) {
    store.data = apiResponse.response.data
  }
  
  
  
  </script>