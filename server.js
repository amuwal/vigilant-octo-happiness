import express from "express";
import { connectDB } from "./db/index.js";
import { config } from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js";

// Load environment variables from .env file
config();

const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to vigilant-octo-happiness-server!" });
});

// Connect to MongoDB
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server is listening on port http://localhost:" + port);
  console.log("Press Ctrl+C to quit.");
});
