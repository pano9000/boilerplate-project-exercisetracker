<template>
  <h1>Welcome to the Exercise Tracker</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati maiores architecto accusantium quod ex quam at,
    excepturi ut quia fugiat iste soluta sed doloribus. Modi, magni dicta. Magni, facere enim.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, labore vel fugiat laudantium enim perspiciatis id asperiores 
    hic suscipit ut necessitatibus dolor itaque quia aspernatur facilis, nostrum numquam ex commodi fuga voluptate. Delectus, dolorum 
    quam nemo veniam excepturi voluptatibus pariatur quibusdam asperiores cum inventore quo blanditiis minus, ducimus velit provident!
  </p>


  <section>
    <h2>Quick Overview</h2>
    
    <DashboardInfoCards>

      <DashboardInfoCard>
        <template #cardHeading>
          <span>450</span>
          <IconUser></IconUser>
        </template>
        <template #cardDescription>
          Number of Users
        </template>
      </DashboardInfoCard>

      <DashboardInfoCard>
        <template #cardHeading>
          <span>450</span>
          <IconBarbell></IconBarbell>
          </template>
        <template #cardDescription>
          Number of Exercises
        </template>
      </DashboardInfoCard>

    </DashboardInfoCards>

  </section>
</template>

<script setup>
  import DashboardInfoCards from "../components/DashboardInfoCards.vue";
  import DashboardInfoCard from "../components/DashboardInfoCard.vue";
  import { IconUser, IconBarbell } from '@tabler/icons-vue';


</script>

<style>

</style>