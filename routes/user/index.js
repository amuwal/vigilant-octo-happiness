import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../../db/models/User.js";
import auth from "../../middlewares/auth.js";
import { hashPassword } from "../../utils/bcrypt.js";

const router = Router();

/* 
  GET /api/user
  Returns user details
 */
router.get("/", auth, (req, res) => {
  // req.user contains the authenticated user
  // Remove sensitive data before sending the user object
  const user = req.user.toObject();
  delete user.password;

  res.status(200).json(user);
});

/* 
  PUT /api/user
  Updates user details
 */
router.put(
  "/",
  auth,
  [
    // Validate input fields
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Email is not valid"),
    body("password")
      .optional()
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
      const { username, email, password } = req.body;
      const updates = {};
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (password) updates.password = await hashPassword(password);

      // Update user
      let user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
      });

      // Remove sensitive data before sending the user object
      user = user.toObject();
      delete user.password;

      // Send response
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in PUT /api/user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
