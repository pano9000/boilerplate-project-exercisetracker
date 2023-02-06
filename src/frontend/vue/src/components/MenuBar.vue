<template>
  <nav class="nav-btn_wrap">
    <a v-for="menuItem in menuItems" :key="menuItem.title" class="btn-nav" href="#" @click=""> {{ menuItem.title }} </a>
  </nav>
</template>


<script setup>

const props = defineProps({
  menuItems: {}
})

</script>

<style>
  nav {
    display: flex;
    align-items: stretch  ;
    justify-content: center;
    padding: 1rem;
    background-color: yellowgreen;
    gap: 1rem;
  }

  button {
    box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
    margin-right: .5rem;
  }
</style>