import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ 
      email,
       username: username,
        password: hashPassword
       });

    await user.save();
    return res.status(200).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error while registering user" });
  
  }
});

router.post("/login", async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message: "Please Sign Up First"
      });
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
          return res.status(401).json({ message: "Invalid email or password" });
       }
       return res.status(200).json({
        message: "Login successful",
        user,
       });
    
  } catch (error) {
    console.error("Login error:" , error);
    return res.status(500).json({ message: "Server error while logging in" });
  
  }
});

export default router;