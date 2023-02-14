<template>
  <h2> {{ title }} </h2>
  <h3>mockup</h3>


  <p>Showing entries {{ ui_qtyVisible }}  of total {{ userList.length }}</p>

  
  <p>{{ totalPages }} Pages</p>
  <div>
    <label for="admin-ui_showentryqty">Show max. entries</label>
    <select id="admin-ui_showentryqty" v-model="ui_showentryqty" @change="updateActivePage">
      <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
    </select>
  </div>
  <nav>

    <div>
      <button :disabled="!ui_previousPossible" @click="ui_activePage--">&lt;</button>
      <button 
        class="btn-pagination"
        type="button"
        v-for="(pg, pgIndex) in visibleBtns"
        @click="ui_activePage=pg"
        :class="(pg == ui_activePage) ? 'activePg' : ''"
        :disabled="pg == '…'"
      >
        {{ pg }}
      </button>
      <button :disabled="!ui_forwardPossible" @click="ui_activePage++">&gt;</button>
    </div>
    <div>

      <div>
        <label>Jump To Page</label>
        <input 
          type="number"
          min="1"
          @keydown.enter="ui_activePage=ui_jumpToPage"
          :max="totalPages"
          v-model="ui_jumpToPage">
          <button @click="ui_activePage=ui_jumpToPage">Jump</button>
      </div>
    </div>

  </nav>

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
      <tr v-for="user in paginatedList" :key="user._id">
        <td><input type="checkbox" v-model="user.selected"></td>
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
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
import PaginationBar from "../PaginationBar/PaginationBar.vue";

import { ref, reactive, onMounted, computed } from "vue";
import {fetchUsers, delUser, selectionHandler, showUserDetailsHandler} from "./UserList.functions";
import ModalWindow from "../ModalWindow/ModalWindow.vue";

  const title = "User List";
  const userList = ref([]);
  const currentUser = reactive({
    value: {}
  })
  const ui_UserDetailsVisible = reactive({
    value: false
  });

  const ui_activePage = ref(1);
  const ui_jumpToPage = ref(1)
  const ui_showentryqty = ref(5);
  const ui_createUserVisible = ref(false);
  const ui_forwardPossible = computed( () => (ui_activePage.value < totalPages.value) ? true : false);
  const ui_previousPossible = computed( () => (ui_activePage.value > 1) ? true : false); 
 
  const ui_qtyVisible = computed( () => {
    const from = (ui_showentryqty.value * (ui_activePage.value-1)) + 1;
    const calcTo = ui_showentryqty.value * ui_activePage.value;
    const to = (calcTo > userList.value.length) ? userList.value.length : calcTo;
    return `${from}–${to}`
  });


  const paginatedList = computed( () => {
    const listStart = ui_showentryqty.value*(ui_activePage.value-1);
    const listEnd = ui_showentryqty.value*ui_activePage.value;
    return userList.value.slice(listStart,listEnd).map(user => {
      user.selected = false;
      return user
    })
  });

  const selectedUsers = computed( () => paginatedList.value.filter(user => user.selected === true) );
  const hasSelectedUsers = computed( () => selectedUsers.value.length > 0 ? true : false)
  const totalPages = computed( () => Math.ceil(userList.value.length / ui_showentryqty.value));
  
  function updateActivePage() {
    if (ui_activePage.value > totalPages.value) {
      ui_activePage.value = totalPages.value
    }
  }
  
  const totalBtns = computed( () => {

    const totalBtns = [];
    for (let i=1; i<=totalPages.value; i++) {
      totalBtns.push(i);
    };
    return totalBtns;
  });



  const visibleBtns = computed( () => {

    /**
     * always show: "<" | "first page" | "last page" | ">" 
     * middle part with 2 pages before and 2 pages after for easier access
     * e.g.: < 1 ... 3 4 `5` 6 7 ... 10 >
     */
    //TODO: Refactor and simplify - looks ugly and hackish
    const visibleBtns = [[], [], []];
    if (totalPages.value < 7) {
      visibleBtns[0] = totalBtns.value.slice(0, (totalPages.value>5) ? 6 : totalPages.value)
      return visibleBtns.flatMap(elem => elem);

    }
    if (ui_activePage.value < 5) {
      visibleBtns[0] = totalBtns.value.slice(0, (totalPages.value>5) ? 6 : totalPages.value)
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
    }
    else if (ui_activePage.value > totalPages.value-4) {
      visibleBtns[0] = totalBtns.value.slice(0, 1);
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(totalPages.value - 6, totalPages.value)

     } else {

      visibleBtns[0] = totalBtns.value.slice(0, 1)
      visibleBtns[1] = totalBtns.value.slice(ui_activePage.value - 3, ui_activePage.value + 2)
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
      visibleBtns[1].push("…");
      visibleBtns[1].unshift("…");
      
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

</style>