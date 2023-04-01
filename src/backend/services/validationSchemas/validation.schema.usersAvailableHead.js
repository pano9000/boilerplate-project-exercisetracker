const { query } = require("express-validator")
const { regexps } = require("./validation.schemaShared.params")


module.exports = [

  query("username", { errorHandling: "resetParamErrors" })
    .trim()
    .matches(regexps.username)

]
