import { sendToAPI } from "./apiService";


export async function getUserById(userId) {
    const apiResponse = await sendToAPI.get(`http://localhost:3002/api/users/${userId}`)
    return apiResponse.data
}