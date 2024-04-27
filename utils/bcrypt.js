import bcrypt from "bcrypt";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export async function hashPassword(password) {
  try {
    // Ensure password is provided
    if (!password) {
      throw new Error("Password is required to generate hash");
    }

    // Generate hash
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function comparePassword(password, hash) {
  try {
    // Ensure password and hash are provided
    if (!password || !hash) {
      throw new Error("Password and hash are required to compare");
    }

    // Compare password and hash
    const match = await bcrypt.compare(password, hash);

    return match;
  } catch (error) {
    console.error("Error comparing password and hash:", error);
    throw error;
  }
}
