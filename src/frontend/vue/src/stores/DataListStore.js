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
  }

});