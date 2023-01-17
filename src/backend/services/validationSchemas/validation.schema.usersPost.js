const { pathParams }  = require("./validation.schemaShared.params")
const { body } = require("express-validator")


const usersPostSchema = [

  body("username")
    .matches(/^[0-9a-z]{3,30}$/)

]



module.exports = usersPostSchema