const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { request } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
   try{
    const {name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists)
    {
        return res.status(400).json({message: "User already exists!"});
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashedPass});

    res.status(201).json({message: "User registered successfully!", user});
   } catch (error) {
    res.status(500).json({error: error.message});
   }
};

const loginUser = async(req, res) =>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: "1h" });
       
        res.json({ message: "Login successful", token, userId: user._id });
    }catch{
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };