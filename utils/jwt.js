import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function generateToken(user, expiresIn = "7d") {
  try {
    // Ensure user object is provided
    if (!user) {
      throw new Error("User object is required to generate token");
    }

    // Generate token
    const token = jwt.sign(user, SECRET_KEY, { expiresIn });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
}

export function decryptToken(token) {
  try {
    // Ensure token is provided
    if (!token) {
      throw new Error("Token is required to decrypt");
    }

    // Decrypt token
    const decrypted = jwt.verify(token, SECRET_KEY);

    return decrypted;
  } catch (error) {
    console.error("Error decrypting token:", error);
    throw error;
  }
}
