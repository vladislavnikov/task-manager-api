const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection failed!')) 

};

module.exports = connectDB;
