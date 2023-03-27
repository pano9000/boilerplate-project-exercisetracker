const dbModels = require("../../db/").models;

module.exports = {

  async deleteOne(dbModel, searchQuery) {
    return await this.delete( {
      "mode": "one",
      "searchQuery": searchQuery,
      "dbModel": dbModel
    });
  },

  async delete(options) {

    try {
      const { dbModel, mode, searchQuery } = options

      const searchResult = await dbModels[dbModel]["model"].findOneAndDelete(searchQuery).exec();

      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }

      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error(`Deleting Doc failed, ${error.message}`)
    }

  }
}