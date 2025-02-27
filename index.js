const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require("dotenv").config();
const app = express();

connectDB();

app.listen(process.env.PORT, ()=> {
    console.log('Server is running on port 3000');
});
