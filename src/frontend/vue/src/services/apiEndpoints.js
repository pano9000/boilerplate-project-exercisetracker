import { sendToAPI } from "./apiService";

export async function getAllUsers() {
  try {
    const apiResponse = await sendToAPI.get("http://localhost:3002/api/users") //@TODO: add support for future pagination
    return apiResponse.data
  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`) //@TODO: some better error handling, instead of an alert
  }

}

export async function getUserById(userId) {
    const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${userId}`)
    return apiResponse.data
}