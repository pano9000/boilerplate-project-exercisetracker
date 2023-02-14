import { sendToAPI, handleApiResponse } from "../../services/apiService.js"

export async function addExercise(event, userExerciseRef) {
  try {
    event.preventDefault();

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);
    console.log("userexercref", userExerciseRef)
    const apiResponse = await sendToAPI.post(`http://localhost:3002/api/users/${userExerciseRef.userId}/exercises`, formData)
    console.log(apiResponse)
    handleApiResponse(apiResponse)
  
    if (!apiResponse.statusOK) {
      throw new Error("Error Server")
      //TODO: add proper handling
    }
    alert("Exercise added")
    //userExerciseRef.value = "";
  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
  }

};