import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import logger from "./middleware/logger.js";

const app = express();

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