import { nextTick } from "vue";

export async function actionButtonHandler(event, actionMenuVisible, actionMenuRef) {
  actionMenuVisible.value = true;
  await nextTick();
  const actionButtonElem = event.target;

  const actionButtonRect = actionButtonElem.getBoundingClientRect();
  actionButtonElem.after(actionMenuRef.value);

  actionMenuRef.value.style.right = `${actionButtonRect.width}px`;
  actionMenuRef.value.firstElementChild.focus();
};