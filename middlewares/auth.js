import { decryptToken } from "../utils/jwt.js";

// db models
import User from "../db/models/User.js";

/*
auth middleware
- checks for 'User-Session-Token' header
- verifies the token
- fetches the user from the database
- add user to request object
- call next()
*/
export default async function auth(req, res, next) {
  try {
    // Check for 'User-Session-Token' header
    const token = req.headers["user-session-token"];

    // If no token is found, return 401 (Unauthorized)
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const payload = await decryptToken(token);

    // If token is invalid or expired, return 401 (Unauthorized)
    if (!payload || !payload._id) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Fetch the user from the database
    const user = await User.findById(payload._id);

    // If user is not found, return 401 (Unauthorized)
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // If token is valid, store the user in the request and call next()
    req.user = user;
    next();
  } catch (error) {
    // If an error occurs, return 500 (Internal Server Error)
    console.error("Error in auth middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
