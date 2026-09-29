const students = require("../data/students");


// ==========================================
// GET ALL STUDENTS
// GET /students
// ==========================================
const getAllStudents = (req, res) => {

    res.status(200).json({
        success: true,
        count: students.length,
        students: students
    });
};


// ==========================================
// GET STUDENT BY ID
// GET /students/:id
// ==========================================
const getStudentById = (req, res, next) => {

    const id = Number(req.params.id);

    // Check if ID is a valid number
    if (isNaN(id)) {
        const error = new Error("Invalid student ID");
        error.statusCode = 400;
        return next(error);
    }

    const student = students.find(
        student => student.id === id
    );

    // Student doesn't exist
    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        return next(error);
    }

    res.status(200).json({
        success: true,
        student: student
    });
};


// ==========================================
// CREATE STUDENT
// POST /students
// ==========================================
const createStudent = (req, res, next) => {

    const { name, age, course, email } = req.body;

    // Check required fields
    if (!name || !age || !course || !email) {

        const error = new Error(
            "Name, age, course and email are required"
        );

        error.statusCode = 400;

        return next(error);
    }

    // Generate new ID
    const newId =
        students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1;

    const newStudent = {
        id: newId,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        student: newStudent
    });
};


// ==========================================
// UPDATE STUDENT
// PUT /students/:id
// ==========================================
const updateStudent = (req, res, next) => {

    const id = Number(req.params.id);

    // Check ID
    if (isNaN(id)) {

        const error = new Error("Invalid student ID");
        error.statusCode = 400;

        return next(error);
    }

    const student = students.find(
        student => student.id === id
    );

    // Student not found
    if (!student) {

        const error = new Error("Student not found");
        error.statusCode = 404;

        return next(error);
    }

    const { name, age, course, email } = req.body;

    // Check required fields
    if (!name || !age || !course || !email) {

        const error = new Error(
            "Name, age, course and email are required"
        );

        error.statusCode = 400;

        return next(error);
    }

    student.name = name;
    student.age = age;
    student.course = course;
    student.email = email;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: student
    });
};


// ==========================================
// DELETE STUDENT
// DELETE /students/:id
// ==========================================
const deleteStudent = (req, res, next) => {

    const id = Number(req.params.id);

    // Check ID
    if (isNaN(id)) {

        const error = new Error("Invalid student ID");
        error.statusCode = 400;

        return next(error);
    }

    const index = students.findIndex(
        student => student.id === id
    );

    // Student not found
    if (index === -1) {

        const error = new Error("Student not found");
        error.statusCode = 404;

        return next(error);
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        student: deletedStudent
    });
};


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};