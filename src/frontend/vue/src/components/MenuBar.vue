<template>

  <nav >
    <a v-for="button in buttons" :key="button.title" @click=""> {{ button.title }}</a>
  </nav>

</template>


<script setup>

  const buttons = {
    userList: {
      title: "User List"
    },
    exerciseList: {
      title: "Exercise List"
    }
  }

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