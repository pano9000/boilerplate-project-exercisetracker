const router = require("express").Router();
const controllers = require("../controllers")
const validation = require("../services/validationSchemas/validation.index")


router.get("*", controllers.rateLimiter.get);
router.post("*", controllers.rateLimiter.post);

router.get("/", controllers.root.get);

router.get("/api/users", controllers.api.users.get);
router.get(
  "/api/users/:userId/logs",
  validation.check.logsGet,
  validation.handler,
  controllers.api.users.logs.get);

router.post("/api/users", controllers.api.users.post);

router.post(
  "/api/users/:userId/exercises",
  validation.check.exercisePost,
  validation.handler,
  controllers.api.users.exercises.post
);


/* future routes
router.get("/api/users/:userId", controllers.api.users.userId.get)
router.patch("/api/users/:userId", controllers.api.users.userId.patch)
*/

//404 Handling
router.get("*", controllers.unknown.get)

module.exports = router;