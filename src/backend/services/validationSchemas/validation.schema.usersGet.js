const { queryParams }  = require("./validation.schemaShared.params");
const { UserSchema } = require("../../db/schemas");

module.exports = [
  queryParams.sortOrder,
  queryParams.sortBy([...Object.keys(UserSchema.paths)]), //@TODO: potential security issue for future fields, that should not be sortable for everyone, e.g. isAdmin or similar
  queryParams.limit,
  queryParams.page,
  queryParams.query(UserSchema.obj.username.match)
]