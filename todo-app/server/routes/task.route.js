const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticate);

// Task routes
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
