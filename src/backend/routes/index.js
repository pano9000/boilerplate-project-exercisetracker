const router = require("express").Router();
const controllers = require("../controllers")


router.get("*", controllers.rateLimiter.get);
router.post("*", controllers.rateLimiter.post);

router.get("/", controllers.root.get)

router.get("/api/users", controllers.api.users.get)
router.get("/api/users/:_id/logs", controllers.api.users.logs.get)

router.post("/api/users", controllers.api.users.post )
router.post("/api/users/:_id/exercises", controllers.api.users.exercises.post)


/* future routes
router.get("/api/users/:_id", controllers.api.users.userId.get)
router.patch("/api/users/:_id", controllers.api.users.userId.patch)
*/

//404 Handling
router.get("*", controllers.unknown.get)

module.exports = router;