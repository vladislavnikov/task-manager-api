const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
