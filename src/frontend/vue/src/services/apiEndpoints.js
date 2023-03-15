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

export async function getAllExercises(params) {
  const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/logs?limit=${params.limit}&from=${params.dateFrom}&to=${params.dateTo}`)
  return apiResponse
}

export async function getExercisesByUserId(userId, params) {
  const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${userId}/logs?limit=${params.limit}&from=${params.dateFrom}&to=${params.dateTo}`)
  return apiResponse
}

export async function deleteUserById(userId) {
  const apiResponse = await sendToAPI.delete(`http://localhost:3002/api/users/${userId}`)
  return apiResponse
}

export async function addUser(formData) {
  const apiResponse = await sendToAPI.post(`http://localhost:3002/api/users/`, formData)
  return apiResponse
}

export async function addExercise(formData) {
  const apiResponse = await sendToAPI.post(`http://localhost:3002/api/users/${formData.get("userId")}/exercises`, formData)
  return apiResponse
}