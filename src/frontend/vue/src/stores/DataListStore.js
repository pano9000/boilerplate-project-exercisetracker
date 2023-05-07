import { defineStore } from "pinia";

export const useDataListStore = defineStore("DataList", {

  state: () => ({
    data: [],
    pagination: {},
    filters: {},
    currentItem: {},
  }),

  actions: {

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