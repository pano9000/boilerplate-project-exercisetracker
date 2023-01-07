

module.exports = {
  connection: require("./dbConnection"),
  customType: require("./types/dbPrefixedObjectIdType"),
  schemas: require("./schemas"),
  models: require("./dbModels"),
}