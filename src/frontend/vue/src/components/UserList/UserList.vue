<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>
  <label for="admin-ui_showentryqty">Show max. entries</label>
  <select id="admin-ui_showentryqty" v-model="ui_showentryqty">
    <option v-for="value in [5, 10, 25, 50]" :key="value"> {{value}}</option>
  </select>

  <p>Showing {{ ui_showentryqty }} entries of total {{ userList.length }}</p>
  {{ totalBtns }}
  <p>{{ totalPages }} Pages</p>
  {{ visibleBtns }}
  {{ activePage }}
  <nav>

    <div>
      <button :disabled="!ui_previousPossible" @click="activePage--">&lt; Previous</button>
      <!--<button v-for="(pg, pgIndex) in [...visibleBtns]">{{pg}}</button>-->
      <button v-for="(pg, pgIndex) in visibleBtns[0]" @click="activePage=pg" :class="(pg == activePage) ? 'activePg' : ''">{{ pg }}</button>
      <button v-for="(pg, pgIndex) in visibleBtns[1]" @click="activePage=pg" :class="(pg == activePage) ? 'activePg' : ''">{{ pg }}</button>
      <button v-for="(pg, pgIndex) in visibleBtns[2]" @click="activePage=pg" :class="(pg == activePage) ? 'activePg' : ''">{{ pg }}</button>
      <button :disabled="!ui_forwardPossible" @click="activePage++">Next &gt;</button>
      <div>
        <label>Jump To Page</label>
        <input 
          type="number"
          min="1"
          :max="totalPages"
          v-model="ui_jumpToPage">
          <button @click="activePage=ui_jumpToPage">Jump</button>
      </div>
    </div>

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
          <button @click="showUserDetailsHandler(user, currentUser, ui_UserDetailsVisible)">✏️</button>
          <button @click="delUser([user], userList)">❌</button>
        </td>
      </tr>

      
    </tbody>
  </table>

  <!-- turn into component and add on top of list as well-->
  <div>
    <button type="button" @click="ui_createUserVisible = true">➕ Add New</button>
    <button type="button" @click="( (!hasSelectedUsers) ? selectionHandler(paginatedList, true) : selectionHandler(paginatedList, false))">{{ (!hasSelectedUsers) ? "Select All" : "Clear Selection"}}</button>
    <button type="button" :disabled="!hasSelectedUsers" :class="hasSelectedUsers ? 'active' : 'inactive'" @click="delUser(selectedUsers, userList)">❌ Delete Selected</button>
  </div>

  <div v-show="ui_createUserVisible">
    <ModalWindow @close-modal="ui_createUserVisible=false">
      <CreateUser></CreateUser>
    </ModalWindow>
  </div>

  <div v-show="ui_UserDetailsVisible.value === true">
    <ModalWindow @close-modal="ui_UserDetailsVisible.value=false">
      <UserDetails
        :currentUser="currentUser.value"
      ></UserDetails>
    </ModalWindow>

  </div>
</template>


<script setup>
import CreateUser from "../CreateUser/CreateUser.vue";
import UserDetails from "../UserDetails/UserDetails.vue";

import { ref, reactive, onMounted, computed } from "vue";
import {fetchUsers, delUser, selectionHandler, showUserDetailsHandler} from "./UserList.functions";
import ModalWindow from "../ModalWindow/ModalWindow.vue";

  const title = "User List";
  const userList = ref([]);
  const currentUser =reactive({
    value: {}
  })
  const ui_UserDetailsVisible = reactive({
    value: false
  });

  const ui_jumpToPage = ref(1)
  const ui_showentryqty = ref(5);
  const ui_createUserVisible = ref(false);
  const ui_forwardPossible = computed( () => (activePage.value < totalPages.value) ? true : false);
  const ui_previousPossible = computed( () => (activePage.value > 1) ? true : false); 

  const paginatedList = computed( () => {
    const listStart = ui_showentryqty.value*(activePage.value-1);
    const listEnd = ui_showentryqty.value*activePage.value;
    return userList.value.slice(listStart,listEnd).map(user => {
      user.selected = false;
      return user
    })
  });

  const selectedUsers = computed( () => paginatedList.value.filter(user => user.selected === true) );
  const hasSelectedUsers = computed( () => selectedUsers.value.length > 0 ? true : false)
  const totalPages = computed( () => Math.ceil(userList.value.length / ui_showentryqty.value));
  
  const totalBtns = computed( () => {

    const totalBtns = [];
    for (let i=1; i<=totalPages.value; i++) {
      totalBtns.push(i);
    };
    return totalBtns;
  });

  const activePage = ref(1);
  /*
  const visibleBtns = computed( () => {

    const visibleBtns = [[], []];
    for (let i=activePage.value; i<=totalPages.value; i++) {
      if (i<=3) visibleBtns[0].push(i);
      if (i >= totalPages.value - 1) visibleBtns[1].push(i);
    };
    return visibleBtns;

  })
  */
  const visibleBtns = computed( () => {

    //TODO: Refactor and simplify
    const visibleBtns = [[], [], []];
    if (activePage.value < 5) {
      visibleBtns[0] = totalBtns.value.slice(0, 6)
      visibleBtns[1] = []
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
      return visibleBtns.flatMap(elem => elem);
    }
    if (activePage.value > totalPages.value-4) {
      visibleBtns[0] = totalBtns.value.slice(0, 1);
      //visibleBtns[1] = totalBtns.value.slice(activePage.value - 3, activePage.value + 2)
      visibleBtns[1] = []

      visibleBtns[2] = totalBtns.value.slice(totalPages.value - 6, totalPages.value)

      return visibleBtns.flatMap(elem => elem);
    } else {

      visibleBtns[0] = totalBtns.value.slice(0, 1)
      visibleBtns[1] = totalBtns.value.slice(activePage.value - 3, activePage.value + 2)
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
    }

    return visibleBtns.flatMap(elem => elem);

})

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

.activePg {
  font-weight: 700;
}

.btn-pagination {
  min-width: 4.25rem;
}

</style>