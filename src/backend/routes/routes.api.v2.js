const router = require("express").Router();
const controllers = require("../controllers")
const validation = require("../services/validationSchemas/validation.index")


router.get("*", controllers.rateLimiter.get);
router.post("*", controllers.rateLimiter.post);

router.get("/users", controllers.api.users.get);

//all user's exercises
router.get(
  "/users/exercises",
  validation.check.logsGetAll,
  validation.handler,
  controllers.api.users.logsAll.get)

//single user's exercises
router.get(
  "/users/:userId/exercises",
  validation.check.logsGet,
  validation.handler,
  controllers.api.users.logs.get);

router.post(
  "/users",
  validation.check.usersPost,
  validation.handler,
  controllers.api.users.post
);

router.post(
  "/users/:userId/exercises",
  validation.check.exercisePost,
  validation.handler,
  controllers.api.users.exercises.post
);

router.get(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  controllers.api.users.userId.get
);


router.delete(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  //authentication check,
  controllers.api.users.userId.delete
);


/* future routes
router.patch("/users/:userId", controllers.api.users.userId.patch)
*/

//404 Handling
router.get("*", controllers.unknown.get)

module.exports = router;