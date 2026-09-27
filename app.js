const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const students = [];
let nextStudentId = 1;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Student Management API' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
});

app.post('/students', (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ error: 'name, email, and course are required' });
    }

    const student = { id: nextStudentId++, name, email, course };
    students.push(student);
    res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ error: 'name, email, and course are required' });
    }

    Object.assign(student, { name, email, course });
    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex((item) => item.id === Number(req.params.id));

    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    students.splice(studentIndex, 1);
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Student Management API listening on port ${port}`);
    });
}

module.exports = app;
import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import logger from "./middleware/logger.js";



const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management REST API is running"
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});