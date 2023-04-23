const dbModels = require("../../db/").models;

module.exports = async (dbModelName, searchQuery = null) => {

  try {
    const dbModel = dbModels[dbModelName]["model"];
    return await dbModel.countDocuments( searchQuery )
  }

  catch(error) {
    console.log(error)
    throw new Error("Getting count from Db failed")
  }

}