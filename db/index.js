import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const DB_URI = process.env.MONGO_DB_URI;

export async function connectDB() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
