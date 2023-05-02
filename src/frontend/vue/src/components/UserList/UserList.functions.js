import { deleteUserById } from "../../services/apiEndpoints.js";

export async function deleteUserHandler(selectedUsers, store, loadDataHandler) {

  const confirmMessage = (!(selectedUsers.length > 1)) ?
    `Are you sure you want to delete the user '${selectedUsers[0].username}'` :
    `Are you sure you want to delete the ${selectedUsers.length} selected users?`;
  //TODO: replace by some fancy "popup"
  if (confirm(confirmMessage)) {

    const deleteStatus = await Promise.all(
      selectedUsers.map(async (selectedUser) => {
        const indexToDelete = store.data.findIndex( (userEntry) => userEntry.username === selectedUser.username);
        const userIdForDeletion = store.data[indexToDelete]["_id"];
        const apiResponse = await deleteUserById(userIdForDeletion);
        return apiResponse.statusOK;
    }));

    if (deleteStatus.includes(true)){
      await loadDataHandler(store);
    }

  }
}

