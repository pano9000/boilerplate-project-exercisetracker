
module.exports = {

  check: {
    exercisePost: require("./validation.schema.exercisePost"),
    logsGet: require("./validation.schema.logsGet"),
    userIdGet: require("./validation.schema.userIdGet")
  },
  handler: require("./validation.handler")

}