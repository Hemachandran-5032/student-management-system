const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());

// ======================================================
// STUDENT ROUTES
// ======================================================

app.use("/api/students", studentRoutes);

// ======================================================
// TEST API
// ======================================================

app.get("/api/test", (req, res) => {
  res.json({
    message: "API test is working",
  });
});

// ======================================================
// HOME API
// ======================================================

app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API is running 🚀",
  });
});

// ======================================================
// SERVER CONFIGURATION
// ======================================================

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ======================================================
// MONGODB CONNECTION
// ======================================================

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
  });