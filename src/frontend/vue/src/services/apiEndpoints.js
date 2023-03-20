import { sendToAPI } from "./apiService";

const baseUrl = "http://localhost:3002"

export async function getAllUsers() {
  return await sendToAPI.get(`${baseUrl}/api/users`) //@TODO: add support for future pagination
}

export async function getUserById(userId) {
  return await sendToAPI.get(`${baseUrl}/api/users/${userId}`)
}

export async function getAllExercises(params) {
  return await sendToAPI.get(`${baseUrl}/api/users/logs?limit=${params.limit}&from=${params.dateFrom}&to=${params.dateTo}`)
}

export async function getExercisesByUserId(userId, params) {
  return await sendToAPI.get(`${baseUrl}/api/users/${userId}/logs?limit=${params.limit}&from=${params.dateFrom}&to=${params.dateTo}`)
}

export async function deleteUserById(userId) {
  return await sendToAPI.delete(`${baseUrl}/api/users/${userId}`)
}

export async function deleteExerciseById(formData) {
  return await sendToAPI.delete(`${baseUrl}/api/users/${formData.get("userId")}/exercises/${formData.get("exerciseId")}`)
}

export async function addUser(formData) {
  return await sendToAPI.post(`${baseUrl}/api/users/`, formData)
}

export async function addExercise(formData) {
  return await sendToAPI.post(`${baseUrl}/api/users/${formData.get("userId")}/exercises`, formData)
}

export async function updateUserById(formData) {
  return await sendToAPI.put(`${baseUrl}/api/users/${formData.get("userId")}`)
}

export async function updateExerciseById(formData) {
  return await sendToAPI.put(`${baseUrl}/api/users/${formData.get("userId")}/exercises/${formData.get("exerciseId")}`, formData)
}