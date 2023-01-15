<template>

  <nav >
    <a v-for="button in buttons" :key="button.title" @click=""> {{ button.title }}</a>
  </nav>

</template>


<script>

const buttons = {
  create: {
    title: "Create"
  },
  read: {
    title: "Read"
  },
  update: {
    title: "Update"
  },
  delete: {
    title: "Delete"
  }
}

export default {
  data() {
    return {
      buttons
    }
  },
  methods: {


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