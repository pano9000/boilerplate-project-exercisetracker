export async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3002/api/users");
    if (!response.ok) {
      throw new Error("fetching failed")
    }
    return await response.json()
  }
  catch(error) {
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

  if (confirm(confirmMessage)) {
    // api call -> delete user
    // TODO
    console.log("wawat")
    usernames.forEach(username => {
      const indexToDelete = userList.findIndex( (userEntry) => userEntry.username === username);
      userList.splice(indexToDelete, 1);
      apiDeleteUser(userList[indexToDelete]["_id"])
    })
  }
}

async function apiDeleteUser(userId, userList) {
  try {
    const response = await fetch(`http://localhost:3002/api/users/${userId}`, {
      method: "delete"
    });
    if (!response.ok) {
      throw new Error("deleting failed")
    }
    return true
  }
  catch(error) {
    return false
  }
}