import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ["collaboration", "donation", "others"],
        required: true,
        default: "others",
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

export const ContactUs = mongoose.model("contactus", contactUsSchema);