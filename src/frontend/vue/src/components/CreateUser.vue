<template>
  <h2> {{ title }} </h2>
  <div id="">
    <input type="text" placeholder="Username">
    <button @click="submitUser">Add new user</button>

  </div>

</template>


<script>

export default {
  data() {
    return {
      title: "Create New User"
    }
  },
  methods: {


  }
}

function submitUser {

  

}


</script>

<style>

</style>