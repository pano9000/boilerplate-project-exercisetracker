import { sendToAPI } from "../../services/apiService.js"

export async function fetchUsers() {
  try {
    const apiResponse = await sendToAPI.get("http://localhost:3002/api/users")
    return apiResponse.data
  }
  catch(error) {
    //TODO: remove for production
    const createDummyData = () => {
      const dummyData = []
      for (let i=0; i<100; i++) {
        dummyData.push( { 
          _id: `user_${i}`,
          username: `username_${i}`
        })
      }
      return dummyData
    }
    return createDummyData()
  }

}

export async function fetchUser(userId) {
  try {
    console.log("userid", userId)
    const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${userId._id}`)
    return apiResponse.data
  }
  catch(error) {
    console.log("error fetchuser")
  }
}


export async function delUser(selectedUsers, userList) {

  const confirmMessage = (!(selectedUsers.length > 1)) ?
    `Are you sure you want to delete the user '${selectedUsers[0].username}'` :
    `Are you sure you want to delete the ${selectedUsers.length} selected users?`;
  //TODO: replace by some fancy "popup"
  if (confirm(confirmMessage)) {

    await Promise.all(selectedUsers.map(async (selectedUser) => {
      const indexToDelete = userList.findIndex( (userEntry) => userEntry.username === selectedUser.username);
      const userIdForDeletion = userList[indexToDelete]["_id"];
      const apiResponse = await sendToAPI.delete(`http://localhost:3002/api/users/${userIdForDeletion}`);
      if (apiResponse.statusOK) {
        userList.splice(indexToDelete, 1);
      }
    }));

  }
}



export function selectionHandler(paginatedList, mode) {

  paginatedList.forEach(user => user.selected = mode)

}

export async function showUserDetailsHandler(user, currentUserProp, ui_UserDetailsVisible) {
  const userData = await fetchUser(user);
  currentUserProp.value = userData
  ui_UserDetailsVisible.value = true;
  console.log("currprop aft", currentUserProp, ui_UserDetailsVisible)
}