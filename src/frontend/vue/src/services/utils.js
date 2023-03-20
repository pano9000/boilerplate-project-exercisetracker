import { handleApiResponse } from "./apiService";

export function formValidityCheck(event, refToUpdate) {
  refToUpdate.value = event.target.form.checkValidity();
}



export async function submitFormHandler(event, usernameref, apiFunction, apiResponseHandler = handleApiResponse) {
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
    alert("Success") //TODO: handle better
    usernameref.value = "";
    //event.target.disabled = false;

  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
  }
};

export async function uiVisibilityHandler(uiVisibility, uiElement) {
  uiVisibility.value[uiElement] = true;
};

export function updateValue(newValue, itemToUpdate) {
  itemToUpdate.value = newValue.value
};