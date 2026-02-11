import Photo from "../models/photo.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


export const createPost = async (req, res) => {
    try {
        const { title } = req.body;
        const localFilePath = req.file?.path;

        if (!localFilePath) {
            return res.status(400).json({ message: "No image file provided" });
        }

       
        const cloudResponse = await uploadOnCloudinary(localFilePath);

        if (!cloudResponse) {
            return res.status(500).json({ message: "Error while uploading to cloud" });
        }

        
        const newPhoto = await Photo.create({
            title: title || "New Gallery Post",
            imageUrl: cloudResponse.secure_url,
            cloudinaryId: cloudResponse.public_id,
        });

        return res.status(201).json({
            success: true,
            data: newPhoto
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: photos
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ message: "Post not found" });
        }

       
        await deleteFromCloudinary(photo.cloudinaryId);

        
        await Photo.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Gallery post removed successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
