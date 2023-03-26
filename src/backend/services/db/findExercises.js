const { ExerciseModel } = require("../../db/").models;

const findExercise = {

  async findOne(searchQuery = null) {
    return await this.find( {
      mode: "one",
      searchQuery: searchQuery,
      sortOptions: null
    })
  },

  async findAll(searchQuery = null, sortOptions = null, queryOptions = null) {
    return await this.find({
      "mode": "all",
      "searchQuery": searchQuery,
      "sortOptions": sortOptions,
      "queryOptions": queryOptions
    })
  },

  async find(options) {

    try {
      const { mode, searchQuery, sortOptions, queryOptions } = options

      const searchResult = 
        (mode === "one") 
        ? await ExerciseModel.findOne(searchQuery).exec() 
        : await ExerciseModel.find(searchQuery, null, queryOptions)
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
      throw new Error("Finding Exercise failed")
    }

  }
}

module.exports = findExercise