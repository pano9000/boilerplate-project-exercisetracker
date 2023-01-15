<template>
  <h2> {{ title }} </h2>

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
      title: "All Users"
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