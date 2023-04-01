const { body } = require("express-validator")
const { regexps } = require("./validation.schemaShared.params")

const usersPostSchema = [

  body("username", { errorHandling: "fatalError" })
    .trim()
    .matches(regexps.username)

]

module.exports = usersPostSchema