export function formValidityCheck(event, refToUpdate) {
  refToUpdate.value = event.target.form.checkValidity();
}



export async function submitFormHandler(event, usernameref, apiFunction, apiResponseHandler) {
  try {
    event.preventDefault();
    event.target.disabled = true;

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);

    //todo: show some loading spinner?

    const apiResponse = await apiFunction(formData)
    console.log(apiResponse)
    apiResponseHandler(apiResponse)
  
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