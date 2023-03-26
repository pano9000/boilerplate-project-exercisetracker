const { body } = require("express-validator")


const usersPostSchema = [

  body("username", { errorHandling: "fatalError" })
    .trim()
    .matches(/^[0-9a-z\-_]{3,30}$/)

]



module.exports = usersPostSchema