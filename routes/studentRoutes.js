import express from "express";
import students from "../data/students.js";

const router = express.Router();

// GET all students
router.get("/", (req, res) => {
    res.status(200).json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

// POST create student
router.post("/", (req, res) => {
    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});

// PUT update student
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;
    student.email = email;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

// DELETE student
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});
export default router;