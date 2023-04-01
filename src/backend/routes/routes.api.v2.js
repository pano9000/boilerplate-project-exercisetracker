const router = require("express").Router();
const controllers = require("../controllers");
const validation = require("../services/validationSchemas/validation.index");


router.get("*", controllers.rateLimiter.get);
router.post("*", controllers.rateLimiter.post);

router.get(
  "/users",
  validation.check.usersGet,
  validation.handler,
  controllers.api.v2.users.get
);

router.head(
  "/users/available",
  validation.check.usersAvailableHead,
  validation.handler,
  controllers.api.v2.users.available.head
);

//all user's exercises
router.get(
  "/users/exercises",
  validation.check.logsGetAll,
  validation.handler,
  controllers.api.v2.users.exercisesGetAll.get
);

//single user's exercises
router.get(
  "/users/:userId/exercises",
  validation.check.logsGet,
  validation.handler,
  controllers.api.v2.users.userIdExercisesAll.get
);

router.post(
  "/users",
  validation.check.usersPost,
  validation.handler,
  controllers.api.v2.users.post
);

router.post(
  "/users/:userId/exercises",
  validation.check.exercisePost,
  validation.handler,
  controllers.api.v2.users.exercises.post
);

router.get(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  controllers.api.v2.users.userId.get
);

router.patch(
  "/users/:userId",
  validation.check.userIdPatch,
  validation.handler,
  controllers.api.v2.users.userId.patch
);

router.delete(
  "/users/:userId",
  validation.check.userIdGet,
  validation.handler,
  //authentication check,
  controllers.api.v2.users.userId.delete
);

//get single user's single exercise
router.get(
  "/users/:userId/exercises/:exerciseId",
  validation.check.exerciseGetOneSchema,
  validation.handler,
  controllers.api.v2.users.userIdExerciseOne.get
);

router.patch(
  "/users/:userId/exercises/:exerciseId",
  validation.check.userIdExercisePatch,
  validation.handler,
  controllers.api.v2.users.userIdExerciseOne.patch
);

//get single user's single exercise
router.delete(
  "/users/:userId/exercises/:exerciseId",
  validation.check.exerciseGetOneSchema,
  validation.handler,
  //authentication check,
  controllers.api.v2.users.userIdExerciseOne.delete
);


//404 Handling
router.get("*", controllers.unknown.get);

module.exports = router;