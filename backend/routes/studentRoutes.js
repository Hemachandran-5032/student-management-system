const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// ======================================================
// ADD STUDENT
// ======================================================

router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();

    res.status(201).json({
      message: "Student added successfully",
      student: savedStudent,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL STUDENTS
// ======================================================

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get students",
      error: error.message,
    });
  }
});

// ======================================================
// GET ONE STUDENT
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get student",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE STUDENT
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.name = req.body.name;
    student.rollNumber = req.body.rollNumber;
    student.email = req.body.email;
    student.department = req.body.department;
    student.year = req.body.year;
    student.phone = req.body.phone;

    const updatedStudent = await student.save();

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE STUDENT
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

module.exports = router;