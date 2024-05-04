import express from "express";
const router = express.Router();
import Task from "../models/task.Schema.js";
import User from "../models/user.Schema.js";
import authanticatToken from "./auth.js";

// create-task
router.post("/create-task", authanticatToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.headers;

    if (title == "") {
      return res.status(400).json({ message: "title is required" });
    }
    if (description == "") {
      return res.status(400).json({ message: "title is required" });
    }

    const newTask = new Task({
      title: title,
      description: description,
    });

    const savetask = await newTask.save();

    const taskId = savetask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    return res.status(200).json({ message: "task save successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal server error" });
  }
});

// get all Task
router.get("/get-all-tasks", authanticatToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// delete Task

router.delete("/delete-tasks/:id", authanticatToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, {
      $pull: { tasks: id },
    });
    res.status(200).json({ message: "TasK deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// update task
router.put("/update-tasks/:id", authanticatToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userData = await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// update imp task
router.put("/update-imp-tasks/:id", authanticatToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    console.log(ImpTask);

    await Task.findByIdAndUpdate(id, {
      important: !ImpTask,
    });

    res.status(200).json({ message: " update important successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// updat complete task
router.put("/update-complete-tasks/:id", authanticatToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.completed;

    await Task.findByIdAndUpdate(id, {
      completed: !CompleteTask,
    });

    res.status(200).json({ message: "update complete successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// important task
router.get("/important-tasks", authanticatToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const important = userData.tasks;
    res.status(200).json({ tasks: important });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// complete Task
router.get("/completed-tasks", authanticatToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      match: { completed: true },
      options: { sort: { createdAt: -1 } },
    });
    const ImpTaskData = userData.tasks;
    res.status(200).json({ tasks: ImpTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// incomplete task
router.get("/incompleted-tasks", authanticatToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      match: { completed: false },
      options: { sort: { createdAt: -1 } },
    });
    const incompleteTask = userData.tasks;
    res.status(200).json({ tasks: incompleteTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});
export default router;
