// imports
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.todos.index);
router.get("/:id", ctrl.todos.show);
router.post("/", ctrl.todos.create);


// exports
module.exports = router;