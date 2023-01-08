const { UserModel } = require("../../db/").models;

const findUser = {

  async findOne(searchObject) {
    return await this.find("one", searchObject)
  },

  async findAll() {
    return await this.find()
  },

  async find(mode = "all", searchObject) {

    try {
      const searchResult = (mode === "one") ? await UserModel.findOne(searchObject).exec() : await UserModel.find().exec();
      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }
      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error("Finding User failed")
    }

  }
}

module.exports = findUser