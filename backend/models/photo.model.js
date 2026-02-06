import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    imageUrl: {
      type: String, 
      required: [true, "Image URL is required"],
    },
    cloudinaryId: {
      type: String, 
      required: [true, "Cloudinary ID is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, 
  }
);


const Photo = mongoose.model("Photo", photoSchema);
export default Photo;