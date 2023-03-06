<template>
  <nav class="nav-btn_wrap">
    <a v-for="menuItem in menuItems" :key="menuItem.id" class="btn-nav" :class="(menuItem.visible) ? 'btn-nav-active' : ''" href="#" @click="toggleVisibleSection(menuItem.id, menuItems)"> {{ menuItem.title }} </a>
  </nav>
</template>


<script setup>

const props = defineProps({
  menuItems: {}
})

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