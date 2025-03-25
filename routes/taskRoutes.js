const express = require("express");
const {createTask, getTasks, updateTask, deleteTask} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/create", createTask);
router.get("/all", getTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;