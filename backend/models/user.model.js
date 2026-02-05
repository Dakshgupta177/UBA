import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        required: true,
        default: "user"
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)