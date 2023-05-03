import { handleApiResponse } from "./apiService"
import { MessageBoxOptions } from "../components/MessageBox.functions";


export default async function loadDataHandler(listName, store, messageBox, apiFunc, dataProcessingFunc) {
  
  try {

    messageBox.value = MessageBoxOptions(null, null, null, false);
    store.isLoading = true;
    const paginationParams = new URLSearchParams({page: store.pagination.currentPage, limit: store.filters.limit}) //todo: limit - find a place for it
    const filterParams = new URLSearchParams(store.filters);
    const apiResponse = await apiFunc(paginationParams+'&'+filterParams)
    store.isLoading = false;
    handleApiResponse(apiResponse);
    dataProcessingFunc(store, apiResponse);
    store.pagination = apiResponse.response.pagination;
    if (store.data.length < 1) {
      messageBox.value = MessageBoxOptions(`No ${listName} Found`, `There were no ${listName} found with your current filters`, "info");
      return
    }
  }

  catch (error) {
    console.log("error in loadDataHandler", error)
    messageBox.value = MessageBoxOptions(`Loading ${listName} failed", "Error fetching ${listName}: ${error}`);
  }

}