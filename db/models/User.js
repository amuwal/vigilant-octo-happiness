import mongoose from "mongoose";
import { nanoid } from "nanoid";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => "user-" + nanoid(12),
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    // default to current epoch time stamp
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
