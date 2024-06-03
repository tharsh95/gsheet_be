import express from "express";
import { User } from "../models/UserModel.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      return res
        .status(401)
        .send({ message: "User already exists", code: 333 });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ code: 200, message: "Created" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    res.cookie("Test", "TESTER");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const loginData = {
        email,
        signInTime: Date.now(),
      };
      const token = jwt.sign(loginData, "jwtSecretKey");
      return res
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" ,token});
    }
  } catch (e) {
    console.log(e, "e");
  }
});

export default router;
