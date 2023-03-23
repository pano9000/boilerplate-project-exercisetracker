<template>
 <!-- todo: add skip link to main content-->
  <nav 
    class="ui-mainmenu_nav"
    aria-label="Primary Navigation"
  >
    <a 
      class="ui-mainmenu_brand-icon"
      href="#"
      aria-label="Go to homepage"
    >
      <div>
        <IconBarbell></IconBarbell>
        <span>Exercise Tracker</span>
      </div>
    </a>

    <ul>
      <li
        v-for="menuItem in menuItems"
        :key="menuItem.id"
      >
        <a
          href="#"
          class="ui-mainmenu_nav-btn"
          :class="(menuItem.visible) ? 'ui-mainmenu_nav-btn-active' : ''"
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
  /*
  nav {
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 1rem 1rem;
  }
  */
  
  .ui-mainmenu_nav {
    border-radius: .5rem;
    box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.2) inset;
    background-color: bisque;
    gap: 0rem;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1rem;
  }

  .ui-mainmenu_nav ul {
    list-style: none;
    padding: 0rem;
    margin: 0rem;
    display: flex;
  }

  .ui-mainmenu_nav-btn,
  .ui-mainmenu_brand-icon {
    padding: 1rem;
    background-color: lightgray;
    transition: background-color 0.3s;
    display: block;
  }

  

  .ui-mainmenu_nav ul li:first-of-type a {
    border-radius: 5px 0 0 5px;
  }

  .ui-mainmenu_nav ul li:last-of-type a {
    border-radius: 0 5px 5px 0;
  }

  .ui-mainmenu_nav ul,
  .ui-mainmenu_login-icon, 
  .ui-mainmenu_brand-icon {
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
  }

  .ui-mainmenu_nav-btn-active {
    background-color: burlywood;
  }

  .ui-mainmenu_login-icon {
    margin-left: auto;
    padding: 1rem;
    background-color: #f9f9f9;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  .ui-mainmenu_brand-icon div {
    display: flex;
    gap: .5rem;
  }

</style>