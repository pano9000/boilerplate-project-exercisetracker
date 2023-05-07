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