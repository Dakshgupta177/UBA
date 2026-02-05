import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String, 
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  published: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export const Article = mongoose.model("Article", articleSchema);