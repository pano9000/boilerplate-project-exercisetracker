module.exports = {

  unknown: {
    get: (req, res) => res.status(404).send("Unknown Page - 404 Error")
  },

  root: {
    get: (req, res) => res.sendFile(process.cwd() + "/views/index.html"),
  },

  api: {

    users: {

      get: require("./api/v1/usersGet"),
      post: require("./api/v1/usersPost"),

      userId: {
        get: require("./api/v1/userIdGet"),
        delete: require("./api/v1/userIdDelete"),
        /* TODO: future route, to get single user info and also update user info
        patch: require("./api/v1/userIdPatch")
        */
      },

      logs: {
        get: require("./api/v1/logsGet")
      },

      logsAll: {
        get: require("./api/v1/logsGetAll")
      },

      exercises: {
        post: require("./api/v1/exercisesPost")
      }

    },

  },

  rateLimiter: {
    post: require("./rateLimiter").post,
    get: require("./rateLimiter").get
  }
}