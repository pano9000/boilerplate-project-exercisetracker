import { sendToAPI } from "../../services/apiService.js"

export async function addUser(event, usernameref) {
  try {
    event.preventDefault();

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);

    const apiResponse = await sendToAPI.post('http://localhost:3002/api/users/', formData)
    console.log(apiResponse)
    handleApiResponse(apiResponse)
  
    if (!apiResponse.statusOK) {
      throw new Error("Error Server")
      //TODO: add proper handling
    }
    alert("User added")
    usernameref.value = "";
  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
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


export function formValidityCheck(event, refToUpdate) {
  refToUpdate.value = event.target.form.checkValidity();
}