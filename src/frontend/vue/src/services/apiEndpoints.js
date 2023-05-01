import { sendToAPI } from "./apiService";

const baseUrl = "http://localhost:3002/api/v2"

export async function getAllUsers(params) {
  return await sendToAPI.get(`${baseUrl}/users?${params}`)
}

export async function getUserById(userId) {
  return await sendToAPI.get(`${baseUrl}/users/${userId}`)
}

export async function getAllExercises(params) {
  return await sendToAPI.get(`${baseUrl}/users/exercises?${params}`)
}

export async function getExercisesByUserId(userId, params) {
  return await sendToAPI.get(`${baseUrl}/users/${userId}/exercises?limit=${params?.limit}&from=${params?.dateFrom}&to=${params?.dateTo}&sortBy=${params?.sortBy}&sort=${params?.sortOrder}`)
}

export async function getExerciseById(userId, exerciseId) {
  return await sendToAPI.get(`${baseUrl}/users/${userId}/exercises/${exerciseId}`)
}

export async function deleteUserById(userId) {
  return await sendToAPI.delete(`${baseUrl}/users/${userId}`)
}

export async function deleteExerciseById(userId, exerciseId) {
  return await sendToAPI.delete(`${baseUrl}/users/${userId}/exercises/${exerciseId}`)
}

export async function checkUsernameAvailability(username) {
  return await sendToAPI.head(`${baseUrl}/users/available?username=${username}`)
}

export async function addUser(formData) {
  return await sendToAPI.post(`${baseUrl}/users/`, formData)
}

export async function addExercise(formData) {
  return await sendToAPI.post(`${baseUrl}/users/${formData.get("userId")}/exercises`, formData)
}

export async function updateUserById(formData) {
  return await sendToAPI.put(`${baseUrl}/users/${formData.get("userId")}`)
}

export async function updateExerciseById(formData) {
  return await sendToAPI.put(`${baseUrl}/users/${formData.get("userId")}/exercises/${formData.get("exerciseId")}`, formData)
}