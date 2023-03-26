const { param, query } = require("express-validator")

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
    .escape()
    .isInt(),

  "sort":
    query("sort", { errorHandling: "resetParamErrors" })
    .optional()
    .isIn(["asc", "dsc"]),
}

const pathParams = {
  "userId":
    param("userId", { errorHandling: "fatalError" })
    .matches(/^user_[a-z0-9]{24}$/),

  "exerciseId":
    param("exerciseId", { errorHandling: "fatalError" })
    .matches(/^exerc_[a-z0-9]{24}$/)
}


module.exports = { queryParams, pathParams}