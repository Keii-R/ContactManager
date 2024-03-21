const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@Description Register a user
//@Route GET /api/users/register
//@Access Public
const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash Password
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    if(user) {
        res.status(200).json({message: "User registered", _id : user.id, email : user.email});
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@Description Login a user
//@Route GET /api/users/login
//@Access Public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    // Compare password
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "60m"})
        res.status(200).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("Email Or Password is not Valid");
    }
});

//@Description Login a user
//@Route GET /api/users/current
//@Access Private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}