const dbModels = require("../../db/").models;

module.exports = async function(dbModel, filter, updatedData) {

  try {
    const searchResult = await dbModels[dbModel]["model"].findOneAndUpdate(filter, updatedData);

    if (searchResult === undefined) {
      throw new Error("Db returned undefined")
    }

    if (searchResult === null) {
      throw new Error("Db returned null, Doc not found")
    }

    return searchResult

  }
  catch(error) {
    console.log("error", error.message)
    throw new Error(`Updating Doc failed, ${error.message}`)
  }

}