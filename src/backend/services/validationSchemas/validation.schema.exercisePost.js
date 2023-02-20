const { body } = require("express-validator")
const { queryParams, pathParams }  = require("./validation.schemaShared.params")


const exercisePostSchema = [

  pathParams.userId,

  body("description", { errorHandling: "fatalError" }).isLength({ min: 2, max: 50 }),
  body("duration", { errorHandling: "fatalError" }).isInt( { min: 1, max: 999 }),
  body("date", { errorHandling: "fatalError" }).optional({ checkFalsy: true }).isDate(),

]

module.exports = exercisePostSchema