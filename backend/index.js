import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start server ONLY after DB connects
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","https://role-based-student-management-syste.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

import studentRouter from "./routes/student.route.js"
app.use("/api/v1/student",studentRouter)

import adminRouter from "./routes/admin.route.js"
app.use("/api/v1/admin",adminRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});
