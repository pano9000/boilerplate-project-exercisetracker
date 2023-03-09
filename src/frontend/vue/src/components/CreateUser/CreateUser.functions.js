import { handleApiResponse } from "../../services/apiService.js"
import { addUser } from "../../services/apiEndpoints.js";

export async function addUserHandler(event, usernameref) {
  try {
    event.preventDefault();
    event.target.disabled = true;

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);

    //todo: show some loading spinner?

    const apiResponse = await addUser(formData)
    console.log(apiResponse)
    handleApiResponse(apiResponse)
  
    if (!apiResponse.statusOK) {
      throw new Error("Error Server")
      //TODO: add proper handling
    }
    alert("User added")
    usernameref.value = "";
    event.target.disabled = false;

  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
  }

};