
module.exports = {

  check: {
    usersPost: require("./validation.schema.usersPost"),
    exercisePost: require("./validation.schema.exercisePost"),
    logsGet: require("./validation.schema.logsGet"),
    logsGetAll: require("./validation.schema.logsGetAll"),
    userIdGet: require("./validation.schema.userIdGet")
  },
  handler: require("./validation.handler")

}