const { UserModel } = require("../../db/").models;

const findUser = {

  async findOne(searchQuery = null) {
    return await this.find( {
      mode: "one",
      searchQuery: searchQuery,
      sortOptions: null
    })
  },

  async findAll(searchQuery = null, sortOptions = null) {
    return await this.find({
      "mode": "all",
      "searchQuery": searchQuery,
      "sortOptions": sortOptions
    })
  },


  async find(options) {

    try {
      const { mode, searchQuery, sortOptions } = options
      const searchResult = 
        (mode === "one") 
        ? await UserModel.findOne(searchQuery).exec()
        : await UserModel.find(searchQuery).sort(sortOptions).exec();

      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }

      //TODO: check what happens if 0 etnries? // null returned?

      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error(`Finding User failed: ${error.message}`)
    }

  }
}

module.exports = findUser