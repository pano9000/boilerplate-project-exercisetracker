
module.exports = {

  check: {
    usersPost: require("./validation.schema.usersPost"),
    exercisePost: require("./validation.schema.exercisePost"),
    logsGet: require("./validation.schema.logsGet"),
    logsGetAll: require("./validation.schema.logsGetAll"),
    userIdGet: require("./validation.schema.userIdGet"),
    exerciseGetOneSchema: require("./validation.schema.exerciseGetOne")
  },
  handler: require("./validation.handler")

}