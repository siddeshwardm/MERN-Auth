import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !name.trim()) {
    return res.status(400).json({ msg: "Name is required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters" });
  }

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered" });

  } catch (err) {
    console.error("/register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Backend validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Password is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ msg: "JWT secret is not configured" });
    }

    const token = jwt.sign(
      { id: user._id },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("/login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;