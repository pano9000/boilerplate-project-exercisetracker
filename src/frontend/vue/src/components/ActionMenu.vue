<template>
  <menu ref="actionMenu" class="actionMenu_menu" v-show="actionMenuVisible.value === true">
    <slot></slot>
  </menu>
</template>


<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  const actionMenu = ref(null);


  const emit = defineEmits(["updateActionMenuRef"])
  const props = defineProps(["actionMenuVisible"])


  function actionMenuDisableVisibility(actionMenuVisible) {
    if (actionMenuVisible.value !== false) {
      actionMenuVisible.value = false
    }
  }

  function actionMenuHandleEscKey(event) {
    if (event.key === "Escape") {
      actionMenuDisableVisibility(actionMenuVisible)
    }
  }

  function actionMenuHandleEmptyClick(event) {
    if (!event.target.classList.contains("actionMenu_btn")) {
      actionMenuDisableVisibility(actionMenuVisible)
    }
  }

  const windowEventListeners = {
    escapeKey: ["keydown", actionMenuHandleEscKey],
    emptyClick: ["click", actionMenuHandleEmptyClick]
  };

  onMounted( () => {
    for (const eventListener in windowEventListeners) {
      window.addEventListener(...windowEventListeners[eventListener])
    }
    emit("updateActionMenuRef", actionMenu);
  });

  onBeforeUnmount( () => {
    for (const eventListener in windowEventListeners) {
      window.removeEventListener(...windowEventListeners[eventListener])
    }
  });


</script>


<style>

</style>