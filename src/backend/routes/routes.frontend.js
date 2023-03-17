const router = require("express").Router();
const controllers = require("../controllers")

router.get("/", controllers.root.get);


module.exports = router