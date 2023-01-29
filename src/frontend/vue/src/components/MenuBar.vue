<template>

  <nav >
    <a v-for="button in buttons" :key="button.title" @click=""> {{ button.title }}</a>
  </nav>

</template>


<script>



export default {
  setup() {

  const buttons = {
    userList: {
      title: "User List"
    },
    exerciseList: {
      title: "Exercise List"
    }
}


    return {
      buttons
    }

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
</style>