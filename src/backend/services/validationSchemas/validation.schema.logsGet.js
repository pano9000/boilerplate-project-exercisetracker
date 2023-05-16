const { queryParams, pathParams }  = require("./validation.schemaShared.params")


const logsGetSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limitv1,
  queryParams.sortOrder,
  pathParams.userId

]

module.exports = logsGetSchema