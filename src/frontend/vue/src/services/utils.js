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
    resetReactiveFormValues(usernameref);
  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
  }
};

function resetReactiveFormValues(reactiveForm) {
  const formElementKeys = Object.keys(reactiveForm);
  formElementKeys.forEach(formElementKey => {
    console.log(reactiveForm[formElementKey], formElementKey)
    reactiveForm[formElementKey]["value"] = "";
  })

}

export async function uiVisibilityHandler(uiVisibility, uiElement) {
  uiVisibility.value[uiElement] = true;
};

export function updateValue(newValue, itemToUpdate) {
  itemToUpdate.value = newValue.value
};


export function ReactiveFormItem(value = "", required = true, available = null) {
  return {
    value,
    valid: (value !== "") ? true : null,
    required,
    available
  }
}

export async function availabilityHandler(reactiveForm, reactiveFormItem, availabilityApiEndpoint) {
  const currentFormItem = reactiveForm[reactiveFormItem]

  if (currentFormItem.value == "" || currentFormItem.valid !== true) {
    return
  };

  const availabilityResult = await availabilityApiEndpoint(currentFormItem.value);
  currentFormItem.available = availabilityResult.data.available;
}


export function tableHeadingSortHandler(dataKeyId, dataTableItems) {
  console.log("clicked dataKeyId", dataKeyId)
  
  for (const dataTableItem in dataTableItems) {
    dataTableItems[dataTableItem]["currentActive"] = (dataTableItems[dataTableItem]["key"] === dataKeyId) ? true : false;
  }
}


/**
 * 
 * @param {String} name 
 * @param {String} key 
 * @param { Boolean } defaultSortBy 
 */
export function DataTableKey(name, key, defaultSortBy = false, currentActive = false) {
  return {
    name, key, defaultSortBy, currentActive
  }
}