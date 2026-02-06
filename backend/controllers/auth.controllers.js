import {asyncHandler} from '../utils/asynchandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/tokenfunctions.js'
import { isDBConnected } from '../db/db.js'

const signup = asyncHandler(async(req, res) => {
    if (!isDBConnected()) {
        throw new ApiError(500, 'Database connection failed');
    }
    const {name, password, email} = req.body;

    if([name, password, email].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existinguser = await User.findOne({email});
    if(existinguser) {
        throw new ApiError(400, "User already exists")
    }
    const hashpassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, email,
        password: hashpassword
    })

    return res.status(200).json({
        success: true,
        message: "SignUp Done"
    })
})

const login = asyncHandler(async(req, res) => {
    if (!isDBConnected()) {
        throw new ApiError(500, 'Database connection failed');
    }
    const {email, password} = req.body;
    if([email, password].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const comparePass = await bcrypt.compare(password, user.password)
    if(!comparePass){
        throw new ApiError(400, "Invalid Password")
    }

    const token = generateToken(user)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success:true,
        message: "Login successful"
    })
})

const logout = asyncHandler(async(req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
})
export {signup, login, logout}