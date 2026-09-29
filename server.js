const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRoutes");


const PORT = 3000;

app.use(express.json());


app.use(logger);



app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Student Management REST API is running"
    });

});


app.use("/students", studentRoutes);



app.use((req, res, next) => {

    const error = new Error(
        `Route ${req.originalUrl} not found`
    );

    error.statusCode = 404;

    next(error);

});



app.use(errorHandler);



app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});