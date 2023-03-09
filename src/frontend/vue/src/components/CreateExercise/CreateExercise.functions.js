import { handleApiResponse } from "../../services/apiService.js"
import { addExercise } from "../../services/apiEndpoints.js";

//@TODO: this is an exact copy of addUserHandler -> DRY!
export async function addExerciseHandler(event, userExerciseRef) {
  try {
    event.preventDefault();

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);

    const apiResponse = await addExercise(userExerciseRef.userId, formData)

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