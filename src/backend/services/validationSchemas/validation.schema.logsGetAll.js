const { queryParams }  = require("./validation.schemaShared.params")


const logsGetAllSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.sort,

]

module.exports = logsGetAllSchema