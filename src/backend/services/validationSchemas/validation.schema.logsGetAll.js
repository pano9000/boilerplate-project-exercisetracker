const { queryParams }  = require("./validation.schemaShared.params")
const { ExerciseSchema } = require("../../db/schemas")

const exerciseSchemaFields = [...Object.keys(ExerciseSchema.paths)]; //@TODO: potential security issue for future fields, that should not be sortable for everyone, e.g. isAdmin or similar


const logsGetAllSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.page,
  queryParams.sortOrder,
  queryParams.sortBy(exerciseSchemaFields),
  queryParams.searchFor(/[a-zA-Z0-9]/),
  queryParams.searchIn(exerciseSchemaFields, "description"), //@TODO: some way to not hardcode that here, but maybe in the Schema instead?
]

module.exports = logsGetAllSchema