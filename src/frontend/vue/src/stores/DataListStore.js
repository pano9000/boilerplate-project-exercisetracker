import { defineStore } from "pinia";
import { handleApiResponse } from "../services/apiService";
import { getActiveFilters } from "../services/utils";

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
        const activeFilters = getActiveFilters(this.filters);
        const filterParams = new URLSearchParams(activeFilters);
        const apiResponse = await apiFunc(paginationParams+'&'+filterParams);
        this.isLoading = false;
        handleApiResponse(apiResponse);
        dataProcessingFunc(this, apiResponse);
        this.pagination = apiResponse.response.pagination;
        return [true, undefined];
      }
      catch(error) {
        console.log(error)
        return [false, error];
      }
    },

    async deleteData(itemsToDelete, itemKey, deleteApiEndpoint, deleteApiEndpointArgs) {

      const confirmMessage = ( itemsToDelete.length > 1 ) ?
      `Are you sure you want to delete the ${itemsToDelete.length} selected ${this.name.items}?` :
      `Are you sure you want to delete the ${this.name.item} '${itemsToDelete[0][itemKey]}'`;
  
    //TODO: replace by some fancy "popup"
      if (confirm(confirmMessage)) {

        try {

          const deleteStatus = await Promise.all(
            itemsToDelete.map(async (itemToDelete) => {
              const apiResponse = await deleteApiEndpoint(...deleteApiEndpointArgs.map(arg => itemToDelete[arg]));
              return apiResponse.statusOK;
            }));

          if (deleteStatus.includes(true)) {
            console.log("deleting success", deleteStatus.length);
            // trigger the watcher to reload the page
            this.pagination.totalEntries -= deleteStatus.length;
           // return [true, undefined];
          }
        }
        catch(error) {
          console.log(error)
          //todo: return/show some error message
          //return [false, error];

        }

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