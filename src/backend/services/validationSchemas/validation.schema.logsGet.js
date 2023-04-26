const { queryParams, pathParams }  = require("./validation.schemaShared.params")


const logsGetSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.sortOrder,
  pathParams.userId

]

module.exports = logsGetSchema