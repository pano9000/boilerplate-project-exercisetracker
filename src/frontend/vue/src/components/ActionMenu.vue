<template>
  <menu ref="actionMenu" class="actionMenu_menu" v-show="actionMenuVisible.value === true">
    <slot name="actionMenuEntries"></slot>
  </menu>
</template>


<script setup>


 /**
   * 
   * @param {Object} currentItem - reactive object to store the currently selected/active data to
   * @param {Object} data - data object from the data list of the current row
   * @param {Object} actionMenuVisible - reactive object to toggle which action menu is currently visible
   * @param {String} dataKeyId the data lists key Id prop name
   */
   async function actionButtonHandler(event, actionMenuVisible, currentItem, currentData) {
    currentItem.value = currentData;
    actionMenuVisible.value = true;
    await nextTick();
    const actionButtonRect = event.target.getBoundingClientRect();
    const actionMenuRect = actionMenu.value.getBoundingClientRect();

    const x = (actionButtonRect.left - actionMenuRect.width + window.scrollX).toFixed();
    const y = (actionButtonRect.top + window.scrollY).toFixed();

    // Set the position for menu
    actionMenu.value.style.left = `${x}px`;
    actionMenu.value.style.top = `${y}px`;

    actionMenu.value.firstElementChild.focus();

  }


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
  });

  onBeforeUnmount( () => {
    for (const eventListener in windowEventListeners) {
      window.removeEventListener(...windowEventListeners[eventListener])
    }
  });


</script>


<style>

</style>