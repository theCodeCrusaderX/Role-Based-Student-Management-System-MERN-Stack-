import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["admin", "student"] },
  course: {
    type: String,
    required: true,
  },

  enrollmentDate: {
    type: Date,
    default: Date.now, // ✅ auto-set
  },
});

export const User = mongoose.model("User", userSchema);
