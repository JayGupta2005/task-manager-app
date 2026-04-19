const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// Create Task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    title,
    description,
    userId: req.user.id
  });

  await task.save();
  res.json(task);
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;