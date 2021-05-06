var express = require("express");
const TaskController = require("../controllers/taskController");

var router = express.Router();

router.get("/:autor", TaskController.listTasks);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;