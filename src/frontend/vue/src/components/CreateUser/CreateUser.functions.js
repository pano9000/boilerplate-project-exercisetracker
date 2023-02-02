import { sendToAPI } from "../../services/apiService.js"

export async function addUser(event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target.form)
    const apiResponse = await sendToAPI.post('http://localhost:3002/api/users/', formData)
    console.log(apiResponse)
    handleApiResponse(apiResponse)
  }
  catch(error) {
    console.log(error)
    alert("something went wrong")
  }

};

function handleApiResponse(apiResponse) {
  if (apiResponse === undefined || apiResponse.statusOK === undefined) {
    throw new Error("Received an undefined response from the server")
  }

  if (apiResponse.statusOK === true) {
    console.log("all good")
    return
  }

  if (apiResponse.statusOK === false) {
    console.log("Something went wrong on the server")
    return;
  }
}