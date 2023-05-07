import { defineStore } from "pinia";
import { handleApiResponse } from "../services/apiService";

export const useDataListStore = defineStore("DataList", {

  state: () => ({
    data: [],
    pagination: {},
    filters: {},
    currentItem: {},
    name: {
      list: "",
      item: "",
      items: ""
    },
    isLoading: false
  }),

  actions: {

    async loadData(apiFunc, dataProcessingFunc) {
      
      try {

        this.isLoading = true;
        const paginationParams = new URLSearchParams({page: this.pagination.currentPage})
        const filterParams = new URLSearchParams(this.filters);
        const apiResponse = await apiFunc(paginationParams+'&'+filterParams);
        this.isLoading = false;
        handleApiResponse(apiResponse);
        dataProcessingFunc(this, apiResponse);
        this.pagination = apiResponse.response.pagination;
        return true;
      }
      catch(error) {
        console.log(error)
        return false;
      }
    },

    async deleteData(itemsToDelete, deleteApiEndpoint) {

      try {

        const deleteStatus = await Promise.all(
          
          itemsToDelete.map(async (itemToDelete) => {
            const apiResponse = await deleteApiEndpoint(itemToDelete["_id"]);
            return apiResponse.statusOK;
          }));
          
        if (deleteStatus.includes(true)){
          console.log("deleting success", deleteStatus)
          //reload page here;
        }
      }
      catch(error) {
        console.log(error)
      }


    }



  },

  getters: {

    selectedItems: (state) => {
      if (!Array.isArray(state.data)) return [];
      return state.data.filter(item => item.selected === true);
    },

    allItemsSelected: (state) => (state.selectedItems.length === state.data.length) ? true : false,
    hasSelectedItems: (state) => (state.selectedItems.length > 0) ? true : false
  }

});