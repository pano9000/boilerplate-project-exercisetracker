const { queryParams }  = require("./validation.schemaShared.params");
const { UserSchema } = require("../../db/schemas");

module.exports = [
  queryParams.sort,
  queryParams.sortBy([...Object.keys(UserSchema.paths)]),
  queryParams.limit,
  queryParams.page
]