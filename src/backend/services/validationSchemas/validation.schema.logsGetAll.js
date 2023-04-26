const { queryParams }  = require("./validation.schemaShared.params")
const { ExerciseSchema } = require("../../db/schemas")

const logsGetAllSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.page,
  queryParams.sortOrder,
  queryParams.sortBy([...Object.keys(ExerciseSchema.paths)])

]

module.exports = logsGetAllSchema