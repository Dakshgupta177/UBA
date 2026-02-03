import {asynchandler} from '../utils/asynchandler'
import {ApiError} from '../utils/ApiError'
import {User} from '../models/user.model'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/tokenfunctions'

const signup = asynchandler(async(req, res) => {
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

const login = asynchandler(async(req, res) => {
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
export {signup, login}