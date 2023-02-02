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

export async function delUser(usernames, userList) {

  const confirmMessage = (!(usernames.length > 1)) ?
    `Are you sure you want to delete the user '${usernames[0]}'` :
    `Are you sure you want to delete the ${usernames.length} selected users?`;

  //TODO: replace by some fancy "popup"
  if (confirm(confirmMessage)) {

    await Promise.all(usernames.map(async (username) => {
      const indexToDelete = userList.findIndex( (userEntry) => userEntry.username === username);
      const userIdForDeletion = userList[indexToDelete]["_id"];
      const apiResponse = await sendToAPI.delete(`http://localhost:3002/api/users/${userIdForDeletion}`);
      if (apiResponse.statusOK) {
        userList.splice(indexToDelete, 1);
      }
    }));

  }
}