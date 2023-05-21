const { queryParams }  = require("./validation.schemaShared.params");
const { UserSchema } = require("../../db/schemas");

const userSchemaFields = [...Object.keys(UserSchema.paths)]; //@TODO: potential security issue for future fields, that should not be sortable for everyone, e.g. isAdmin or similar

module.exports = [
  queryParams.sortOrder,
  queryParams.sortBy(userSchemaFields),
  queryParams.limit,
  queryParams.page,
  queryParams.searchFor(UserSchema.obj.username.match),
  queryParams.searchIn(userSchemaFields, "username"), //@TODO: some way to not hardcode that here, but maybe in the Schema instead?
]