const { queryParams }  = require("./validation.schemaShared.params")
const { ExerciseSchema } = require("../../db/schemas")

const logsGetAllSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.skip,
  queryParams.sort,
  queryParams.sortBy([...Object.keys(ExerciseSchema.paths)])

]

module.exports = logsGetAllSchema