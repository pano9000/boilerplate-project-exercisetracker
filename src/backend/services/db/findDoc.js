const dbModels = require("../../db/").models;

module.exports = {
  async findOne(dbModel, searchQuery = null) {
    return await this.find( {
      "mode": "one",
      "searchQuery": searchQuery,
      "sortOptions": null,
      "queryOptions": null,
      "dbModel": dbModels[dbModel]
    })
  },

  async findAll(dbModel, searchQuery = null, sortOptions = null, queryOptions = null) {
    return await this.find({
      "mode": "all",
      "searchQuery": searchQuery,
      "sortOptions": sortOptions,
      "queryOptions": queryOptions,
      "dbModel": dbModels[dbModel]
    })
  },

  async find(options) {

    try {
      const { mode, searchQuery, sortOptions, queryOptions, dbModel } = options

      const searchResult = 
        (mode === "one") 
        ? await dbModel.findOne(searchQuery).exec() 
        : await dbModel.find(searchQuery, null, queryOptions)
                             .sort(sortOptions)
                             .collation({"locale": "en"}) //for case insensitive sorting
                             .exec();

      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }

      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error("Finding from Db failed")
    }

  }
}