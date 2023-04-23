const { param, query } = require("express-validator");
const dbSchemas = require("../../db/schemas/index")

const queryParams = {

  "from":
    query("from", { errorHandling: "resetParamErrors" })
    .optional()
    .escape()
    .isDate(),

  "to":
    query("to", { errorHandling: "resetParamErrors" })
    .optional()
    .escape()
    .isDate(),

  "limit":
    query("limit", { errorHandling: "resetParamErrors" })
    .optional()
    .isIn([5, 10, 25, 50, 100]),

  "page":
    query("page", { errorHandling: "resetParamErrors" })
    .optional()
    .isInt({ min: 1, max: 99999 }),

  "sort":
    query("sort", { errorHandling: "resetParamErrors" })
    .optional()
    .isIn([1, -1]),

  "sortBy": (acceptedValues) => {
    return query("sortBy", { errorHandling: "resetParamErrors" })
    .optional()
    .isIn(acceptedValues)
  }

}

const pathParams = {
  "userId":
    param("userId", { errorHandling: "fatalError" })
    .matches(/^user_[a-z0-9]{24}$/),

  "exerciseId":
    param("exerciseId", { errorHandling: "fatalError" })
    .matches(/^exerc_[a-z0-9]{24}$/)
}

const regexps = {

  username: dbSchemas.UserSchema.tree.username.match

}


module.exports = { queryParams, pathParams, regexps}