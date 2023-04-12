import { nextTick } from "vue";

export async function actionButtonHandler(event, actionMenuVisible, actionMenuRef) {
  actionMenuVisible.value = true;
  await nextTick();
  const actionButtonRect = event.target.getBoundingClientRect();
  const actionMenuRect = actionMenuRef.value.getBoundingClientRect();
  const x = (actionButtonRect.left - actionMenuRect.width + window.scrollX).toFixed();
  const y = (actionButtonRect.top + window.scrollY).toFixed();

  // Set the position for menu
  actionMenuRef.value.style.left = `${x}px`;
  actionMenuRef.value.style.top = `${y}px`;

  actionMenuRef.value.firstElementChild.focus();
};