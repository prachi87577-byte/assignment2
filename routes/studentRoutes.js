const express = require("express");

const router = express.Router();

const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");


// GET /students
router.get("/", getAllStudents);


// GET /students/:id
router.get("/:id", getStudentById);


// POST /students
router.post("/", createStudent);


// PUT /students/:id
router.put("/:id", updateStudent);


// DELETE /students/:id
router.delete("/:id", deleteStudent);


module.exports = router;