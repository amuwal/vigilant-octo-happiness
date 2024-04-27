import { Router } from "express";

import { body, validationResult } from "express-validator";
import User from "../../db/models/User.js";
import { generateToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";

const router = Router();

router.post(
  "/register",
  [
    // Validate input fields
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if username or email already exists
      let user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (user) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Hash password
      const hashedPassword = await hashPassword(req.body.password);

      // Create new user
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();

      // Remove sensitive data before sending the user object
      user = user.toObject();
      delete user.password;

      // Generate token
      const token = generateToken({ _id: user._id });

      // Send response
      res.status(201).json({ token, user });
    } catch (error) {
      console.error("Error in /auth/register:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    // Validate input fields
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user exists
      let user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Compare password
      const isMatch = await comparePassword(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Generate token
      const token = generateToken({ _id: user._id });

      // Remove sensitive data before sending the user object
      user = user.toObject();
      delete user.password;

      // Send response
      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Error in /auth/login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
