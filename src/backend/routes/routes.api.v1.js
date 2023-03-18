const router = require("express").Router();
const controllers = require("../controllers")
const validation = require("../services/validationSchemas/validation.index")


router.get("*", controllers.rateLimiter.get);
router.post("*", controllers.rateLimiter.post);

router.get("/users", controllers.api.v1.users.get);

//all user's logs
router.get(
  "/users/logs",
  validation.check.logsGetAll,
  validation.handler,
  controllers.api.v1.users.logsAll.get)

//single user's log
router.get(
  "/users/:userId/logs",
  validation.check.logsGet,
  validation.handler,
  controllers.api.v1.users.logs.get);

router.post(
  "/users",
  validation.check.usersPost,
  validation.handler,
  controllers.api.v1.users.post
);

router.post(
  "/users/:userId/exercises",
  validation.check.exercisePost,
  validation.handler,
  controllers.api.v1.users.exercises.post
);

router.get(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  controllers.api.v1.users.userId.get
);


router.delete(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  //authentication check,
  controllers.api.v1.users.userId.delete
);


/* future routes
router.patch("/users/:userId", controllers.api.users.userId.patch)
*/

//404 Handling
router.get("*", controllers.unknown.get)

module.exports = router;