const { queryParams }  = require("./validation.schemaShared.params");
const { UserSchema } = require("../../db/schemas");

module.exports = [
  queryParams.sortOrder,
  queryParams.sortBy([...Object.keys(UserSchema.paths)]),
  queryParams.limit,
  queryParams.page,
  queryParams.query(UserSchema.obj.username.match)
]