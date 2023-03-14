import { sendToAPI } from "../../services/apiService.js"

import { deleteUserById } from "../../services/apiEndpoints.js";

export async function deleteUserHandler(selectedUsers, userList) {

  const confirmMessage = (!(selectedUsers.length > 1)) ?
    `Are you sure you want to delete the user '${selectedUsers[0].username}'` :
    `Are you sure you want to delete the ${selectedUsers.length} selected users?`;
  //TODO: replace by some fancy "popup"
  if (confirm(confirmMessage)) {

    await Promise.all(selectedUsers.map(async (selectedUser) => {
      const indexToDelete = userList.findIndex( (userEntry) => userEntry.username === selectedUser.username);
      const userIdForDeletion = userList[indexToDelete]["_id"];
      const apiResponse = await deleteUserById(userIdForDeletion);
      if (apiResponse.statusOK) {
        userList.splice(indexToDelete, 1);
      }
    }));

  }
}

export async function uiVisibilityHandler(uiVisibility, uiElement) {
  uiVisibility.value[uiElement] = true;
}