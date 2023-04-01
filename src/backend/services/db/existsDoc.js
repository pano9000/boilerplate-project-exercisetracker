const dbModels = require("../../db/").models;

/**
 * 
 * @param { String } dbModelName Name of the model to look in
 * @param { {} } searchQuery search query object
 * @returns { {data} | null }
 */
module.exports = async function(dbModelName, searchQuery) {

  try {
    const dbModel = dbModels[dbModelName]["model"];
    const searchResult = await dbModel.exists(searchQuery).exec();

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