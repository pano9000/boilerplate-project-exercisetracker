import { defineStore } from "pinia";

export const useDataListStore = defineStore("DataList", {

  state: () => ({
    data: {},
    pagination: {},
    filters: {}
  }),

  actions: {

  },

  getters: {
  }

});