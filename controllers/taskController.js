const Task = require("../models/task.model");
const { request } = require("express");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const {id} = req.params;

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;

    const task = await Task.findByIdAndDelete(id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { 
    createTask,
     getTasks, 
     updateTask,
     deleteTask 
};