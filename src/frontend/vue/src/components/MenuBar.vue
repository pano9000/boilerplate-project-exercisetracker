<template>

  <nav 
    class="ui-mainmenu_nav nav-btn_wrap"
    aria-label="Primary Navigation"
  >
    <ul>
      <li
        v-for="menuItem in menuItems"
        :key="menuItem.id"
      >
        <a
          href="#"
          class="btn-nav"
          :class="(menuItem.visible) ? 'btn-nav-active' : ''"
          :aria-current="menuItem.visible"
          @click="toggleVisibleSection(menuItem.id, menuItems)"
        > 
          {{ menuItem.title }}
        </a>
      </li>
    </ul>

    <button
      v-if="props.options?.showLogin === true"
      class="ui-mainmenu_login-icon"
      title="Logout"
      aria-label="Log out"
    >
      <IconUserCircle></IconUserCircle>
    </button>

  </nav>

</template>


<script setup>
  import { IconUserCircle, IconBarbell } from "@tabler/icons-vue"

  const props = defineProps(["menuItems", "options"])

function toggleVisibleSection(clickedMenuItemId, menuItems) {

  for (const menuItem in menuItems) {
    menuItems[menuItem].visible = (menuItems[menuItem].id === clickedMenuItemId) ? true : false;
  }

}

</script>

<style>
 button {
    box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
    margin-right: .5rem;
  }

  nav {
    display: flex;
    align-items: stretch  ;
    justify-content: center;
    padding: 1rem 1rem;
  }
  
  .nav-btn_wrap {
    border-radius: .5rem;
    box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.2) inset;
    display: inline-flex;
    background-color: bisque;
    gap: 0rem;
  }

  .btn-nav {
    display: block;
    background-color: lightgray;
    padding: 2rem;
    transition: background-color 0.3s;

  }

  .btn-nav-active {
    background-color: burlywood;

  }


  .nav-btn_wrap .btn-nav:first-of-type {
    border-radius: 5px 0 0 5px;

  }

  .nav-btn_wrap .btn-nav:last-of-type {
    border-radius: 0 5px 5px 0;
  }



</style>