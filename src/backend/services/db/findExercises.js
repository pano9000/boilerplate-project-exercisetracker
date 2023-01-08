const { ExerciseModel } = require("../../db/").models;

const findExercise = {

  async findOne(searchObject) {
    return await this.find("one", searchObject)
  },

  async findAll(searchObject, queryOptions) {
    return await this.find("all", searchObject, queryOptions)
  },

  async find(mode = "all", searchObject, queryOptions) {

    try {
      const searchResult = (mode === "one") ? await ExerciseModel.findOne(searchObject).exec() : await ExerciseModel.find(searchObject, null, queryOptions).exec();
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