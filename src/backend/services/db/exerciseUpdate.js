const { ExerciseModel } = require("../../db/").models;

module.exports = async function(params, updatedData) {

  try {
    const filter = { _id: params.exerciseId, userId: params.userId };
    const searchResult = await ExerciseModel.findOneAndUpdate(filter, updatedData);

    if (searchResult === undefined) {
      throw new Error("Db returned undefined")
    }

    if (searchResult === null) {
      throw new Error("Db returned null, Exercise not found")
    }

    return searchResult

  }
  catch(error) {
    console.log("error", error.message)
    throw new Error(`Updating User failed, ${error.message}`)
  }

}