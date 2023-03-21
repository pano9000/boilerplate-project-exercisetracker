const { pathParams }  = require("./validation.schemaShared.params")

const exerciseGetOneSchema = [

  pathParams.userId,
  pathParams.exerciseId

]

module.exports = exerciseGetOneSchema