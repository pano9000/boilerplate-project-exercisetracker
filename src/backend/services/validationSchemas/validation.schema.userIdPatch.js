const { pathParams }  = require("./validation.schemaShared.params")
const usersPostSchema = require("./validation.schema.usersPost")
module.exports = [

  pathParams.userId,
  ...usersPostSchema

]