const { UserModel } = require("../../db/").models;

module.exports = async function(userId, updatedData) {

  try {
    const filter = { _id: userId };
    const searchResult = await UserModel.findOneAndUpdate(filter, updatedData);

    if (searchResult === undefined) {
      throw new Error("Db returned undefined")
    }

    if (searchResult === null) {
      throw new Error("Db returned null, user not found")
    }

    return searchResult

  }
  catch(error) {
    console.log("error", error.message)
    throw new Error(`Updating User failed, ${error.message}`)
  }

}