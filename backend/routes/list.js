import express from "express";
import User from "../models/user.js";
import List from "../models/list.js"
import { get } from "mongoose";

const router = express.Router();

//Add Task
router.post("/addTask/:userId" , async(req, res) => {
  console.log("ADD TASK BODY:", req.body);
  console.log("USER ID:", req.params.userId);
  try {
    const { title, body } = req.body;
    const { userId } = req.params;

    if(!title || !body){
      return res.status(400).json({message: "All fields required"});
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const list = new List({
      title,
      body,
      user: user._id
    });

    await list.save();
    user.list.push(list._id);
    await user.save();

    res.status(200).json({
      message: "Task added successfully",
      list,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

//Update Task
router.put("/updateTask/:id" , async(req, res) => {
  console.log("UPDATE HIT:", req.params.id);
  try {
    const { title, body } = req.body;
    
    await List.findByIdAndUpdate(
        req.params.id,
         {title, body},
          {new: true}
        );
      res.status(200).json({message: "Task Updated Succesfully"});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});
//Delete Task
router.delete("/deleteTask/:id" , async(req, res) => {
    console.log("DELETE HIT:", req.params.id);
  try {
    const taskId = req.params.id;
    const task = await List.findById(taskId);
    if(!task) {
      return res.status(404).json({message: "Task not found"});
    }
    await User.findByIdAndUpdate(task.user, {
      $pull: {list: taskId},
    });

    await List.findByIdAndDelete(taskId);
    res.status(200).json({message: "Task Deleted Succesfully"});
  } catch (err) {
    res.status(500).json({message: "Server error"});
  }
});
//Get Tasks
router.get("/getTasks/:userId", async(req,res) => {
  try {
     const getTasks = await List.find({user: req.params.userId}).sort({createdAt: -1});

     res.status(200).json({getTasks});
   } catch (err) {
    console.log(err);
    res.status(500).json({message: "Server error"});
   }
});


export default router;
